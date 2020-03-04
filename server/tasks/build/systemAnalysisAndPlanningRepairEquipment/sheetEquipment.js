// Полная информация по оборудованию

const createCell = require('../helpers/cellCreator').createCell
const createCellCenter = require('../helpers/cellCreator').createCellCenter

module.exports = function({ plan, offPlan, data, wb, defaultStyle }) {
    const obj = {}

    Object.keys(plan).forEach(key => {
        if (key === '71' || key === '77' || key === 'undefined' || key === 'Произ-во') return // здесь фильтровать нужные производства

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

        ws.row(2).setHeight(30)
        ws.row(3).freeze()
        ws.column(1).setWidth(15)
        ws.column(3).setWidth(15)
        ws.column(7).setWidth(5)
        ws.column(8).setWidth(40)
        ws.column(11).setWidth(5)
        ws.column(12).setWidth(40)

        // Название листа
        createCell(ws, [1, 1, 1, 12, true], 'Перечень используемого оборудования', defaultStyle)

        // Заголовки колонок
        createCellCenter(ws, [2, 1, 3, 1, true], `Модель`, defaultStyle)
        createCellCenter(ws, [2, 2, 3, 2, true], `Цех. номер`, defaultStyle)
        createCellCenter(ws, [2, 3, 3, 3, true], `Инв. номер`, defaultStyle)
        createCellCenter(ws, [2, 4, 3, 4, true], `Наработка`, defaultStyle)
        createCellCenter(ws, [2, 5, 2, 8, true], `Последний выполненный ремонт`, defaultStyle)
        createCellCenter(ws, [3, 5], `Дата`, defaultStyle)
        createCellCenter(ws, [3, 6], `Вид ремонта`, defaultStyle)
        createCellCenter(ws, [3, 7], `Узлы`, defaultStyle)
        createCellCenter(ws, [3, 8], `Расшифровка`, defaultStyle)
        createCellCenter(ws, [2, 9, 2, 12, true], `Предварительный план на год`, defaultStyle)
        createCellCenter(ws, [3, 9], `Дата`, defaultStyle)
        createCellCenter(ws, [3, 10], `Вид ремонта`, defaultStyle)
        createCellCenter(ws, [3, 11], `Узлы`, defaultStyle)
        createCellCenter(ws, [3, 12], `Расшифровка`, defaultStyle)
        // Построение данных из плана
        plan[key]['data'].forEach((timeInterval, i) => {
            timeInterval.forEach(item => {
                createCell(ws, [row, 1], item['model'], defaultStyle)
                createCell(ws, [row, 2], item['num'], defaultStyle)
                createCell(ws, [row, 3], item['inn'], defaultStyle)
                createCell(ws, [row, 4], item['mtbf'], defaultStyle)
                // Выполненные ремонты
                const repairCompleted = data.filter(completed => +completed['inn'] === +item['inn'])
                if (repairCompleted[0]) {
                    createCell(ws, [row, 5], repairCompleted[0]['endDate'], defaultStyle)
                    createCell(ws, [row, 6], repairCompleted[0]['typeOfRepair'], defaultStyle)
                    createCell(ws, [row, 7], repairCompleted[0]['nodes'], defaultStyle)
                    createCell(ws, [row, 8], repairCompleted[0]['description'], defaultStyle)
                }
                createCell(ws, [row, 9], plan[key]['period'][i], defaultStyle)
                createCell(
                    ws,
                    [row, 10],
                    item['typeOfRepair'] === 'medium' ? 'Средний' : 'nodes' ? '' : '',
                    defaultStyle
                )

                // Расшифровка узлов
                let descriptions = []
                Object.values(item['nodes']).length &&
                    [...Object.values(item['nodes'])].forEach(val => {
                        descriptions = [...descriptions, val['description']]
                    })

                createCell(
                    ws,
                    [row, 11],
                    item['typeOfRepair'] === 'nodes' && Object.keys(item['nodes']).join('\n'),
                    defaultStyle
                )
                createCell(
                    ws,
                    [row, 12],
                    item['typeOfRepair'] === 'nodes' && descriptions.join('\n'),
                    defaultStyle
                )
                row++
            })
        })

        // Добавить оборудование, не входящее в план
        offPlan[key]['offPlan'].forEach(item => {
            createCell(ws, [row, 1], item['model'], defaultStyle)
            createCell(ws, [row, 2], item['num'], defaultStyle)
            createCell(ws, [row, 3], item['inn'], defaultStyle)
            createCell(ws, [row, 4], item['mtbf'], defaultStyle)
            // Выполненные ремонты
            const repairCompleted = data.filter(completed => +completed['inn'] === +item['inn'])
            if (repairCompleted[0]) {
                createCell(ws, [row, 5], repairCompleted[0]['endDate'], defaultStyle)
                createCell(ws, [row, 6], repairCompleted[0]['typeOfRepair'], defaultStyle)
                createCell(ws, [row, 7], repairCompleted[0]['nodes'], defaultStyle)
                createCell(ws, [row, 8], repairCompleted[0]['description'], defaultStyle)
            }

            row++
        })

        ws.cell(2, 1, --row, 12).style(borderStyle)
        // Вертикальная граница
        ws.cell(2, 5, row, 5).style({ border: { left: { style: 'thin' } } })
        ws.cell(2, 9, row, 9).style({ border: { left: { style: 'thin' } } })
    })
}
