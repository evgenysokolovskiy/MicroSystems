// Парсить данные из xlsx/check и передать функции

const fs = require('fs')
const xlsx = require('node-xlsx') // parse excel file
const convertCheckForGeneralUse = require(appRoot +
    '/server/tasks/parse/check/convertCheckForGeneralUse/')
const convertCheckForANTD = require(appRoot + '/server/tasks/parse/check/convertCheckForANTD/')
const checkForGeneralUseCheckAPI = require(appRoot + '/server/api/checkAPI').checkForGeneralUse
const convertedCheckAPI = require(appRoot + '/server/api/checkAPI').converted

module.exports = function ({ app, parsePathCheck, buildPath }) {
    fs.readdir(parsePathCheck, function (err, files) {
        const paths = files.map((item) => `${parsePathCheck}/${item}`)
        paths.forEach((file) => {
            xlsx.parse(file).forEach((item) => {
                const name = item['name']
                const source = item['data']
                const data = [source]

                new Promise(function (resolve, reject) {
                    // Данные для общего использования
                    const checkForGeneralUse = { [name]: convertCheckForGeneralUse(source) }
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
                }).catch((err) => console.log(err))
            })
        })
    })
}
