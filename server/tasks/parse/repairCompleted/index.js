// Парсить файл Excel "Выполненные ремонты"
// Работать с полученными из функции данными

const fs = require('fs')
const xlsx = require('node-xlsx') // parse excel file
const clonedeep = require('lodash.clonedeep')
const systemAnalysisAndPlanningRepairEquipment = require(appRoot +
    '/server/tasks/build/systemAnalysisAndPlanningRepairEquipment/')
const allEquipment = require(appRoot + '/server/tasks/build/allEquipment/')
const dataAPI = require(appRoot + '/server/requests/api/dataAPI')
const INDEXES = require(appRoot + '/server/config/repaire/cols').INDEXES_REPAIR_COMPLETED
const LIMIT_NUMBER_EMERGENCY_STOPS = require(appRoot + '/server/config/repaire/')
    .LIMIT_NUMBER_EMERGENCY_STOPS
const {
    inn,
    act,
    order,
    customer,
    executor,
    startDate,
    endDate,
    typeOfRepair,
    node,
    description,
    percent
} = INDEXES

// 1) Схлопнуть данные по инвентарным номерам

const collapseDataByInn = function (data) {
    const d = clonedeep(data)
    const obj = {}

    let nodes = {}
    let descriptions = {}
    d.forEach((item) => {
        if (!obj[item[inn]]) {
            nodes = {}
            descriptions = {}
        }
        if (item[typeOfRepair] === 'Текущий ремонт') {
            nodes[item[node]] = true
            descriptions[item[description]] = true
        }

        obj[item[inn]] = {
            inn: item[inn],
            act: item[act],
            order: item[order],
            customer: item[customer],
            executor: item[executor],
            startDate: item[startDate],
            endDate: item[endDate],
            typeOfRepair: item[typeOfRepair].split(' ')[0],
            nodes: Object.keys(nodes).join('\n'),
            description: Object.keys(descriptions).join('\n'),
            percent: item[percent]
        }
    })

    // Преобразовать данные в массив объектов
    const values = Object.values(obj)
    const arr = [...values]

    return arr
}

module.exports = function ({
    app,
    parsePathRepairCompleted,
    equipment,
    plan,
    collapseNodes,
    buildPath
}) {
    const obj = {}
    const checkEquipmentInPlanButDontHaveInAllObj = {}
    Object.entries(equipment).forEach((spot) => {
        obj[spot[0]] = {}
        // checkEquipmentInPlanButDontHaveInAll - Оборудование в плане, которого нет в all
        // т.к. у оборудования нет данных по наработке, оно не попало в полный список
        let checkEquipmentInPlanButDontHaveInAll = clonedeep(plan[spot[0]])

        spot[1]['all'].forEach((item) => {
            plan[spot[0]] &&
                plan[spot[0]].forEach((planItem, i) => {
                    if (+item['inn'] === +planItem['inn']) {
                        item['period'] = planItem['period']
                        if (planItem['typeOfRepair'])
                            item['typeOfRepair'] = planItem['typeOfRepair']
                        if (planItem['nodes'])
                            item['approvedNodes'] = planItem['nodes'].split('\r\n')
                        if (planItem['comment']) item['comment'] = planItem['comment']
                        // Добавить значение LIMIT_NUMBER_EMERGENCY_STOPS
                        item['limitNumber'] = LIMIT_NUMBER_EMERGENCY_STOPS[spot[0]]
                        if (!obj[spot[0]][planItem['period']]) obj[spot[0]][planItem['period']] = []
                        obj[spot[0]] = {
                            ...obj[spot[0]],
                            [planItem['period']]: [...obj[spot[0]][planItem['period']], item]
                        }

                        delete checkEquipmentInPlanButDontHaveInAll[i]
                    }
                })
        })

        if (checkEquipmentInPlanButDontHaveInAll) {
            checkEquipmentInPlanButDontHaveInAll.forEach((item) => {
                if (!item) return
                const period = item['period']
                const description = item['description']
                const comment = item['comment']
                // Добавить значение LIMIT_NUMBER_EMERGENCY_STOPS
                item['limitNumber'] = LIMIT_NUMBER_EMERGENCY_STOPS[spot[0]]
                let parseNodesItem = {}
                if (item['nodes']) {
                    const nodes = item['nodes'].split('\r\n')
                    nodes.forEach((node) => {
                        parseNodesItem[node] = {
                            time: 0,
                            amount: 0,
                            description: '',
                            oneRepairTime: 0
                        }
                    })
                }
                item['approvedNodes'] = Object.keys(parseNodesItem)
                item['nodes'] = parseNodesItem
                obj[spot[0]][period] = [...obj[spot[0]][period], item]
            })
        }
    })

    fs.readdir(parsePathRepairCompleted, function (err, files) {
        const paths = files.map((item) => `${parsePathRepairCompleted}/${item}`)
        for (let i = 0; i < paths.length; i++) {
            new Promise(function (resolve, reject) {
                // Прочитать файл по ссылке paths[i]
                const data = xlsx.parse(`${paths[i]}`)[0].data
                if (data) {
                    const collapsedData = collapseDataByInn(data)

                    Object.entries(equipment).forEach((spot) => {
                        spot[1]['all'].forEach((item) => {
                            collapsedData.forEach((completed) => {
                                if (+item['inn'] === +completed['inn']) {
                                    item['completed'] = {
                                        endDate: completed['endDate'],
                                        typeOfRepair: completed['typeOfRepair'],
                                        nodes: completed['nodes'],
                                        description: completed['description']
                                    }
                                }
                            })
                        })
                        spot[1]['approved'] = obj[spot[0]]
                    })

                    resolve(
                        (() => {
                            // ОТПРАВИТЬ ДАННЫЕ К API
                            dataAPI({
                                app,
                                equipment
                            })
                            /*
                            // СФОРМИРОВАТЬ ОТЧЁТЫ EXCEL
                            systemAnalysisAndPlanningRepairEquipment({
                                equipment,
                                collapseNodes,
                                data: collapsedData,
                                buildPath
                            })

                            allEquipment({
                                equipment,
                                plan,
                                collapseNodes,
                                data: collapsedData,
                                buildPath
                            })
*/
                        })()
                    )
                } else {
                    reject(new Error('Err'))
                }
            }).catch((err) => console.log(err))
        }
    })
}
