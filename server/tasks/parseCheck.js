// Парсить данные из xlsx/check и передать функции

const fs = require('fs')
const xlsx = require('node-xlsx') // parse excel file
const convertCheckForANTD = require('./convertCheckForANTD/')
const checkForGeneralUseCheckAPI = require('../api/checkAPI').checkForGeneralUse
const convertedCheckAPI = require('../api/checkAPI').converted

module.exports = function({ app, parsePathCheck, buildPath }) {
    fs.readdir(parsePathCheck, function(err, files) {
        const paths = files.map(item => `${parsePathCheck}/${item}`)
        paths.forEach(file => {
            xlsx.parse(file).forEach(item => {
                const name = item['name']
                const source = item['data']
                const data = [source]

                new Promise(function(resolve, reject) {
                    // Данные для общего использования
                    const checkForGeneralUse = convertCheckForGeneralUse(source)
                    // Данные для ANTD
                    const convertedData = { [name]: data.length && convertCheckForANTD(data) }

                    if (checkForGeneralUse && convertedData) {
                        resolve(
                            (() => {
                                // Отправить данные к API
                                // Отправляются данные каждой вкладки каждого файла
                                checkForGeneralUseCheckAPI({ app, checkForGeneralUse, name })
                                convertedCheckAPI({ app, convertedData, name })
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

// Получить данные для общего использования
function convertCheckForGeneralUse(source) {
    let d = []
    for (let i = 1; i < source.length; i++) {
        if (!source[i].length) continue
        const obj = {}
        for (let j = 0; j < source[i].length; j++) {
            obj[source[0][j]] = source[i][j]
        }

        d = [...d, obj]
    }
    return d
}
