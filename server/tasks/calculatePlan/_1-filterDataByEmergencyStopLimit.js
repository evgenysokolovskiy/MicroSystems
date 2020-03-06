// 1) Фильтровать данные по лимиту аварийных остановок

const clonedeep = require('lodash.clonedeep')
const LIMIT_NUMBER_EMERGENCY_STOPS = require('../../config/repaire/').LIMIT_NUMBER_EMERGENCY_STOPS
const splitProductionEquipment = require('../primaryDataProcessing/_2-splitProductionEquipment')

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
    // - В третьем цикле оставить только коды, соответствующие лимиту
    // - Во втором цикле вернуть новый массив с кодами из третьего цикла
    // - В первом цикле каждому производству (ключ объекта) присвоить новый массив
    let obj = {}
    keys.forEach(key => {
        const filteredObj = d[key]['data'].filter(item => {
            let sumAmount = 0 // Суммарное количество остановок по всем узлам
            let sumTime = 0 // Суммарное время остановок по всем узлам
            let oneRepairTime = 0 // Среднее время одного ремонта узла
            let sumOneRepairTimeMechanic = 0 // Суммарное время одного ремонта всех узлов по механической части
            let sumOneRepairTimeElectric = 0 // Суммарное время одного ремонта всех узлов по механической части
            let lengthNodesMechanic = 0 // Количество узлов по механике
            let lengthNodesElectric = 0 // Количество узлов по электрике
            Object.keys(item.nodes).forEach(node => {
                // LIMIT_NUMBER_EMERGENCY_STOPS[key] - лимит аварийных остановок для текущего производства
                if (item.nodes[node].amount < LIMIT_NUMBER_EMERGENCY_STOPS[key]) {
                    // Удалить код простоя, если его количество меньше допустимого лимита
                    delete item.nodes[node]
                } else {
                    // Данные рассчитываются по оставшимся узлам (где количество простоев больше лимита)
                    // Суммировать количества простоев
                    sumAmount += item.nodes[node].amount
                    // Суммировать время простоев
                    // Дробное значение времени в исходной таблице excel предоставляется с запятой, имеет тип строки
                    // Необходимо преобразовать к числу с плавающей точкой
                    // Для натуральных чисел преобразование не требуется
                    let time
                    const itemnodesTime = item.nodes[node].time
                    typeof itemnodesTime === 'string'
                        ? (time = +itemnodesTime.replace(',', '.'))
                        : (time = +itemnodesTime)
                    sumTime += time
                    // Время одного ремонта по узлу
                    oneRepairTime = time / +item.nodes[node].amount
                    // Рассчитать суммарное время одного ремонта всех узлов, количество остановок которых больших лимита
                    if (node[0] === '1') {
                        sumOneRepairTimeMechanic += oneRepairTime
                        lengthNodesMechanic++
                    }
                    if (node[0] === '2') {
                        sumOneRepairTimeElectric += oneRepairTime
                        lengthNodesElectric++
                    }
                    // Добавить свойство - время одного ремонта
                    item.nodes[node]['oneRepairTime'] = oneRepairTime
                    // Добавить свойство "sumAmount" - сумма количества простоев
                    item['sumAmount'] = sumAmount
                    // Добавить свойство "sumTime" - сумма времени простоев
                    item['sumTime'] = sumTime
                }
            })
            // Добавить свойства - суммарное время одного ремонта всех узлов по механике и электрике
            item['sumOneRepairTimeMechanic'] = sumOneRepairTimeMechanic
            item['sumOneRepairTimeElectric'] = sumOneRepairTimeElectric
            // Добавить свойства количества узлов по механике и электрике
            item['lengthNodesMechanic'] = lengthNodesMechanic
            item['lengthNodesElectric'] = lengthNodesElectric

            return item
        })
        obj[key] = {
            data: filteredObj,
            allEquipment: d[key]['allEquipment']
        }
    })

    //console.log(obj)
    return obj
}
