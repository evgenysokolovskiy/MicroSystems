// Сводная

const nameNodes = require(appRoot + '/server/constants/nameNodes')
const createCell = require(appRoot + '/server/tasks/build/helpers/cellCreator').createCell
const createCellCenter = require(appRoot + '/server/tasks/build/helpers/cellCreator')
    .createCellCenter
const createCellTitle = require(appRoot + '/server/tasks/build/helpers/cellCreator').createCellTitle

module.exports = function ({ collapseNodes, equipment, ws, defaultStyle, borderStyle }) {
    ws.row(2).freeze()
    ws.column(1).setWidth(45)
    ws.column(1).freeze()

    // Название листа
    createCell(ws, [1, 1], 'Итоги за период', defaultStyle)

    // column 1
    createCell(ws, [3, 1], 'Всего оборудования', defaultStyle)
    createCell(ws, [4, 1], 'Требуется ремонт', defaultStyle)
    createCell(ws, [5, 1], 'Средний ремонт', defaultStyle)
    createCell(ws, [6, 1], 'Узловой ремонт', defaultStyle)
    createCell(ws, [7, 1], 'Рем.сл. по мех.части для выполнения ремонтов', defaultStyle)
    createCell(ws, [8, 1], 'Рем.сл. по эл.части для выполнения ремонтов', defaultStyle)
    createCell(ws, [9, 1], 'Рем.сл.(мех. ч)/месяц', defaultStyle)

    // Суммарные показатели по всем производствам (column 2-4)
    const summary = calculateSummary(equipment, collapseNodes)
    ws.column(2).setWidth(8)
    ws.column(3).setWidth(8)
    ws.column(4).setWidth(8)

    createCellTitle(ws, [2, 2, 2, 4, true], `Все производства`, defaultStyle)
    createCell(ws, [3, 2, 3, 4, true], summary['allEquipment'], defaultStyle)
    createCell(ws, [4, 2, 4, 4, true], summary['filteredEquipment'], defaultStyle)
    createCell(ws, [5, 2, 5, 4, true], summary['middleCount'], defaultStyle)
    createCell(ws, [6, 2, 6, 4, true], summary['nodesCount'], defaultStyle)
    createCell(ws, [7, 2, 7, 4, true], summary['sumMechanicRepairComplexity'], defaultStyle)
    createCell(ws, [8, 2, 8, 4, true], summary['sumElectricRepairComplexity'], defaultStyle)
    createCell(
        ws,
        [9, 2, 9, 4, true],
        summary['inPlanningPeriodMechanicRepairComplexity'],
        defaultStyle
    )

    // Строка "Узел количество время"
    createCellCenter(ws, [10, 2], 'узел', defaultStyle)
    createCellCenter(ws, [10, 3], 'кол-во', defaultStyle)
    createCellCenter(ws, [10, 4], 'время', defaultStyle)

    // Узлы
    let row = 12
    let amount = 0
    let time = 0

    Object.keys(summary['nodes'])
        .sort()
        .forEach((node) => {
            // Наименование узла
            createCell(ws, [row, 1], nameNodes[node], defaultStyle)
            // Обозначение узла
            createCellCenter(ws, [row, 2], node, defaultStyle)
            // Количество аварийных остановок
            createCellCenter(ws, [row, 3], summary['nodes'][node]['amount'], defaultStyle)
            // Время аварийных остановок
            createCellCenter(ws, [row, 4], summary['nodes'][node]['time'], defaultStyle)
            row++
            amount += summary['nodes'][node]['amount']
            time += summary['nodes'][node]['time']
        })

    // Данные всего:
    createCell(ws, [row, 2], 'Всего', defaultStyle)
    createCell(ws, [row, 3], amount, defaultStyle)
    createCell(ws, [row, 4], time, defaultStyle)

    // Показатели для каждого производства (column 5 - ...)
    let step1 = 5
    let step3 = 5
    let nodeStep = 5
    Object.keys(equipment).forEach((key) => {
        if (
            key === '60' ||
            key === 'undefined' ||
            key === 'Произ-во' ||
            key === '71' ||
            key === '77'
        )
            return // здесь фильтровать нужные производства

        // Названия производств
        createCellTitle(ws, [2, step3, 2, step3 + 2, true], `Производство №${key}`, defaultStyle)
        createCell(ws, [3, step3, 3, step3 + 2, true], equipment[key]['allEquipment'], defaultStyle)
        createCell(
            ws,
            [4, step3, 4, step3 + 2, true],
            equipment[key]['filteredEquipment'],
            defaultStyle
        )
        createCell(ws, [5, step3, 5, step3 + 2, true], equipment[key]['middleCount'], defaultStyle)
        createCell(ws, [6, step3, 6, step3 + 2, true], equipment[key]['nodesCount'], defaultStyle)
        createCell(
            ws,
            [7, step3, 7, step3 + 2, true],
            equipment[key]['sumMechanicRepairComplexity'],
            defaultStyle
        )
        createCell(
            ws,
            [8, step3, 8, step3 + 2, true],
            equipment[key]['sumElectricRepairComplexity'],
            defaultStyle
        )
        createCell(
            ws,
            [9, step3, 9, step3 + 2, true],
            equipment[key]['inPlanningPeriodMechanicRepairComplexity'],
            defaultStyle
        )

        step3 = step3 + 3

        // Строка "Узел количество время"
        createCellCenter(ws, [10, step1], 'узел', defaultStyle)
        createCellCenter(ws, [10, ++step1], 'кол-во', defaultStyle)
        createCellCenter(ws, [10, ++step1], 'время', defaultStyle)
        ws.column(step1).setWidth(8)
        step1++

        // Узлы
        Object.keys(summary['nodes'])
            .sort()
            .forEach((item, i) => {
                let row = 12
                Object.keys(collapseNodes[key]['nodes'])
                    .sort()
                    .forEach((node) => {
                        if (node === item) {
                            row = 12 + i
                            // Обозначение узла
                            createCellCenter(ws, [row, nodeStep], node, defaultStyle)
                            // Количество аварийных остановок
                            createCellCenter(
                                ws,
                                [row, ++nodeStep],
                                collapseNodes[key]['nodes'][node]['amount'],
                                defaultStyle
                            )
                            // Время аварийных остановок
                            createCellCenter(
                                ws,
                                [row, ++nodeStep],
                                collapseNodes[key]['nodes'][node]['time'],
                                defaultStyle
                            )
                            nodeStep = nodeStep - 2
                        }
                    })
            })

        // Данные всего:
        createCell(ws, [row, nodeStep], 'Всего', defaultStyle)
        createCell(ws, [row, ++nodeStep], collapseNodes[key]['sumAmountAllNodes'], defaultStyle)
        createCell(ws, [row, ++nodeStep], collapseNodes[key]['sumTimeAllNodes'], defaultStyle)
        nodeStep++

        // Вертикальная граница между производствами
        ws.cell(2, step3, row, step3).style({ border: { left: { style: 'thin' } } })
    })
    // Вертикальная граница перед итогами
    ws.cell(2, 5, row, 5).style({ border: { left: { style: 'thin' } } })
    ws.cell(2, 1, row, (() => --step1)()).style(borderStyle)
}

// Рассчитать суммарные данные по всем производствам
function calculateSummary(equipment, collapseNodes) {
    const nodes = {}
    let summary = {}
    Object.keys(equipment).forEach((key) => {
        if (key === 'undefined' || key === 'Произ-во' || key === '71' || key === '77') return // здесь фильтровать нужные производства

        Object.keys(collapseNodes[key]['nodes'])
            .sort()
            .forEach((node) => {
                // Получить суммарные показатели по количеству и времени остановок по узлам
                if (nodes[node]) {
                    nodes[node]['amount'] += collapseNodes[key]['nodes'][node]['amount']
                    nodes[node]['time'] += collapseNodes[key]['nodes'][node]['time']
                } else {
                    nodes[node] = {
                        amount: collapseNodes[key]['nodes'][node]['amount'],
                        time: collapseNodes[key]['nodes'][node]['time']
                    }
                }
            })

        summary = {
            allEquipment: (() =>
                this.allEquipment
                    ? (this.allEquipment += equipment[key]['allEquipment'])
                    : (this.allEquipment = equipment[key]['allEquipment']))(),
            filteredEquipment: (() =>
                this.filteredEquipment
                    ? (this.filteredEquipment += equipment[key]['filteredEquipment'])
                    : (this.filteredEquipment = equipment[key]['filteredEquipment']))(),
            middleCount: (() =>
                this.middleCount
                    ? (this.middleCount += equipment[key]['middleCount'])
                    : (this.middleCount = equipment[key]['middleCount']))(),
            nodesCount: (() =>
                this.nodesCount
                    ? (this.nodesCount += equipment[key]['nodesCount'])
                    : (this.nodesCount = equipment[key]['nodesCount']))(),
            sumMechanicRepairComplexity: (() =>
                this.sumMechanicRepairComplexity
                    ? (this.sumMechanicRepairComplexity +=
                          equipment[key]['sumMechanicRepairComplexity'])
                    : (this.sumMechanicRepairComplexity =
                          equipment[key]['sumMechanicRepairComplexity']))(),
            sumElectricRepairComplexity: (() =>
                this.sumElectricRepairComplexity
                    ? (this.sumElectricRepairComplexity +=
                          equipment[key]['sumElectricRepairComplexity'])
                    : (this.sumElectricRepairComplexity =
                          equipment[key]['sumElectricRepairComplexity']))(),
            inPlanningPeriodMechanicRepairComplexity: (() =>
                this.inPlanningPeriodMechanicRepairComplexity
                    ? (this.inPlanningPeriodMechanicRepairComplexity +=
                          equipment[key]['inPlanningPeriodMechanicRepairComplexity'])
                    : (this.inPlanningPeriodMechanicRepairComplexity =
                          equipment[key]['inPlanningPeriodMechanicRepairComplexity']))(),
            nodes
        }
    })
    return summary
}
