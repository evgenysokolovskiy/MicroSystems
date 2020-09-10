// Парсить файл Excel "План ремонтов"
// Работать с полученными из функции данными

const fs = require('fs')
const xlsx = require('node-xlsx') // parse excel file
const clonedeep = require('lodash.clonedeep')
const systemAnalysisAndPlanningRepairEquipment = require(appRoot +
    '/server/tasks/build/systemAnalysisAndPlanningRepairEquipment/')
const allEquipment = require(appRoot + '/server/tasks/build/allEquipment/')
const INDEXES = require(appRoot + '/server/config/repaire/cols').INDEXES_PLAN_REPAIR
// 1) Схлопнуть данные по инвентарным номерам

const { model, num, inn, period, typeOfRepair, nodes, description, comment } = INDEXES

module.exports = function ({
    app,
    parsePathPlan,
    repairCompleted,
    parsePathRepairCompleted,
    equipment,
    collapseNodes,
    buildPath
}) {
    fs.readdir(parsePathPlan, function (err, files) {
        const paths = files.map((item) => `${parsePathPlan}/${item}`)
        for (let i = 0; i < paths.length; i++) {
            new Promise(function (resolve, reject) {
                // Прочитать файл по ссылке paths[i]
                const data = xlsx.parse(`${paths[i]}`)

                if (data) {
                    const plan = {}
                    data.forEach((item) => (plan[item['name']] = item['data']))
                    // Обработать данные плана ремонтов
                    const obj = {}
                    Object.entries(plan).forEach((key) => {
                        obj[key[0]] = []
                        key[1].forEach((item) => {
                            if (!+item[inn]) return
                            const val = {
                                model: item[model],
                                num: +item[num],
                                inn: +item[inn],
                                period: item[period],
                                typeOfRepair: (() =>
                                    item[typeOfRepair] && item[typeOfRepair].toLowerCase())(),
                                nodes: item[nodes],
                                description: item[description],
                                comment: item[comment]
                            }

                            obj[key[0]] = [...obj[key[0]], val]
                        })
                    })

                    resolve(
                        // Прочитать из файла данные о выполненных ремонтах
                        repairCompleted({
                            app,
                            parsePathRepairCompleted,
                            equipment,
                            plan: obj,
                            // Сумма всех узлов по производствам
                            collapseNodes,
                            buildPath
                        })
                    )
                } else {
                    reject(new Error('Err'))
                }
            }).catch((err) => console.log(err))
        }
    })
}
