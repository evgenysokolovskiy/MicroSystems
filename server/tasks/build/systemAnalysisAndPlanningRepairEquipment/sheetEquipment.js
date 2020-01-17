// Полная информация по оборудованию

const createCell = require('../helpers/cellCreator').createCell
const createCellCenter = require('../helpers/cellCreator').createCellCenter
const createCellTypeOfRepair = require('../helpers/cellCreator').createCellTypeOfRepair

module.exports = function({ plan, offPlan, wb, defaultStyle }) {
    const obj = {}
    Object.keys(plan).forEach(key => {
        if (key === '71' || key === '77' || key === 'undefined' || key === 'Произ-во') return // здесь фильтровать нужные производства

        obj[key] = wb.addWorksheet(key)
        const ws = obj[key]
        let row = 4

        // Закрепить строку, столбец
        ws.row(3).freeze()
        ws.column(1).setWidth(15)
        ws.column(4).setWidth(15)
        ws.column(6).setWidth(15)
        ws.row(2).setHeight(30)

        // Название листа
        createCell(ws, [1, 1], 'Оборудование', defaultStyle)

        // Заголовки колонок
        createCellCenter(ws, [2, 1, 3, 1, true], `Модель`, defaultStyle)
        createCellCenter(ws, [2, 2, 3, 2, true], `Цех. номер`, defaultStyle)
        createCellCenter(ws, [2, 3, 3, 3, true], `Инв. номер`, defaultStyle)
        createCellCenter(ws, [2, 4, 2, 5, true], `Предварительный план на год`, defaultStyle)
        createCellCenter(ws, [3, 4], `Вид ремонта`, defaultStyle)
        createCellCenter(ws, [3, 5], `Дата`, defaultStyle)
        createCellCenter(ws, [2, 6, 2, 7, true], `Последний выполненный ремонт`, defaultStyle)
        createCellCenter(ws, [3, 6], `Вид ремонта`, defaultStyle)
        createCellCenter(ws, [3, 7], `Дата`, defaultStyle)
        createCellCenter(ws, [2, 8, 3, 8, true], `Наработка`, defaultStyle)

        // Построение данных из плана
        plan[key]['data'].forEach((timeInterval, i) => {
            timeInterval.forEach(item => {
                createCell(ws, [row, 1], item['model'], defaultStyle)
                createCell(ws, [row, 2], item['num'], defaultStyle)
                createCell(ws, [row, 3], item['inn'], defaultStyle)
                createCellTypeOfRepair(
                    ws,
                    [row, 4],
                    item['typeOfRepair'],
                    item['nodes'],
                    defaultStyle
                )
                createCell(ws, [row, 5], plan[key]['period'][i], defaultStyle)
                createCell(ws, [row, 8], item['mtbf'], defaultStyle)
                row++
            })
        })

        // Добавить оборудование, не входящее в план
        offPlan[key]['offPlan'].forEach(item => {
            createCell(ws, [row, 1], item['model'], defaultStyle)
            createCell(ws, [row, 2], item['num'], defaultStyle)
            createCell(ws, [row, 3], item['inn'], defaultStyle)
            createCell(ws, [row, 8], item['mtbf'], defaultStyle)
            row++
        })
    })
}
