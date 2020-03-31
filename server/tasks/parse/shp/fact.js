// Парсить данные из shp и передать функции

const fs = require('fs')
const xlsx = require('node-xlsx') // parse excel file
const INDEXES = require('../../../config/shp/fact')
const {
    INDEXES_STAMPING,
    INDEXES_RUNNING,
    INDEXES_GRINDING,
    INDEXES_ROUGH,
    INDEXES_CLEAN,
    INDEXES_FINAL
} = INDEXES

const convertData = require('../../shp/convertFact/').convertData
const convertTechnologyFact = require('../../shp/convertTechnologyFact/')
const convertTechnologyFactToJsx = require('../../shp/convertTechnologyFactToJsx/')
const joinTechnologyFactAPI = require('../../../api/joinTechnologyFactAPI')
const jsxAPI = require('../../../api/jsxAPI')

module.exports = function({ app, parseShpFact, technology }) {
    fs.readdir(parseShpFact, function(err, files) {
        const paths = files.map(item => `${parseShpFact}/${item}`)
        for (let i = 0; i < paths.length; i++) {
            new Promise(function(resolve, reject) {
                let stamping, running, grinding, rough, clean, final

                xlsx.parse(`${paths[i]}`).forEach(sheet => {
                    if (sheet['name'].toLowerCase() === 'штамповка')
                        stamping = convertData(sheet['data'], INDEXES_STAMPING)
                    if (sheet['name'].toLowerCase() === 'обкатка')
                        running = convertData(sheet['data'], INDEXES_RUNNING)
                    if (sheet['name'].toLowerCase() === 'шлифовка')
                        grinding = convertData(sheet['data'], INDEXES_GRINDING)
                    if (sheet['name'].toLowerCase() === 'доводка1')
                        rough = convertData(sheet['data'], INDEXES_ROUGH)
                    if (sheet['name'].toLowerCase() === 'доводка2')
                        clean = convertData(sheet['data'], INDEXES_CLEAN)
                    if (sheet['name'].toLowerCase() === 'доводка4')
                        final = convertData(sheet['data'], INDEXES_FINAL)
                })

                const fact = {
                    stamping,
                    running,
                    grinding,
                    rough,
                    clean,
                    final
                }

                if (technology && fact) {
                    const joinTechnologyFact = convertTechnologyFact({ technology, fact })
                    //const jsx = convertTechnologyFactToJsx({ joinTechnologyFact })
                    const jsx = convertTechnologyFactToJsx()
                    //console.log(jsx)
                    resolve(
                        (() => {
                            // Отправить данные к API
                            joinTechnologyFactAPI({
                                app,
                                joinTechnologyFact
                            })

                            jsxAPI({ app, jsx })
                        })()
                    )
                } else {
                    reject(new Error('Err'))
                }
            }).catch(err => console.log(err))
        }
    })
}