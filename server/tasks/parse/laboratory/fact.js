// Парсить данные из parse и передать функции

const fs = require('fs')
const xlsx = require('node-xlsx') // parse excel file
const laboratoryAPI = require(appRoot + '/server/api/laboratoryAPI')
const calculateDataShp = require(appRoot + '/server/tasks/laboratory/helpers/shp/')
const calculateDataShsp = require(appRoot + '/server/tasks/laboratory/helpers/shsp/')
const calculateDataSog = require(appRoot + '/server/tasks/laboratory/helpers/sog/')

module.exports = function({ app, parseLaboratoryFact, technology }) {
    const { technologyShp, technologyShsp, technologySog } = technology

    fs.readdir(parseLaboratoryFact, function(err, files) {
        const paths = files.map(item => `${parseLaboratoryFact}/${item}`)
        for (let i = 0; i < paths.length; i++) {
            new Promise(function(resolve, reject) {
                // Прочитать файл по ссылке paths[i]
                if (!xlsx.parse(`${paths[i]}`)[2]) return
                const factShp = xlsx.parse(`${paths[i]}`)[0]['data']
                const factShsp = xlsx.parse(`${paths[i]}`)[1]['data']
                const factSog = xlsx.parse(`${paths[i]}`)[2]['data']

                if (
                    technologyShp &&
                    technologyShsp &&
                    technologySog &&
                    factShp &&
                    factShsp &&
                    factSog
                ) {
                    const shp = calculateDataShp({ fact: factShp, technology: technologyShp })
                    const shsp = calculateDataShsp({ fact: factShsp, technology: technologyShsp })
                    const sog = calculateDataSog({ fact: factSog, technology: technologySog })

                    resolve(
                        (() => {
                            laboratoryAPI({
                                app,
                                data: {
                                    shp,
                                    shsp,
                                    sog
                                }
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
