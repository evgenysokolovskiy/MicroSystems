// Полная информация по оборудованию с сортировкой по цеховому номеру

const createCell = require(appRoot + '/server/tasks/build/helpers/cellCreator').createCell
const createCellCenter = require(appRoot + '/server/tasks/build/helpers/cellCreator')
    .createCellCenter

module.exports = function ({ equipmentFilteredPercentMoreNorm, plan, data, wb, defaultStyle }) {
    const obj = {}

    Object.keys(equipmentFilteredPercentMoreNorm).forEach((key) => {
        if (
            key === '60' ||
            key === '71' ||
            key === '77' ||
            key === 'undefined' ||
            key === 'Произ-во'
        )
            return // здесь фильтровать нужные производства

        obj[key] = wb.addWorksheet(key)
        const ws = obj[key]
        const borderStyle = wb.createStyle({
            border: {
                left: {
                    style: 'hair',
                    color: 'black'
                },
                right: {
                    style: 'hair',
                    color: 'black'
                },
                top: {
                    style: 'hair',
                    color: 'black'
                },
                bottom: {
                    style: 'hair',
                    color: 'black'
                },
                outline: false
            }
        })

        let row = 4
        ws.column(1).setWidth(7)
        ws.row(2).setHeight(30)
        ws.row(3).freeze()
        ws.column(2).setWidth(15)
        ws.column(4).setWidth(15)
        ws.column(6).setWidth(7)
        ws.column(7).setWidth(7)
        ws.column(8).setWidth(5)
        ws.column(11).setWidth(5)
        ws.column(12).setWidth(40)
        ws.column(13).setWidth(15)
        ws.column(15).setWidth(5)
        ws.column(16).setWidth(40)
        ws.column(17).setWidth(20)

        // Название листа
        createCell(
            ws,
            [1, 1, 1, 12, true],
            'Оборудование, не соответствующее нормативам по простоям (сортировка - от "худшего"). Нормативы согласно И.А.438',
            defaultStyle
        )

        // Заголовки колонок
        createCellCenter(ws, [2, 1, 3, 1, true], `№п/п`, defaultStyle)
        createCellCenter(ws, [2, 2, 3, 2, true], `Модель`, defaultStyle)
        createCellCenter(ws, [2, 3, 3, 3, true], `Цех. номер`, defaultStyle)
        createCellCenter(ws, [2, 4, 3, 4, true], `Инв. номер`, defaultStyle)
        createCellCenter(ws, [2, 5, 3, 5, true], `Наработка`, defaultStyle)
        createCellCenter(ws, [2, 6, 2, 8, true], `Простои`, defaultStyle)
        createCellCenter(ws, [3, 6, 3, 6, true], `Кол-во`, defaultStyle)
        createCellCenter(ws, [3, 7, 3, 7, true], `Время`, defaultStyle)
        createCellCenter(ws, [3, 8, 3, 8, true], `%`, defaultStyle)
        createCellCenter(ws, [2, 9, 2, 12, true], `Последний выполненный ремонт`, defaultStyle)
        createCellCenter(ws, [3, 9], `Дата`, defaultStyle)
        createCellCenter(ws, [3, 10], `Вид ремонта`, defaultStyle)
        createCellCenter(ws, [3, 11], `Узлы`, defaultStyle)
        createCellCenter(ws, [3, 12], `Расшифровка`, defaultStyle)
        createCellCenter(ws, [2, 13, 2, 17, true], `Утверждённый график ремонтов`, defaultStyle)
        createCellCenter(ws, [3, 13], `Дата`, defaultStyle)
        createCellCenter(ws, [3, 14], `Вид ремонта`, defaultStyle)
        createCellCenter(ws, [3, 15], `Узлы`, defaultStyle)
        createCellCenter(ws, [3, 16], `Расшифровка`, defaultStyle)
        createCellCenter(ws, [3, 17], `Комментарии`, defaultStyle)

        let count = 1
        equipmentFilteredPercentMoreNorm[key].forEach((item) => {
            const percent = item['percentTimeOfMtbf']
            const percentTimeOfMtbf = percent ? percent.toFixed(1) : percent
            createCell(ws, [row, 1], count, defaultStyle)
            createCell(ws, [row, 2], item['model'], defaultStyle)
            createCell(ws, [row, 3], item['num'], defaultStyle)
            createCell(ws, [row, 4], item['inn'], defaultStyle)
            createCell(ws, [row, 5], item['mtbf'], defaultStyle)
            createCell(ws, [row, 6], item['sumAmount'], defaultStyle)
            createCell(ws, [row, 7], item['sumTime'], defaultStyle)
            createCell(ws, [row, 8], percentTimeOfMtbf, defaultStyle)
            // Выполненные ремонты
            const repairCompleted = data.filter((completed) => +completed['inn'] === +item['inn'])
            if (repairCompleted[0]) {
                createCell(ws, [row, 9], repairCompleted[0]['endDate'], defaultStyle)
                createCell(ws, [row, 10], repairCompleted[0]['typeOfRepair'], defaultStyle)
                createCell(ws, [row, 11], repairCompleted[0]['nodes'], defaultStyle)
                createCell(ws, [row, 12], repairCompleted[0]['description'], defaultStyle)
            }
            // Утверждённый план ремонтов
            const repairPlan =
                plan &&
                plan[key] &&
                plan[key].filter((planItem) => +planItem['inn'] === +item['inn'])
            if (repairPlan && repairPlan[0]) {
                createCell(ws, [row, 13], repairPlan[0]['date'], defaultStyle)
                createCell(ws, [row, 14], repairPlan[0]['typeOfRepair'], defaultStyle)
                createCell(ws, [row, 15], repairPlan[0]['nodes'], defaultStyle)
                createCell(ws, [row, 16], repairPlan[0]['description'], defaultStyle)
                createCell(ws, [row, 17], repairPlan[0]['comment'], defaultStyle)
            }

            // Предварительный план ремонтов (вместо утверждённого)
            /*
            createCell(ws, [row, 13], item['period'], defaultStyle)
            createCell(
                ws,
                [row, 14],
                item['typeOfRepair'] === 'medium' ? 'Средний' : 'nodes' ? '' : '',
                defaultStyle
            )

            // Расшифровка узлов
            let descriptions = []
            Object.values(item['nodes']).length &&
                [...Object.values(item['nodes'])].forEach((val) => {
                    descriptions = [...descriptions, val['description']]
                })

            createCell(
                ws,
                [row, 15],
                item['typeOfRepair'] === 'nodes' && Object.keys(item['nodes']).join('\n'),
                defaultStyle
            )
            createCell(
                ws,
                [row, 16],
                item['typeOfRepair'] === 'nodes' && descriptions.join('\n'),
                defaultStyle
            )
            */
            count++
            row++
        })

        ws.cell(2, 1, --row, 17).style(borderStyle)
        // Вертикальная граница
        ws.cell(2, 9, row, 9).style({ border: { left: { style: 'thin' } } })
        ws.cell(2, 13, row, 13).style({ border: { left: { style: 'thin' } } })
    })
}
