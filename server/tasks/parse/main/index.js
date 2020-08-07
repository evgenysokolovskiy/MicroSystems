// Парсить данные из parse и передать функции

const fs = require('fs')
const xlsx = require('node-xlsx') // parse excel file
const calculatePlan = require(appRoot + '/server/tasks/calculatePlan/_4-calculatePlan')
const equipmentOffPlan = require(appRoot + '/server/tasks/equipmentOffPlan/')
const collapseNodes = require(appRoot + '/server/tasks/collapseNodes')
const dataAPI = require(appRoot + '/server/requests/api/dataAPI')

// Индекс инвентарного номера (для фильтрации исходных данных по filter)
const inn = require(appRoot + '/server/config/repaire/').INDEXES['inn']
// Фильтр - массив инвентарных номеров
//Если filter отсутствует, то обрабатываются все данные
//const filter = require(appRoot + '/server/constants/audit/avtovaz/equipment')['_256707']

module.exports = function ({
    app,
    parsePath,
    parsePathRepairCompleted,
    buildPath,
    repairCompleted
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
                    // Рассчитать план ремонтов оборудования
                    const plan = calculatePlan(filteredData || data)

                    resolve(
                        (() => {
                            // Сформировать данные для отчётов excel
                            repairCompleted({
                                parsePathRepairCompleted,
                                plan,
                                offPlan: (() => equipmentOffPlan(filteredData || data, plan))(),
                                // Сумма всех узлов по производствам
                                collapseNodes: (() => collapseNodes(filteredData || data))(),
                                buildPath
                            })

                            // Отправить данные к API
                            dataAPI({ app, plan })
                        })()
                    )
                } else {
                    reject(new Error('Err'))
                }
            }).catch((err) => console.log(err))
        }
    })
}
