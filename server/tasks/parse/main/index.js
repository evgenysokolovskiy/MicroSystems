// Парсить данные из parse и передать функции

const fs = require('fs')
const xlsx = require('node-xlsx') // parse excel file
const clonedeep = require('lodash.clonedeep')
const getAllEquipment = require(appRoot + '/server/tasks/primaryDataProcessing/_3-getAllEquipment')
const calculatePlan = require(appRoot + '/server/tasks/calculatePlan/_4-calculatePlan')
const equipmentOffPlan = require(appRoot + '/server/tasks/equipmentOffPlan/')
const collapseNodes = require(appRoot + '/server/tasks/collapseNodes')

// Индекс инвентарного номера (для фильтрации исходных данных по filter)
const inn = require(appRoot + '/server/config/repaire/cols').INDEXES['inn']
// Фильтр - массив инвентарных номеров
//Если filter отсутствует, то обрабатываются все данные
//const filter = require(appRoot + '/server/constants/audit/avtovaz/equipment')['avtovaz']

module.exports = function ({
    app,
    parsePath,
    parsePathRepairCompleted,
    parsePathPlan,
    buildPath,
    repairCompleted,
    planRepair
}) {
    fs.readdir(parsePath, function (err, files) {
        const paths = files.map((item) => `${parsePath}/${item}`)
        for (let i = 0; i < paths.length; i++) {
            new Promise(function (resolve, reject) {
                // Прочитать файл по ссылке paths[i]
                const data = xlsx.parse(`${paths[i]}`)[0]['data']
                if (data) {
                    // Фильтровать данные (при наличии filter)
                    const filteredData =
                        typeof filter !== 'undefined'
                            ? data.filter((item) => filter.some((num) => +item[inn] === +num))
                            : null
                    // Оборудование в предварительном плане ремонтов
                    const plan = calculatePlan(filteredData || data)
                    // Оборудование, не входящее в предварительный план ремонтов
                    const offPlan = equipmentOffPlan(filteredData || data, plan)
                    // Все оборудование
                    const all = getAllEquipment(filteredData || data)
                    // Добавить к объекту свойства "all" и "offPlan"
                    Object.entries(plan).forEach((item) => {
                        item[1]['all'] = all[item[0]]
                        item[1]['offPlan'] = offPlan[item[0]]
                    })

                    const equipment = clonedeep(plan)

                    resolve(
                        (() => {
                            // Прочитать из файла данные утверждённого плана ремонтов
                            // Пробросить для использования внутри функцию чтения из файла данных о выполненных ремонтах с параметрами
                            planRepair({
                                app,
                                parsePathPlan,
                                repairCompleted,
                                parsePathRepairCompleted,
                                equipment,
                                collapseNodes: (() => collapseNodes(filteredData || data))(),
                                buildPath
                            })
                        })()
                    )
                } else {
                    reject(new Error('Err'))
                }
            }).catch((err) => console.log(err))
        }
    })
}
