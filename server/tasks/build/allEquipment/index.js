// Отчёты

const xl = require('excel4node') // create excel file
const clonedeep = require('lodash.clonedeep')

const sheetEquipmentSortedNum = require(appRoot +
    '/server/tasks/build/allEquipment/sheetEquipmentSortedNum')
const sheetEquipmentSortedPercent = require(appRoot +
    '/server/tasks/build/allEquipment/sheetEquipmentSortedPercent')
const sheetEquipmentFilteredPercentMoreNorm = require(appRoot +
    '/server/tasks/build/allEquipment/sheetEquipmentFilteredPercentMoreNorm')
const { NAMES_PLANNING_PERIOD, PERCENT_MONTH, MIN_MTBF_MONTH } = require(appRoot +
    '/server/config/repaire/')

module.exports = function ({ plan, offPlan, data, buildPath }) {
    const wb1 = new xl.Workbook()
    const wb2 = new xl.Workbook()
    const wb3 = new xl.Workbook()

    // Объединить план и внеплана
    let p = clonedeep(plan)
    let off = clonedeep(offPlan)
    const keys = Object.keys(p)
    let equipment = {}

    keys.forEach((key) => {
        equipment[key] = []
        p[key]['data'].forEach((period, i) => {
            period.forEach((item) => (item['period'] = NAMES_PLANNING_PERIOD[i]))
            equipment[key] = [...equipment[key], ...period]
        })
        equipment[key] = [...equipment[key], ...off[key]]
    })

    const defaultStyle = wb1.createStyle({
        font: {
            name: 'Times New Roman',
            color: '#000000',
            size: 11
        },
        alignment: { wrapText: true }
    })

    // * Оборудование с сортировкой но цеховому номеру
    let equipmentSortedNum = clonedeep(equipment)
    // Сортировать объекты по цеховому номеру
    keys.forEach((key) => {
        equipmentSortedNum[key].sort((a, b) => +a['num'] - +b['num'])
    })
    sheetEquipmentSortedNum({
        equipmentSortedNum,
        data,
        wb: wb1,
        defaultStyle
    })
    wb1.write(`${buildPath}/оборудование_с_сортировкой_по_цеховому_номеру.xlsx`, (err) => {
        err ? console.error(err) : console.log('Файл успешно сохранён!')
    })

    // * Оборудование с сортировкой по проценту (простои / наработка)
    let equipmentSortedPercent = clonedeep(equipment)
    // Сортировать объекты по проценту времени простоев от наработки оборудования
    keys.forEach((key) => {
        equipmentSortedPercent[key].sort(
            (a, b) => +b['percentTimeOfMtbf'] - +a['percentTimeOfMtbf']
        )
    })
    sheetEquipmentSortedPercent({
        equipmentSortedPercent,
        data,
        wb: wb2,
        defaultStyle
    })
    wb2.write(`${buildPath}/оборудование_с_сортировкой_по_проценту.xlsx`, (err) => {
        err ? console.error(err) : console.log('Файл успешно сохранён!')
    })

    // * Оборудование с фильтрацией согласно месячным нормативам конфигурации
    let equipmentFilteredPercentMoreNorm = {}
    // Для удобства берутся отсортированные по проценту массивы
    keys.forEach((key) => {
        const filteredArr = clonedeep(equipmentSortedPercent)[key].filter((item) => {
            if (+item['percentTimeOfMtbf'] > PERCENT_MONTH && item['mtbf'] > MIN_MTBF_MONTH)
                return item
        })
        equipmentFilteredPercentMoreNorm[key] = filteredArr
    })
    sheetEquipmentFilteredPercentMoreNorm({
        equipmentFilteredPercentMoreNorm,
        data,
        wb: wb3,
        defaultStyle
    })
    wb3.write(`${buildPath}/оборудование_не_соответствующее_нормативам_по_простоям.xlsx`, (err) => {
        err ? console.error(err) : console.log('Файл успешно сохранён!')
    })
}
