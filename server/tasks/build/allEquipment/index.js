// Отчёт "система_анализа_и_планирования_ремонтов_оборудования"

const xl = require('excel4node') // create excel file
const clonedeep = require('lodash.clonedeep')

const sheetEquipment = require(appRoot + '/server/tasks/build/allEquipment/sheetEquipment')
const { NAMES_PLANNING_PERIOD } = require(appRoot + '/server/config/repaire/')

module.exports = function ({ plan, offPlan, data, buildPath }) {
    const wb = new xl.Workbook()

    // Объединить план и внеплана
    let p = clonedeep(plan)
    let off = clonedeep(offPlan)
    const keys = Object.keys(p)
    let all = {}

    keys.forEach((key) => {
        all[key] = []
        p[key]['data'].forEach((period, i) => {
            period.forEach((item) => {
                item['period'] = NAMES_PLANNING_PERIOD[i]
            })
            all[key] = [...all[key], ...period]
        })
        all[key] = [...all[key], ...off[key]]
    })

    // Сортировать по цеховому номеру
    keys.forEach((key) => {
        all[key].sort((a, b) => +a['num'] - +b['num'])
    })

    const defaultStyle = wb.createStyle({
        font: {
            name: 'Times New Roman',
            color: '#000000',
            size: 11
        },
        alignment: { wrapText: true }
    })

    sheetEquipment({
        all,
        data,
        wb,
        defaultStyle
    }) // Оборудование

    wb.write(`${buildPath}/оборудование.xlsx`, (err) => {
        err ? console.error(err) : console.log('Файл успешно сохранён!')
    })
}
