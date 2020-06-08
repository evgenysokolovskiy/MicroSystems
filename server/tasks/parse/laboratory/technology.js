// Парсить данные из parse и передать функции

const fs = require('fs')
const xlsx = require('node-xlsx') // parse excel file

module.exports = function({ app, parseLaboratoryTechnology, parseLaboratoryFact, fact }) {
    fs.readdir(parseLaboratoryTechnology, function(err, files) {
        const paths = files.map(item => `${parseLaboratoryTechnology}/${item}`)
        for (let i = 0; i < paths.length; i++) {
            new Promise(function(resolve, reject) {
                // Прочитать файл по ссылке paths[i]
                const technology = xlsx.parse(`${paths[i]}`)[0].data
                if (technology) {
                    resolve(
                        (() => {
                            fact({
                                app,
                                parseLaboratoryFact,
                                technology
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
