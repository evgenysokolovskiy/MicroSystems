// Парсить данные из root и передать функциям

const fs = require('fs')
const xlsx = require('node-xlsx') // parse excel file
//const splitProductionEquipment = require('../primaryDataProcessing/_2-splitProductionEquipment')
const calculatePlan = require('./calculatePlan/_4-calculatePlan')
const sumDataByNodes = require('./sumDataByNodes')
const dataAPI = require('./../api/dataAPI')
const repairPlan = require('./build/systemAnalysisAndPlanningRepairEquipment/')
// Индекс инвентарного номера (для фильтрации исходных данных по filter)
const inn = require('./constants').INDEXES['inn']
// Фильтр - массив инвентарных номеров (при необходимости)
// Если filter отсутствует, то обрабатываются все данные
//const filter = require('./../../data/audit/avtovaz/equipment')

module.exports = function({ app, rootDir, dir }) {
    fs.readdir(rootDir, function(err, files) {
        const paths = files.map(item => `${rootDir}/${item}`)
        for (let i = 0; i < paths.length; i++) {
            new Promise(function(resolve, reject) {
                // Прочитать файл по ссылке paths[i]
                const data = xlsx.parse(`${paths[i]}`)[0].data
                if (data) {
                    // Фильтровать данные (при наличии filter)
                    const filteredData =
                        typeof filter !== 'undefined'
                            ? data.filter(item => filter.some(num => +item[inn] === +num))
                            : null
                    // Рассчитать план с помощью функции calculatePlan
                    const plan = calculatePlan(filteredData || data)

                    resolve(
                        (() => {
                            // Отправить данные к API
                            dataAPI({ app, plan })
                            // Сформировать данные для отчётов excel
                            repairPlan({
                                data: (() => sumDataByNodes(filteredData || data))(),
                                plan,
                                dir
                            })
                        })()
                    )
                } else {
                    reject(new Error('Err'))
                }
            }).catch(err => console.log(err))
        }
    })
}
