// 4) Расчитать план ремонтов по производствам

const NAMES_PLANNING_PERIOD = require('../../config').NAMES_PLANNING_PERIOD
const calculateRepairComplexityInPlanningPeriod = require('./_3-calculateRepairComplexityInPlanningPeriod')

module.exports = function(data) {
    // Рассчитано месячное значение трудоемкости
    const d = { ...calculateRepairComplexityInPlanningPeriod(data) }
    // Необходимо разбить всё оборудование на равные по ремонтной сложности группы
    // Ремонтная сложность в соответствии со свойством "mechanicRepairComplexity"
    // За основу взята механическая часть
    const plan = {}
    let arr = []
    Object.keys(d).forEach(key => {
        // Сортировать массивы объекта по значению свойства sumAmount от максимального значения
        sortBySumAmount(d[key]['data'])

        // Определить число средних и узловых ремонтов
        let middleCount = 0
        let nodesCount = 0
        // Значение ремонтной сложности
        let rest = +d[key]['inPlanningPeriodMechanicRepairComplexity']
        let accumulator = []
        // accumulator имеет объем rest
        // Если (rest > 0) {
        // аккумулировать данные
        // уменьшить значение rest на показатель ремонтной сложности оборудования (или узла)
        // }
        // Если (rest < 0, т.е когда accumulator заполнен) {
        // Выгрузить данные из accumulator в массив arr
        // освободить accumulator
        // восстановить значение rest до исходного состояния
        // }
        // Если (accumulator полностью не заполнен, но цикл завершен) {
        // Выгрузить оставшиеся данные после завершения цикла
        // }

        d[key]['data'].forEach(item => {
            if (rest > 0) {
                if (item['typeOfRepair'] === 'medium') {
                    accumulator = [...accumulator, item]
                    rest -= item['mechanicRepairComplexity']
                    middleCount++
                }

                if (item['typeOfRepair'] === 'nodes') {
                    accumulator = [...accumulator, item]
                    rest -= item['sumMechanicRepairComplexityNodes']
                    nodesCount++
                }
            }

            if (rest < 0) {
                arr = [...arr, accumulator]
                accumulator = []
                rest = +d[key]['inPlanningPeriodMechanicRepairComplexity']
            }
        })

        if (accumulator.length) arr = [...arr, accumulator]
        plan[key] = {
            data: arr,
            offPlan: d[key]['offPlan'],
            allEquipment: d[key]['allEquipment'],
            filteredEquipment: (() => +middleCount + +nodesCount)(),
            middleCount,
            nodesCount,
            nodes: d[key]['nodes'],
            sumAmountAllNodes: d[key]['sumAmountAllNodes'],
            sumTimeAllNodes: d[key]['sumTimeAllNodes'],
            sumMechanicRepairComplexity: d[key]['sumMechanicRepairComplexity'],
            sumElectricRepairComplexity: d[key]['sumElectricRepairComplexity'],
            inPlanningPeriodMechanicRepairComplexity:
                d[key]['inPlanningPeriodMechanicRepairComplexity'],
            period: NAMES_PLANNING_PERIOD
        }

        arr = []
    })

    //console.log(plan)
    return plan
}

// Функция сортировки по свойству sumAmount
function sortBySumAmount(arr) {
    arr.sort((a, b) => b.sumAmount - a.sumAmount)
}
