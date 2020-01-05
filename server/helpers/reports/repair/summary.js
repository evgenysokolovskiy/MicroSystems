// Сводная

module.exports = function(data, ws, defaultStyle, bgStyle) {
    ws.row(3).freeze()
    ws.column(1).setWidth(20)
    ws.column(1).freeze()

    // Заголовок таблицы
    ws.cell(1, 1)
        .string('Итоги 2019г')
        .style(defaultStyle)

    // Критерии - первый столбец
    ws.cell(4, 1).string('Всего оборудования')
    ws.cell(5, 1).string('Требуется ремонт')
    ws.cell(6, 1).string('Средний ремонт')
    ws.cell(7, 1).string('Узловой ремонт')
    ws.cell(8, 1).string('Рем.сл. по мех.части')
    ws.cell(9, 1).string('Рем.сл. по эл.части')
    ws.cell(10, 1).string('Рем.сл.(мех. ч)/месяц')

    let step1 = 2
    let step3 = 2
    let nodeStep = 2
    Object.keys(data).forEach(key => {
        if (key === 'undefined' || key === 'Произ-во') return // здесь фильтровать нужные производства

        // Названия производств
        ws.cell(3, step3, 3, step3 + 2, true)
            .string(`Производство №${key}`)
            .style(defaultStyle)
            .style({ font: { bold: true }, alignment: { horizontal: 'center' } })

        // Данные в соответствии с критериями в первом столбце
        ws.cell(4, step3, 4, step3 + 2, true)
            .number(data[key]['allEquipment'])
            .style(defaultStyle)
        ws.cell(5, step3, 5, step3 + 2, true)
            .number(data[key]['filteredEquipment'])
            .style(defaultStyle)
        ws.cell(6, step3, 6, step3 + 2, true)
            .number(data[key]['middleCount'])
            .style(defaultStyle)
        ws.cell(7, step3, 7, step3 + 2, true)
            .number(data[key]['nodesCount'])
            .style(defaultStyle)
        ws.cell(8, step3, 8, step3 + 2, true)
            .number(data[key]['sumMechanicRepairComplexity'])
            .style(defaultStyle)
        ws.cell(9, step3, 9, step3 + 2, true)
            .number(data[key]['sumElectricRepairComplexity'])
            .style(defaultStyle)
        ws.cell(10, step3, 10, step3 + 2, true)
            .number(data[key]['inPlanningPeriodMechanicRepairComplexity'])
            .style(defaultStyle)

        step3 = step3 + 3

        // Строка "Узел количество время"
        ws.cell(11, step1)
            .string('узел')
            .style(defaultStyle)
            .style({ alignment: { horizontal: 'center' } })
        ws.cell(11, ++step1)
            .string('количество')
            .style(defaultStyle)
            .style({ alignment: { horizontal: 'center' } })
        ws.cell(11, ++step1)
            .string('время')
            .style(defaultStyle)
            .style({ alignment: { horizontal: 'center' } })
        step1++

        // Узлы
        let row = 13
        Object.keys(data[key]['nodes']).forEach(node => {
            ws.cell(row, nodeStep)
                .string(node)
                .style(defaultStyle)
            ws.cell(row, ++nodeStep)
                .number(data[key]['nodes'][node]['amount'])
                .style(defaultStyle)
            ws.cell(row, ++nodeStep)
                .number(data[key]['nodes'][node]['time'])
                .style(defaultStyle)
            row++
            nodeStep--
            nodeStep--
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
    })
}
