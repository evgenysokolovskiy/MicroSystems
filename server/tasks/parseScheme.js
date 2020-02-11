// Парсить данные из xlsx/check и передать функции

const fs = require('fs')
const xlsx = require('node-xlsx') // parse excel file
const convertShemeForANTD = require('./convertSchemeForANTD/')
const schemeAPI = require('../api/schemeAPI')

module.exports = function({ app, parsePathScheme, buildPath }) {
    fs.readdir(parsePathScheme, function(err, files) {
        const paths = files.map(item => `${parsePathScheme}/${item}`)
        for (let i = 0; i < paths.length; i++) {
            new Promise(function(resolve, reject) {
                // Прочитать файл по ссылке paths[i]
                const data = [xlsx.parse(`${paths[i]}`)[0].data]
                const name = paths[i].match(/scheme\/(.*?).xlsx/)[1]
                const convertData = {
                    [name]: convertShemeForANTD(data)
                }
                if (data) {
                    const d = xlsx.parse(`${paths[i]}`).filter(item => item['name'] === '50')[0][
                        'data'
                    ]

                    resolve(
                        (() => {
                            // Отправить данные к API
                            schemeAPI({ app, convertData, name })
                        })()
                    )
                } else {
                    reject(new Error('Err'))
                }
            }).catch(err => console.log(err))
        }
    })
}
