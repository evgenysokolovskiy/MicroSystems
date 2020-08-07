// 3) Выделить оборудование, которое не находится в плане ремонтов

const clonedeep = require('lodash.clonedeep')
const filterDataByEmergencyStopLimit = require(appRoot +
    '/server/tasks/equipmentOffPlan/filterDataByEmergencyStopLimit')

module.exports = function (data, plan) {
    // объект, где ключи - это номера производств
    // Значения - массив объектов, принадлежащих производству
    const d = clonedeep(filterDataByEmergencyStopLimit(data))
    // keys - Обозначение производств (свойства объекта)
    const keys = Object.keys(d)
    let obj = {}

    // Модифицировать массив d путем исключения объектов оборудования, имеющихся в плане ремонтов
    keys.forEach((key) => {
        if (!plan[key]) return
        plan[key]['data'].forEach((planItem) => {
            planItem.forEach((planItem1) => {
                d[key]['data'].forEach((dataItem, index) => {
                    if (dataItem['inn'] === planItem1['inn']) d[key]['data'].splice(index, 1)
                })
            })
        })

        obj[key] = d[key]['data']
    })

    // Сортировать объекты по цеховому номеру
    const sortedByNumObj = clonedeep(obj)

    keys.forEach((key) => {
        sortedByNumObj[key].sort(compare)
    })

    function compare(a, b) {
        return +a['num'] - +b['num']
    }

    //console.log(sortedByNumObj)
    return sortedByNumObj
}
