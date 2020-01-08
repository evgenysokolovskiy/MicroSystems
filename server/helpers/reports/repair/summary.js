// Сводная

module.exports = function(data, ws, defaultStyle) {
    ws.row(2).freeze()
    ws.column(1).setWidth(20)
    ws.column(1).freeze()

    // Заголовок таблицы
    ws.cell(1, 1)
        .string('Итоги 2019г')
        .style(defaultStyle)

    // Первый столбец
    ws.cell(3, 1).string('Всего оборудования')
    ws.cell(4, 1).string('Требуется ремонт')
    ws.cell(5, 1).string('Средний ремонт')
    ws.cell(6, 1).string('Узловой ремонт')
    ws.cell(7, 1).string('Рем.сл. по мех.части')
    ws.cell(8, 1).string('Рем.сл. по эл.части')
    ws.cell(9, 1).string('Рем.сл.(мех. ч)/месяц')

    let step1 = 5
    let step3 = 5
    let nodeStep = 5
    let summary = {}
    let summaryNodes = {}

    // * ПОКАЗАТЕЛИ ДЛЯ ПРОИЗВОДСТВ
    Object.keys(data).forEach(key => {
        if (key === 'undefined' || key === 'Произ-во' || key === '71' || key === '77') return // здесь фильтровать нужные производства

        // Названия производств
        ws.cell(2, step3, 2, step3 + 2, true)
            .string(`Производство №${key}`)
            .style(defaultStyle)
            .style({ font: { bold: true }, alignment: { horizontal: 'center' } })

        // Первый столбец
        ws.cell(3, step3, 3, step3 + 2, true)
            .number(data[key]['allEquipment'])
            .style(defaultStyle)
        ws.cell(4, step3, 4, step3 + 2, true)
            .number(data[key]['filteredEquipment'])
            .style(defaultStyle)
        ws.cell(5, step3, 5, step3 + 2, true)
            .number(data[key]['middleCount'])
            .style(defaultStyle)
        ws.cell(6, step3, 6, step3 + 2, true)
            .number(data[key]['nodesCount'])
            .style(defaultStyle)
        ws.cell(7, step3, 7, step3 + 2, true)
            .number(data[key]['sumMechanicRepairComplexity'])
            .style(defaultStyle)
        ws.cell(8, step3, 8, step3 + 2, true)
            .number(data[key]['sumElectricRepairComplexity'])
            .style(defaultStyle)
        ws.cell(9, step3, 9, step3 + 2, true)
            .number(data[key]['inPlanningPeriodMechanicRepairComplexity'])
            .style(defaultStyle)

        step3 = step3 + 3

        // Строка "Узел количество время"
        ws.cell(10, step1)
            .string('узел')
            .style(defaultStyle)
            .style({ alignment: { horizontal: 'center' } })
        ws.column(step1).setWidth(8)
        ws.cell(10, ++step1)
            .string('кол-во')
            .style(defaultStyle)
            .style({ alignment: { horizontal: 'center' } })
        ws.column(step1).setWidth(8)
        ws.cell(10, ++step1)
            .string('время')
            .style(defaultStyle)
            .style({ alignment: { horizontal: 'center' } })
        ws.column(step1).setWidth(8)
        step1++

        // Узлы
        let row = 12
        Object.keys(data[key]['nodes'])
            .sort()
            .forEach(node => {
                // Обозначение узла
                ws.cell(row, nodeStep)
                    .string(node)
                    .style(defaultStyle)
                    .style({ alignment: { horizontal: 'center' } })
                // Количество аварийных остановок
                ws.cell(row, ++nodeStep)
                    .number(data[key]['nodes'][node]['amount'])
                    .style(defaultStyle)
                // Время аварийных остановок
                ws.cell(row, ++nodeStep)
                    .number(data[key]['nodes'][node]['time'])
                    .style(defaultStyle)
                row++
                nodeStep = nodeStep - 2

                // Получить суммарные показатели по количеству и времени остановок по узлам
                if (summaryNodes[node]) {
                    summaryNodes[node]['amount'] += data[key]['nodes'][node]['amount']
                    summaryNodes[node]['time'] += data[key]['nodes'][node]['time']
                } else {
                    summaryNodes[node] = {
                        amount: data[key]['nodes'][node]['amount'],
                        time: data[key]['nodes'][node]['time']
                    }
                }
            })
        ws.cell(row, nodeStep)
            .string('Всего:')
            .style(defaultStyle)
        ws.cell(row, ++nodeStep)
            .number(data[key]['sumAmountAllNodes'])
            .style(defaultStyle)
        ws.cell(row, ++nodeStep)
            .number(data[key]['sumTimeAllNodes'])
            .style(defaultStyle)
        nodeStep++

        // Вертикальная граница после итогов
        ws.cell(2, 5, row, 5).style({ border: { left: { style: 'thin' } } })
        // Вертикальная граница между производствами
        ws.cell(2, step3, row, step3).style({ border: { left: { style: 'thin' } } })
        // Получить суммарные данные по всем производствам
        summary = {
            allEquipment: (() =>
                this.allEquipment
                    ? (this.allEquipment += data[key]['allEquipment'])
                    : (this.allEquipment = data[key]['allEquipment']))(),
            filteredEquipment: (() =>
                this.filteredEquipment
                    ? (this.filteredEquipment += data[key]['filteredEquipment'])
                    : (this.filteredEquipment = data[key]['filteredEquipment']))(),
            middleCount: (() =>
                this.middleCount
                    ? (this.middleCount += data[key]['middleCount'])
                    : (this.middleCount = data[key]['middleCount']))(),
            nodesCount: (() =>
                this.nodesCount
                    ? (this.nodesCount += data[key]['nodesCount'])
                    : (this.nodesCount = data[key]['nodesCount']))(),
            sumMechanicRepairComplexity: (() =>
                this.sumMechanicRepairComplexity
                    ? (this.sumMechanicRepairComplexity += data[key]['sumMechanicRepairComplexity'])
                    : (this.sumMechanicRepairComplexity =
                          data[key]['sumMechanicRepairComplexity']))(),
            sumElectricRepairComplexity: (() =>
                this.sumElectricRepairComplexity
                    ? (this.sumElectricRepairComplexity += data[key]['sumElectricRepairComplexity'])
                    : (this.sumElectricRepairComplexity =
                          data[key]['sumElectricRepairComplexity']))(),
            inPlanningPeriodMechanicRepairComplexity: (() =>
                this.inPlanningPeriodMechanicRepairComplexity
                    ? (this.inPlanningPeriodMechanicRepairComplexity +=
                          data[key]['inPlanningPeriodMechanicRepairComplexity'])
                    : (this.inPlanningPeriodMechanicRepairComplexity =
                          data[key]['inPlanningPeriodMechanicRepairComplexity']))(),
            nodes: summaryNodes
        }
    })

    // * ПОКАЗАТЕЛИ ПО ВСЕМ ПРОИЗВОДСТВАМ
    ws.column(2).setWidth(8)
    ws.column(3).setWidth(8)
    ws.column(4).setWidth(8)

    ws.cell(2, 2, 2, 4, true)
        .string(`Все производства`)
        .style(defaultStyle)
        .style({ font: { bold: true }, alignment: { horizontal: 'center' } })

    ws.cell(3, 2, 3, 4, true)
        .number(summary['allEquipment'])
        .style(defaultStyle)

    ws.cell(4, 2, 4, 4, true)
        .number(summary['filteredEquipment'])
        .style(defaultStyle)

    ws.cell(5, 2, 5, 4, true)
        .number(summary['middleCount'])
        .style(defaultStyle)

    ws.cell(6, 2, 6, 4, true)
        .number(summary['nodesCount'])
        .style(defaultStyle)

    ws.cell(7, 2, 7, 4, true)
        .number(summary['sumMechanicRepairComplexity'])
        .style(defaultStyle)

    ws.cell(8, 2, 8, 4, true)
        .number(summary['sumElectricRepairComplexity'])
        .style(defaultStyle)

    ws.cell(9, 2, 9, 4, true)
        .number(summary['inPlanningPeriodMechanicRepairComplexity'])
        .style(defaultStyle)

    // Строка "Узел количество время"
    ws.cell(10, 2)
        .string('узел')
        .style(defaultStyle)
        .style({ alignment: { horizontal: 'center' } })
    ws.cell(10, 3)
        .string('кол-во')
        .style(defaultStyle)
        .style({ alignment: { horizontal: 'center' } })
    ws.cell(10, 4)
        .string('время')
        .style(defaultStyle)
        .style({ alignment: { horizontal: 'center' } })

    // Узлы
    let r = 12
    let n = 2
    let sumAmount = 0
    let sumTime = 0
    let step = 2

    Object.keys(summary['nodes'])
        .sort()
        .forEach(node => {
            sumAmount += summary['nodes'][node]['amount']
            sumTime += summary['nodes'][node]['time']
            // Обозначение узла
            ws.cell(r, n)
                .string(node)
                .style(defaultStyle)
                .style({ alignment: { horizontal: 'center' } })
            // Количество аварийных остановок
            ws.cell(r, ++n)
                .number(summary['nodes'][node]['amount'])
                .style(defaultStyle)
            // Время аварийных остановок
            ws.cell(r, ++n)
                .number(summary['nodes'][node]['time'])
                .style(defaultStyle)
            r++
            n = n - 2
        })

    // Данные всего:
    ws.cell(r, step)
        .string('Всего:')
        .style(defaultStyle)
    ws.cell(r, ++step)
        .number(sumAmount)
        .style(defaultStyle)
    ws.cell(r, ++step)
        .number(sumTime)
        .style(defaultStyle)
    step++
}

// Функция сортировки по свойству sumAmount
function sortNodes(arr) {
    arr.sort((a, b) => a - b)
}
