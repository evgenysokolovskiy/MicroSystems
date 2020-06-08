// 2) Рассчитать трудоемкости для узлов оборудования

const clonedeep = require('lodash.clonedeep')
const model = require('../../constants/model.js')
const LENGTH_MEDIUM_REPAIR_NODES = require('../../config/repaire/').LENGTH_MEDIUM_REPAIR_NODES
const MIN_LENGTH_MEDIUM_REPAIR_MECHANIC_NODES = require('../../config/repaire/')
    .MIN_LENGTH_MEDIUM_REPAIR_MECHANIC_NODES
const filterDataByEmergencyStopLimit = require('./_1-filterDataByEmergencyStopLimit')

module.exports = function(data) {
    // Отфильтрованные данные по лимиту аварийных остановок
    const d = clonedeep(filterDataByEmergencyStopLimit(data))

    const obj = {}
    Object.keys(d).forEach(key => {
        d[key]['data'].forEach((item, index) => {
            // Удалить текущий объект, если нет узлов ни по механике ни по электрике
            if (item['lengthNodesMechanic'] === 0 && item['lengthNodesElectric'] === 0) {
                d[key]['data'].splice(index, 1)
                return
            }
            // Добавить свойство - вид ремонта
            ;+item['lengthNodesMechanic'] + +item['lengthNodesElectric'] >=
                LENGTH_MEDIUM_REPAIR_NODES &&
            +item['lengthNodesMechanic'] >= MIN_LENGTH_MEDIUM_REPAIR_MECHANIC_NODES
                ? (item['typeOfRepair'] = 'medium')
                : (item['typeOfRepair'] = 'nodes')

            if (!model[item.model]) obj[item.model] = true
            // Добавить свойства - (полная) ремонтная сложность среднего ремонта по механике и электрике
            if (model[item.model]) item['mechanicRepairComplexity'] = model[item.model].mechanic
            if (model[item.model]) item['electricRepairComplexity'] = model[item.model].electric
            Object.keys(item.nodes).forEach(node => {
                if (node[0] === '1') {
                    const percentMechanic =
                        +item.nodes[node]['oneRepairTime'] / +item['sumOneRepairTimeMechanic']
                    // Добавить свойство - процент данного узла от суммы остальных узлов по механической части
                    item.nodes[node]['percentOfAllNodes'] = percentMechanic
                    // Добавить свойство - ремонтная сложность данного узла
                    item.nodes[node]['repairСomplexityNode'] =
                        ((percentMechanic * item['mechanicRepairComplexity']) /
                            LENGTH_MEDIUM_REPAIR_NODES) *
                        item['lengthNodesMechanic']
                }

                if (node[0] === '2') {
                    const percentElectric =
                        +item.nodes[node]['oneRepairTime'] / +item['sumOneRepairTimeElectric']
                    // Добавить свойство - процент данного узла от суммы остальных узлов по электрической части
                    item.nodes[node]['percentOfAllNodes'] = percentElectric
                    // Добавить свойство - ремонтная сложность данного узла
                    item.nodes[node]['repairСomplexityNode'] =
                        ((percentElectric * item['electricRepairComplexity']) /
                            LENGTH_MEDIUM_REPAIR_NODES) *
                        item['lengthNodesElectric']
                }
            })
        })
    })

    //console.log(d)
    return d
}
