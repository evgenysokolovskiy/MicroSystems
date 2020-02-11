// Парсить данные из xlsx/check и передать функции

const fs = require('fs')
const xlsx = require('node-xlsx') // parse excel file
const convertShemeForANTD = require('./convertSchemeForANTD/')
const schemeAPI = require('../api/schemeAPI')

module.exports = function({ app, parsePathScheme, buildPath }) {
    fs.readdir(parsePathScheme, function(err, files) {
        const paths = files.map(item => `${parsePathScheme}/${item}`)
        paths.forEach(file => {
            xlsx.parse(file).forEach(item => {
                const name = item['name']
                const data = item['data']
                new Promise(function(resolve, reject) {
                    const convertData = { [name]: data.length && convertShemeForANTD(data) }
                    if (convertData) {
                        resolve(
                            (() => {
                                // Отправить данные к API
                                // Отправляются данные каждой вкладки каждого файла
                                schemeAPI({ app, convertData, name })
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
