// Сводная

module.exports = function({ collapseNodes, plan, ws, defaultStyle, borderStyle }) {
    ws.row(2).freeze()
    ws.column(1).setWidth(45)
    ws.column(1).freeze()

    // Название листа
    createCell(ws, [1, 1], 'Итоги 2019г', defaultStyle)

    // column 1
    createCell(ws, [3, 1], 'Всего оборудования', defaultStyle)
    createCell(ws, [4, 1], 'Требуется ремонт', defaultStyle)
    createCell(ws, [5, 1], 'Средний ремонт', defaultStyle)
    createCell(ws, [6, 1], 'Узловой ремонт', defaultStyle)
    createCell(ws, [7, 1], 'Рем.сл. по мех.части для выполнения ремонтов', defaultStyle)
    createCell(ws, [8, 1], 'Рем.сл. по эл.части для выполнения ремонтов', defaultStyle)
    createCell(ws, [9, 1], 'Рем.сл.(мех. ч)/месяц', defaultStyle)

    /*
    // Наименования узлов
    ws.cell(12, 1).string('неисправность алмажения')
    ws.cell(13, 1).string('неисправность шпиндельного узла')
    ws.cell(14, 1).string('неисправность гидравлики')
    ws.cell(15, 1).string('неисправность пневматики')
    ws.cell(16, 1).string('неисправность загрузки-выгрузки')
    ws.cell(17, 1).string('неисправность главного привода')
    ws.cell(18, 1).string('неисправность коробки скоростей, подач')
    ws.cell(19, 1).string('неисправность наладочного привода')
    ws.cell(20, 1).string('неисправность системы стружкоудаления')
    ws.cell(21, 1).string('неисправность траверса')
    ws.cell(22, 1).string('неисправность шпиндельного барабана')
    ws.cell(23, 1).string('неисправность суппорта')
    ws.cell(24, 1).string('неисправность насоса')
    ws.cell(25, 1).string('неисправность системы смазки')
    ws.cell(26, 1).string('неисправность механизма подачи ленты')
    ws.cell(27, 1).string('Неисправность ножниц')
    ws.cell(28, 1).string('неисправность муфты-тормоза')
    ws.cell(29, 1).string('неисправность блоков питания')
    ws.cell(30, 1).string('неисправность электронных плат')
    ws.cell(31, 1).string('неисправность логических элементов')
    ws.cell(32, 1).string('неисправность асинхронного двигателя')
    ws.cell(33, 1).string('неисправность двигателя постоянного тока')
    ws.cell(34, 1).string('неисправность статического преобразователя частоты')
    ws.cell(35, 1).string('неисправность механического генератора')
    ws.cell(36, 1).string('неисправность электропривода')
    ws.cell(37, 1).string('неисправность бесконтактных датчиков')
    ws.cell(38, 1).string('неисправность электроаппаратуры')
    ws.cell(39, 1).string('неисправность цепей управления, силовых цепей')
    ws.cell(40, 1).string('неисправность электромеханических муфт')
    ws.cell(41, 1).string('неисправность масляного насоса')
*/

    // Суммарные показатели по всем производствам (column 2-4)
    const summary = calculateSummary(plan, collapseNodes)
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
        .forEach(node => {
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
    Object.keys(plan).forEach(key => {
        if (key === 'undefined' || key === 'Произ-во' || key === '71' || key === '77') return // здесь фильтровать нужные производства

        // Названия производств
        createCellTitle(ws, [2, step3, 2, step3 + 2, true], `Производство №${key}`, defaultStyle)
        createCell(ws, [3, step3, 3, step3 + 2, true], plan[key]['allEquipment'], defaultStyle)
        createCell(ws, [4, step3, 4, step3 + 2, true], plan[key]['filteredEquipment'], defaultStyle)
        createCell(ws, [5, step3, 5, step3 + 2, true], plan[key]['middleCount'], defaultStyle)
        createCell(ws, [6, step3, 6, step3 + 2, true], plan[key]['nodesCount'], defaultStyle)
        createCell(
            ws,
            [7, step3, 7, step3 + 2, true],
            plan[key]['sumMechanicRepairComplexity'],
            defaultStyle
        )
        createCell(
            ws,
            [8, step3, 8, step3 + 2, true],
            plan[key]['sumElectricRepairComplexity'],
            defaultStyle
        )
        createCell(
            ws,
            [9, step3, 9, step3 + 2, true],
            plan[key]['inPlanningPeriodMechanicRepairComplexity'],
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
                    .forEach(node => {
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
function calculateSummary(plan, collapseNodes) {
    const nodes = {}
    let summary = {}
    Object.keys(plan).forEach(key => {
        if (key === 'undefined' || key === 'Произ-во' || key === '71' || key === '77') return // здесь фильтровать нужные производства

        Object.keys(collapseNodes[key]['nodes'])
            .sort()
            .forEach(node => {
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
                    ? (this.allEquipment += plan[key]['allEquipment'])
                    : (this.allEquipment = plan[key]['allEquipment']))(),
            filteredEquipment: (() =>
                this.filteredEquipment
                    ? (this.filteredEquipment += plan[key]['filteredEquipment'])
                    : (this.filteredEquipment = plan[key]['filteredEquipment']))(),
            middleCount: (() =>
                this.middleCount
                    ? (this.middleCount += plan[key]['middleCount'])
                    : (this.middleCount = plan[key]['middleCount']))(),
            nodesCount: (() =>
                this.nodesCount
                    ? (this.nodesCount += plan[key]['nodesCount'])
                    : (this.nodesCount = plan[key]['nodesCount']))(),
            sumMechanicRepairComplexity: (() =>
                this.sumMechanicRepairComplexity
                    ? (this.sumMechanicRepairComplexity += plan[key]['sumMechanicRepairComplexity'])
                    : (this.sumMechanicRepairComplexity =
                          plan[key]['sumMechanicRepairComplexity']))(),
            sumElectricRepairComplexity: (() =>
                this.sumElectricRepairComplexity
                    ? (this.sumElectricRepairComplexity += plan[key]['sumElectricRepairComplexity'])
                    : (this.sumElectricRepairComplexity =
                          plan[key]['sumElectricRepairComplexity']))(),
            inPlanningPeriodMechanicRepairComplexity: (() =>
                this.inPlanningPeriodMechanicRepairComplexity
                    ? (this.inPlanningPeriodMechanicRepairComplexity +=
                          plan[key]['inPlanningPeriodMechanicRepairComplexity'])
                    : (this.inPlanningPeriodMechanicRepairComplexity =
                          plan[key]['inPlanningPeriodMechanicRepairComplexity']))(),
            nodes
        }
    })
    return summary
}

// Создать ячейку с данными
function createCell(ws, int, str, defaultStyle) {
    if (str) {
        if (typeof str === 'string') {
            ws.cell(...int)
                .string(str)
                .style(defaultStyle)
        } else if (typeof str === 'number') {
            ws.cell(...int)
                .number(str)
                .style(defaultStyle)
                .style({ alignment: { horizontal: 'right' } })
        }
    }
}

// Создать ячейку с данными (текст по центру)
function createCellCenter(ws, int, str, defaultStyle) {
    if (str) {
        if (typeof str === 'string') {
            ws.cell(...int)
                .string(str)
                .style(defaultStyle)
                .style({ alignment: { horizontal: 'center' } })
        } else if (typeof str === 'number') {
            ws.cell(...int)
                .number(str)
                .style(defaultStyle)
                .style({ alignment: { horizontal: 'right' } })
        }
    }
}

// Создать ячейку заголовка
function createCellTitle(ws, int, str, defaultStyle) {
    if (str) {
        if (typeof str === 'string') {
            ws.cell(...int)
                .string(str)
                .style(defaultStyle)
                .style({
                    font: { bold: true },
                    alignment: { horizontal: 'center', vertical: 'center' }
                })
        } else if (typeof str === 'number') {
            ws.cell(...int)
                .number(str)
                .style(defaultStyle)
                .style({
                    font: { bold: true },
                    alignment: { horizontal: 'center', vertical: 'center' }
                })
        }
    }
}
