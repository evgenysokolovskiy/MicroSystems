// Парсить данные из xlsx/check и передать функции

const fs = require('fs')
const xlsx = require('node-xlsx') // parse excel file
const convertCheckForANTD = require('./convertCheckForANTD/')
const checkAPI = require('../api/checkAPI')

module.exports = function({ app, parsePathCheck, buildPath }) {
    fs.readdir(parsePathCheck, function(err, files) {
        const paths = files.map(item => `${parsePathCheck}/${item}`)

        paths.forEach(file => {
            xlsx.parse(file).forEach(item => {
                const name = item['name']
                const data = [item['data']]
                new Promise(function(resolve, reject) {
                    convertData = { [name]: data.length && convertCheckForANTD(data) }
                    if (convertData) {
                        resolve(
                            (() => {
                                // Отправить данные к API
                                // Отправляются данные каждой вкладки каждого файла
                                checkAPI({ app, convertData, name })
                            })()
                        )
                    } else {
                        reject(new Error('Err'))
                    }
                }).catch(err => console.log(err))
            })
        })
    })
}
