// Сводная

module.exports = function({ data, plan, ws, defaultStyle, borderStyle }) {
    ws.row(2).freeze()
    ws.column(1).setWidth(40)
    ws.column(1).freeze()

    // Заголовок таблицы
    ws.cell(1, 1)
        .string('Итоги 2019г')
        .style(defaultStyle)

    // column 1
    ws.cell(3, 1).string('Всего оборудования')
    ws.cell(4, 1).string('Требуется ремонт')
    ws.cell(5, 1).string('Средний ремонт')
    ws.cell(6, 1).string('Узловой ремонт')
    ws.cell(7, 1).string('Рем.сл. по мех.части')
    ws.cell(8, 1).string('Рем.сл. по эл.части')
    ws.cell(9, 1).string('Рем.сл.(мех. ч)/месяц')

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
    const summary = calculateSummary(plan, data)
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
    let row = 12
    let amount = 0
    let time = 0

    Object.keys(summary['nodes'])
        .sort()
        .forEach(node => {
            // Обозначение узла
            ws.cell(row, 2)
                .string(node)
                .style(defaultStyle)
                .style({ alignment: { horizontal: 'center' } })
            // Количество аварийных остановок
            ws.cell(row, 3)
                .number(summary['nodes'][node]['amount'])
                .style(defaultStyle)
            // Время аварийных остановок
            ws.cell(row, 4)
                .number(summary['nodes'][node]['time'])
                .style(defaultStyle)
            row++
            amount += summary['nodes'][node]['amount']
            time += summary['nodes'][node]['time']
        })

    // Данные всего:
    ws.cell(row, 2)
        .string('Всего:')
        .style(defaultStyle)
    ws.cell(row, 3)
        .number(amount)
        .style(defaultStyle)
    ws.cell(row, 4)
        .number(time)
        .style(defaultStyle)

    // Показатели для каждого производства (column 5 - ...)
    let step1 = 5
    let step3 = 5
    let nodeStep = 5
    Object.keys(plan).forEach(key => {
        if (key === 'undefined' || key === 'Произ-во' || key === '71' || key === '77') return // здесь фильтровать нужные производства

        // Названия производств
        ws.cell(2, step3, 2, step3 + 2, true)
            .string(`Производство №${key}`)
            .style(defaultStyle)
            .style({ font: { bold: true }, alignment: { horizontal: 'center' } })

        ws.cell(3, step3, 3, step3 + 2, true)
            .number(plan[key]['allEquipment'])
            .style(defaultStyle)
        ws.cell(4, step3, 4, step3 + 2, true)
            .number(plan[key]['filteredEquipment'])
            .style(defaultStyle)
        ws.cell(5, step3, 5, step3 + 2, true)
            .number(plan[key]['middleCount'])
            .style(defaultStyle)
        ws.cell(6, step3, 6, step3 + 2, true)
            .number(plan[key]['nodesCount'])
            .style(defaultStyle)
        ws.cell(7, step3, 7, step3 + 2, true)
            .number(plan[key]['sumMechanicRepairComplexity'])
            .style(defaultStyle)
        ws.cell(8, step3, 8, step3 + 2, true)
            .number(plan[key]['sumElectricRepairComplexity'])
            .style(defaultStyle)
        ws.cell(9, step3, 9, step3 + 2, true)
            .number(plan[key]['inPlanningPeriodMechanicRepairComplexity'])
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
        Object.keys(summary['nodes'])
            .sort()
            .forEach((item, i) => {
                let row = 12
                Object.keys(data[key]['nodes'])
                    .sort()
                    .forEach(node => {
                        if (node === item) {
                            row = 12 + i
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
                            //row++
                            nodeStep = nodeStep - 2
                        }
                    })
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

        // Вертикальная граница между производствами
        ws.cell(2, step3, row, step3).style({ border: { left: { style: 'thin' } } })
    })
    // Вертикальная граница перед итогами
    ws.cell(2, 5, row, 5).style({ border: { left: { style: 'thin' } } })
    ws.cell(2, 1, row, (() => --step1)()).style(borderStyle)
}

// Рассчитать суммарные данные по всем производствам
function calculateSummary(plan, data) {
    const nodes = {}
    let summary = {}
    Object.keys(plan).forEach(key => {
        if (key === 'undefined' || key === 'Произ-во' || key === '71' || key === '77') return // здесь фильтровать нужные производства

        Object.keys(data[key]['nodes'])
            .sort()
            .forEach(node => {
                // Получить суммарные показатели по количеству и времени остановок по узлам
                if (nodes[node]) {
                    nodes[node]['amount'] += data[key]['nodes'][node]['amount']
                    nodes[node]['time'] += data[key]['nodes'][node]['time']
                } else {
                    nodes[node] = {
                        amount: data[key]['nodes'][node]['amount'],
                        time: data[key]['nodes'][node]['time']
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
