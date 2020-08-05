// 3) Выделить оборудование, которое не находится в плане ремонтов

const clonedeep = require('lodash.clonedeep')
const calculateRepairComplexityInPlanningPeriod = require(appRoot +
    '/server/tasks/calculatePlan/_3-calculateRepairComplexityInPlanningPeriod')

module.exports = function (data, plan) {
    // объект, где ключи - это номера производств
    // Значения - массив объектов, принадлежащих производству
    const d = clonedeep(calculateRepairComplexityInPlanningPeriod(data))
    // keys - Обозначение производств (свойства объекта)
    const keys = Object.keys(d)
    let obj = {}

    // Модифицировать массив d путем удаления объектов оборудования, имеющихся в плане ремонтов
    keys.forEach((key) => {
        if (!plan[key]) return
        plan[key]['data'].forEach((planItem) => {
            planItem.forEach((planItem1) => {
                d[key]['data'].forEach((dataItem, index) => {
                    if (dataItem['inn'] === planItem1['inn']) d[key]['data'].splice(index, 1)
                })
            })
        })

        obj[key] = {
            offPlan: d[key]['data']
        }
    })

    // console.log(obj)
    return obj
}
