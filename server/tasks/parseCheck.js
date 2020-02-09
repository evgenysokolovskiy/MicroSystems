// Парсить данные из xlsx/check и передать функции

const fs = require('fs')
const xlsx = require('node-xlsx') // parse excel file
const convertCheckForANTD = require('./convertCheckForANTD/')
const checkAPI = require('../api/checkAPI')

module.exports = function({ app, parsePathCheck, buildPath }) {
    fs.readdir(parsePathCheck, function(err, files) {
        const paths = files.map(item => `${parsePathCheck}/${item}`)
        for (let i = 0; i < paths.length; i++) {
            new Promise(function(resolve, reject) {
                // Прочитать файл по ссылке paths[i]
                const data = [xlsx.parse(`${paths[i]}`)[0].data]
                const name = paths[i].match(/check\/(.*?).xlsx/)[1]
                const convertData = {
                    [name]: convertCheckForANTD(data)
                }
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
