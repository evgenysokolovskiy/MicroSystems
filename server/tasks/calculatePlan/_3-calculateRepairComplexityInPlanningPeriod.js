// 3) Рассчитать месячное значение трудоемкости

const clonedeep = require('lodash.clonedeep')
const PLANNING_PERIOD = require('../constants').PLANNING_PERIOD
const calculateComplexityOfEquipmentNodes = require('./_2-calculateComplexityOfEquipmentNodes')

module.exports = function(data) {
    // Рассчитаны трудоемкости для узлов оборудования
    const d = clonedeep(calculateComplexityOfEquipmentNodes(data))

    Object.keys(d).forEach(key => {
        let sumAmountAllNodes = 0
        let sumTimeAllNodes = 0
        let sumMechanicRepairComplexity = 0
        let sumElectricRepairComplexity = 0
        const nodes = {}
        d[key]['data'].forEach(item => {
            if (item['typeOfRepair'] === 'medium') {
                sumMechanicRepairComplexity += item['mechanicRepairComplexity']
                sumElectricRepairComplexity += item['electricRepairComplexity']
            }
            if (item['typeOfRepair'] === 'nodes') {
                let sumMechanicRepairComplexityNodes = 0
                //let sumElectricRepairComplexityNodes = 0
                Object.keys(item.nodes).forEach(node => {
                    if (node[0] === '1') {
                        sumMechanicRepairComplexity += item.nodes[node]['repairСomplexityNode']
                        sumMechanicRepairComplexityNodes += item.nodes[node]['repairСomplexityNode']
                    }

                    if (node[0] === '2') {
                        sumElectricRepairComplexity += item.nodes[node]['repairСomplexityNode']
                        //sumElectricRepairComplexityNodes += item.nodes[node]['repairСomplexityNode']
                    }

                    // Добавить свойство - аварийные узлы с суммарным их количеством
                    let time
                    typeof item.nodes[node]['time'] === 'string'
                        ? (time = +item.nodes[node]['time'].replace(',', '.'))
                        : (time = +item.nodes[node]['time'])

                    nodes[node] = {
                        amount: (() =>
                            nodes[node]
                                ? nodes[node]['amount'] + item.nodes[node]['amount']
                                : item.nodes[node]['amount'])(),
                        time: (() => (nodes[node] ? nodes[node]['time'] + time : time))()
                    }
                    sumAmountAllNodes += item.nodes[node]['amount']
                    sumTimeAllNodes += time
                })
                item['sumMechanicRepairComplexityNodes'] = sumMechanicRepairComplexityNodes
                //item['sumElectricRepairComplexityNodes'] = sumElectricRepairComplexityNodes
            }
        })
        // Добавить свойства - общая ремонтая сложность по механике и электрике
        d[key]['sumMechanicRepairComplexity'] = sumMechanicRepairComplexity
        d[key]['sumElectricRepairComplexity'] = sumElectricRepairComplexity
        // Добавить свойства - ремонтная сложность в месяц по механике и электрике
        d[key]['inPlanningPeriodMechanicRepairComplexity'] =
            sumMechanicRepairComplexity / PLANNING_PERIOD
        //d[key]['inPlanningPeriodElectricRepairComplexity'] = sumElectricRepairComplexity / PLANNING_PERIOD
        // Добавить свойство - перечень наименований узлов в производстве
        d[key]['nodes'] = nodes
        // Добавить свойства количества и времени простоев всех узлов
        d[key]['sumAmountAllNodes'] = sumAmountAllNodes
        d[key]['sumTimeAllNodes'] = sumTimeAllNodes
    })

    //console.log(d)
    return d
}
