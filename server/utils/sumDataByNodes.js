// 3) Фильтровать данные по лимиту аварийных остановок

const clonedeep = require('lodash.clonedeep')
const splitProductionEquipment = require('./primaryDataProcessing/_2-splitProductionEquipment')

module.exports = function(data) {
    // объект, где ключи - это номера производств
    // Значения - массив объектов, принадлежащих производству
    const d = clonedeep(splitProductionEquipment(data))
    // keys - Обозначение производств (свойства объекта)
    const keys = Object.keys(d)
    // - Первый цикл - Пройтись по каждому производству
    // - Второй цикл - Пройтись по массивам объектов (Для каждого производства). Каждый объект - единица оборудования
    // - Третий цикл - Пройтись по значению свойства "nodes" объектов. Представляет коды простоев.
    // Каждый код имеет значение - объект со свойствами количества и времени простоев
    let obj = {}
    keys.forEach(key => {
        let sumAmountAllNodes = 0 // Суммарное количество остановок по всем узлам
        let sumTimeAllNodes = 0 // Суммарное время остановок по всем узлам
        let nodes = {}
        d[key]['data'].forEach(item => {
            Object.keys(item.nodes).forEach(node => {
                // Суммировать время простоев
                // Дробное значение времени в исходной таблице excel предоставляется с запятой, имеет тип строки
                // Необходимо преобразовать к числу с плавающей точкой
                // Для натуральных чисел преобразование не требуется
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
        })
        obj[key] = {
            nodes,
            sumAmountAllNodes,
            sumTimeAllNodes
        }
    })

    //console.log(obj['56']['nodes'])
    return obj
}
