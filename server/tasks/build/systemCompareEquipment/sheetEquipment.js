// Полная информация по оборудованию

const createCell = require(appRoot + '/server/tasks/build/helpers/cellCreator').createCell
const createCellCenter = require(appRoot + '/server/tasks/build/helpers/cellCreator')
    .createCellCenter

module.exports = function({ convertedFact, wb, defaultStyle }) {
    const obj = {}

    Object.entries(convertedFact).forEach(item => {
        if (!item[0]) return // здесь фильтровать нужные производства
        obj[item[0]] = wb.addWorksheet(item[0])
        const ws = obj[item[0]]

        let row = 4

        ws.row(2).setHeight(30)
        ws.row(3).freeze()
        ws.column(1).setWidth(15)
        ws.column(3).setWidth(15)

        // Название листа
        createCell(
            ws,
            [1, 1, 1, 9, true],
            'Сравнение аварийных выходов из строя до и после ремонта (3 месяца)',
            defaultStyle
        )

        // Заголовки колонок
        createCellCenter(ws, [2, 1, 3, 1, true], `Модель`, defaultStyle)
        createCellCenter(ws, [2, 2, 3, 2, true], `Цех. номер`, defaultStyle)
        createCellCenter(ws, [2, 3, 3, 3, true], `Инв. номер`, defaultStyle)
        createCellCenter(ws, [2, 4, 2, 5, true], `Выполненный ремонт`, defaultStyle)
        createCellCenter(ws, [3, 4], `Дата`, defaultStyle)
        createCellCenter(ws, [3, 5], `Вид`, defaultStyle)
        createCellCenter(ws, [2, 6, 2, 7, true], `До ремонта`, defaultStyle)
        createCellCenter(ws, [3, 6], `Количество`, defaultStyle)
        createCellCenter(ws, [3, 7], `Время`, defaultStyle)
        createCellCenter(ws, [2, 8, 2, 9, true], `После ремонта`, defaultStyle)
        createCellCenter(ws, [3, 8], `Количество`, defaultStyle)
        createCellCenter(ws, [3, 9], `Время`, defaultStyle)

        // Данные
        Object.entries(item[1]).forEach(inn => {
            createCellCenter(ws, [row, 1], inn[1]['model'], defaultStyle)
            createCellCenter(ws, [row, 2], inn[1]['num'], defaultStyle)
            createCellCenter(ws, [row, 3], inn[0], defaultStyle)
            createCellCenter(ws, [row, 6], inn[1]['beforeLen'], defaultStyle)
            createCellCenter(ws, [row, 7], inn[1]['beforeTime'], defaultStyle)
            createCellCenter(ws, [row, 8], inn[1]['afterLen'], defaultStyle)
            createCellCenter(ws, [row, 9], inn[1]['afterTime'], defaultStyle)
            row++
        })
    })
}
