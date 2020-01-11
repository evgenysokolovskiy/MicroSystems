// Парсить данные из root и передать функциям

const fs = require('fs')
const xlsx = require('node-xlsx') // parse excel file
//const splitProductionEquipment = require('../primaryDataProcessing/_2-splitProductionEquipment')
const calculatePlan = require('../calculatePlan/_4-calculatePlan')
const sumDataByNodes = require('../sumDataByNodes')
const dataAPI = require('../../api/dataAPI')
const repairPlan = require('../reports/systemAnalysisAndPlanningRepairEquipment/')

// Оборудование Автоваз
const filter = require('../../../data/audit/avtovaz/equipment')

module.exports = function({ app, rootDir, dir }) {
    fs.readdir(rootDir, function(err, files) {
        const paths = files.map(item => `${rootDir}/${item}`)
        for (let i = 0; i < paths.length; i++) {
            new Promise(function(resolve, reject) {
                // Прочитать файл по ссылке paths[i]
                const data = xlsx.parse(`${paths[i]}`)[0].data
                if (data) {
                    const plan = calculatePlan(data) // Рассчитать план с помощью функции calculatePlan

                    resolve(
                        (() => {
                            // Данные к API
                            dataAPI({ app, plan })
                            // Данные для формирования отчётов excel
                            repairPlan({
                                data: (() => sumDataByNodes({ data, filter }))(),
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
