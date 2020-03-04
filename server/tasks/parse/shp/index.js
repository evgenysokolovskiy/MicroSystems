// Парсить данные из shp и передать функции

const fs = require('fs')
const xlsx = require('node-xlsx') // parse excel file
const INDEXES = require('../../../configShp')
const {
    INDEXES_STAMPING,
    INDEXES_RUNNING,
    INDEXES_GRINDING,
    INDEXES_ROUGH,
    INDEXES_CLEAN,
    INDEXES_FINAL
} = INDEXES
const shpFactAPI = require('../../../api/shpFactAPI')

function convertData(data, INDEXES) {
    let arr = []
    // Преобразовать объект в массив
    const indexes = [...Object.entries(INDEXES)]
    data.forEach(item => {
        if (!item[0]) return
        const obj = {}
        indexes.forEach(i => {
            const indexDate = (i[0] === 'date') ? i[1] : null
            obj[i[0]] = typeof item[indexDate] === 'number' ? getDateFromText(item[indexDate]) : item[i[1]]
        })
        arr = [...arr, obj]
    })
    return arr
}

module.exports = function({ app, parseShp }) {
    fs.readdir(parseShp, function(err, files) {
        const paths = files.map(item => `${parseShp}/${item}`)
        for (let i = 0; i < paths.length; i++) {
            new Promise(function(resolve, reject) {
                // Прочитать файл по ссылке paths[i]
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

                const data = {
                    stamping,
                    running,
                    grinding,
                    rough,
                    clean,
                    final
                }

                if (data) {
                    resolve(
                        (() => {
                            // Отправить факт к API
                            shpFactAPI({ app, data })
                        })()
                    )
                } else {
                    reject(new Error('Err'))
                }
            }).catch(err => console.log(err))
        }
    })
}

function getDateFromText(text) {
    // JSON -> UTC
    const d = new Date(1899, 12, text)
    // DD.MM.YYYY
    const yyyymmdd = `${d.getUTCDate()}.${d.getUTCMonth() + 1}.${d.getUTCFullYear()}`
    // add 0 (разбить массив на строки)
    const arr = yyyymmdd.split('.')
    // get str (добавить 0)
    const day = arr[0].padStart(2, '0')
    const month = arr[1].padStart(2, '0')
    const year = arr[2]

    return `${day}.${month}.${year}`
}

/*
function converUTCDateToLocalDate(date) {
    let newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000)
    let offset = date.getTimezoneOffset() / 60
    let hours = date.getHours()
    newDate.setHours(hours - offset)
    return newDate
}
*/
