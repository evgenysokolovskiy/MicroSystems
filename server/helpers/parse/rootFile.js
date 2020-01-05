// Парсить данные из root и передать функциям

const fs = require('fs')
const xlsx = require('node-xlsx') // parse excel file
const calculatePlan = require('../calculatePlan/_6-calculatePlan')
const dataAPI = require('../../api/dataAPI')
const repairPlan = require('../reports/repair/')

module.exports = function(app, rootDir, reportsDir) {
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
                            dataAPI(app, plan)
                            repairPlan(plan, reportsDir)
                        })()
                    )
                } else {
                    reject(new Error('Err'))
                }
            }).catch(err => console.log(err))
        }
    })
}
