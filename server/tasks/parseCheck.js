// Парсить данные из parse и передать функции

const fs = require('fs')
const xlsx = require('node-xlsx') // parse excel file
const convertCheckForANTD = require('./convertCheckForANTD/')
const checkAPI = require('../api/checkAPI')

// Индекс инвентарного номера (для фильтрации исходных данных по filter)
const inn = require('../config').INDEXES['inn']
// Фильтр - массив инвентарных номеров
//Если filter отсутствует, то обрабатываются все данные
//const filter = require('../constants/audit/avtovaz/equipment').safe

/*
module.exports = function({ app, parsePath, buildPath }) {
    fs.readdir(parsePath, function(err, files) {
        const paths = files.map(item => `${parsePath}/${item}`)
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
                    // Рассчитать план ремонтов оборудования
                    const plan = calculatePlan(filteredData || data)

                    resolve(
                        (() => {
                            // Отправить данные к API
                            dataAPI({ app, plan })
                            // Сформировать данные для отчётов excel
                            repairPlan({
                                plan,
                                // Оборудование, не вошедшее в план
                                offPlan: (() => equipmentOffPlan(filteredData || data, plan))(),
                                // Сумма всех узлов по производствам
                                collapseNodes: (() => collapseNodes(filteredData || data))(),
                                buildPath
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
*/

module.exports = function({ app, parsePathCheck, buildPath }) {
    fs.readdir(parsePathCheck, function(err, files) {
        const paths = files.map(item => `${parsePathCheck}/${item}`)
        for (let i = 0; i < paths.length; i++) {
            new Promise(function(resolve, reject) {
                // Прочитать файл по ссылке paths[i]
                const data = [xlsx.parse(`${paths[i]}`)[0].data]
                const convertData = convertCheckForANTD(data)
                const name = paths[i].match(/check\/(.*?).xlsx/)[1]
                if (convertData) {
                    resolve(
                        // Отправить данные к API
                        checkAPI({ app, convertData, name })
                    )
                } else {
                    reject(new Error('Err'))
                }
            }).catch(err => console.log(err))
        }
    })
}
