// 3) Выделить оборудование, которое не находится в плане ремонтов

const clonedeep = require('lodash.clonedeep')
const filterDataByEmergencyStopLimit = require(appRoot +
    '/server/tasks/equipmentOffPlan/filterDataByEmergencyStopLimit')
const { NAMES_PLANNING_PERIOD } = require(appRoot + '/server/config/repaire/')

module.exports = function ({ plan, offPlan }) {
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

    // * Оборудование с сортировкой но цеховому номеру
    let equipmentSortedNum = clonedeep(equipment)
    // Сортировать объекты по цеховому номеру
    keys.forEach((key) => {
        equipmentSortedNum[key].sort((a, b) => +a['num'] - +b['num'])
    })

    //console.log(equipmentSortedNum)
    return equipmentSortedNum
}
