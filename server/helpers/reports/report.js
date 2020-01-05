// Отчёт "система_анализа_и_планирования_ремонтов_оборудования"

const fs = require('fs')
const xlsx = require('node-xlsx')
const calculatePlan = require('../calculatePlan/_6-calculatePlan')

module.exports = function(rootDir, reportsDir) {
    fs.readdir(rootDir, function(err, files) {
        const paths = files.map(item => `${rootDir}/${item}`)
        for (let i = 0; i < paths.length; i++) {
            new Promise(function(resolve, reject) {
                // Прочитать файл по ссылке paths[i]
                const data = xlsx.parse(`${paths[i]}`)[0].data
                if (data) {
                    const plan = calculatePlan(data) // Рассчитать план с помощью функции calculatePlan
                    let spot = [] // Номер производства
                    let allEquipment = [] // Всё задействованное оборудование (количество единиц оборудования)
                    let filteredEquipment = [] // Требуется ремонт (количество единиц оборудования)
                    let middleCount = [] // Требуется средний ремонт (количество единиц оборудования)
                    let nodesCount = [] // Требуется узловой ремонт (количество единиц оборудования)
                    let sumMechanicRepairComplexity = [] // Суммарный показатель ремонтной сложности для оборудования, которому требуется ремонт по механической части
                    let sumElectricRepairComplexity = [] // Суммарный показатель ремонтной сложности для оборудования, которому требуется ремонт по электрической части
                    let inPlanningPeriodMechanicRepairComplexity = [] // Среднемесячная ремонтая сложность по механической части исходя из годового плана ремонтов
                    let sumAmountAllNodes = [] // Суммарное количество аварийных остановок по узлу
                    let sumTimeAllNodes = [] // Суммарное время аварийных остановок по узлу
                    let itemsTitle = [] //  "Узел количество время"
                    let summary = [] // Суммарные показатели всех узлов
                    let lengthNodes = [] // Количество узлов
                    let nodes = [] // Узлы

                    // Построить строки таблицы
                    // Каждая строка включает данные для всех производств
                    Object.keys(plan).forEach(key => {
                        if (key === 'undefined' || key === 'Произ-во') return // здесь фильтровать нужные производства

                        spot = [...spot, `Производство №${key}`, null, null]
                        allEquipment = [...allEquipment, plan[key]['allEquipment'], null, null]
                        filteredEquipment = [
                            ...filteredEquipment,
                            plan[key]['filteredEquipment'],
                            null,
                            null
                        ]
                        middleCount = [...middleCount, plan[key]['middleCount'], null, null]
                        nodesCount = [...nodesCount, plan[key]['nodesCount'], null, null]
                        sumMechanicRepairComplexity = [
                            ...sumMechanicRepairComplexity,
                            plan[key]['sumMechanicRepairComplexity'],
                            null,
                            null
                        ]
                        sumElectricRepairComplexity = [
                            ...sumElectricRepairComplexity,
                            plan[key]['sumElectricRepairComplexity'],
                            null,
                            null
                        ]
                        inPlanningPeriodMechanicRepairComplexity = [
                            ...inPlanningPeriodMechanicRepairComplexity,
                            plan[key]['inPlanningPeriodMechanicRepairComplexity'],
                            null,
                            null
                        ]
                        sumAmountAllNodes = [
                            ...sumAmountAllNodes,
                            plan[key]['sumAmountAllNodes'],
                            null,
                            null
                        ]
                        sumTimeAllNodes = [
                            ...sumTimeAllNodes,
                            plan[key]['sumTimeAllNodes'],
                            null,
                            null
                        ]
                        itemsTitle = [...itemsTitle, 'Узел', 'Кол-во', 'Время']
                        summary = [
                            ...summary,
                            'Всего:',
                            plan[key]['sumAmountAllNodes'],
                            plan[key]['sumTimeAllNodes']
                        ]

                        const item = Object.keys(plan[key]['nodes']).map(item => {
                            return [
                                item,
                                plan[key]['nodes'][item]['amount'],
                                plan[key]['nodes'][item]['time']
                            ]
                        })
                        lengthNodes = [...lengthNodes, item.length]
                        nodes = [...nodes, item]
                    })

                    let rows = {} // строки в таблице excel
                    const maxlengthNodes = Math.max(...lengthNodes) // Максимальное количество узлов
                    for (let i = 0; i < maxlengthNodes; i++) {
                        for (let j = 0; j < nodes.length; j++) {
                            nodes[j][i]
                                ? (rows[i] = (() =>
                                      rows[i]
                                          ? [...rows[i], ...nodes[j][i]]
                                          : [null, ...nodes[j][i]])())
                                : (rows[i] = (() =>
                                      rows[i]
                                          ? [...rows[i], null, null, null]
                                          : [null, null, null, null])())
                        }
                    }

                    // Построить таблицу из строк
                    // Каждый массив - строка, начиная сверху таблицы
                    const summarySheet = [
                        ['План 2020г / Итоги 2019г'],
                        [null],
                        [null, ...spot],
                        ['Всего оборудования', ...allEquipment],
                        ['Требуется ремонт', ...filteredEquipment],
                        ['Средний ремонт', ...middleCount],
                        ['Узловой ремонт', ...nodesCount],
                        ['Рем.сл. по мех.части', ...sumMechanicRepairComplexity],
                        ['Рем.сл. по эл.части', ...sumElectricRepairComplexity],
                        ['Рем.сл.(мех. ч)/месяц', ...inPlanningPeriodMechanicRepairComplexity],
                        [null],
                        [null, ...itemsTitle],
                        ...Object.values(rows),
                        [null, ...summary]
                    ]

                    // options - прописать объединения ячеек
                    const title = { s: { c: 0, r: 0 }, e: { c: 1, r: 0 } }
                    let ranges = []
                    let begin = 1
                    let end = 3
                    Object.keys(plan).forEach(key => {
                        // В строках, начиная со строки с индексом 2 и заканчивая индексом 10
                        // объединить ячейки по вертикали в интервале между индексами begin и end
                        let rows = []
                        for (let i = 2; i < 10; i++) {
                            let r = i
                            rows = [...rows, { s: { c: begin, r }, e: { c: end, r } }]
                        }

                        ranges = [...ranges, ...rows]
                        begin = begin + 3
                        end = end + 3
                    })

                    const options = {
                        '!merges': [title, ...ranges],
                        '!color': { rgb: 'F24578' }
                    }

                    // Создать бинарные данные
                    const buffer = xlsx.build([{ name: 'сводная', data: summarySheet }], options)

                    // Создать файл и записать в него бинарные данные
                    resolve(
                        fs.writeFile(
                            `${reportsDir}/система_анализа_и_планирования_ремонтов_оборудования.xlsx`,
                            buffer,
                            'utf-8',
                            err => {
                                if (err) throw err
                            }
                        )
                    )
                } else {
                    reject(new Error('Err'))
                }
            })
                .then(console.log('Файл успешно сохранён!'))
                .catch(err => console.log(err))
        }
    })
}
