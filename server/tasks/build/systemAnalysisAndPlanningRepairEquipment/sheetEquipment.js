// Полная информация по оборудованию

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

        // Название листа
        createCell(ws, [1, 1], 'Оборудование', defaultStyle)

        // Заголовки колонок
        createCellTitle(ws, [2, 1, 3, 1, true], `Модель`, defaultStyle)
        createCellTitle(ws, [2, 2, 3, 2, true], `Цех. номер`, defaultStyle)
        createCellTitle(ws, [2, 3, 3, 3, true], `Инв. номер`, defaultStyle)
        createCellTitle(ws, [2, 4, 2, 5, true], `Предварительный план на год`, defaultStyle)
        createCellTitle(ws, [3, 4], `Вид ремонта`, defaultStyle)
        createCellTitle(ws, [3, 5], `Дата`, defaultStyle)
        createCellTitle(ws, [2, 6, 2, 7, true], `Последний выполненный ремонт`, defaultStyle)
        createCellTitle(ws, [3, 6], `Вид ремонта`, defaultStyle)
        createCellTitle(ws, [3, 7], `Дата`, defaultStyle)
        createCellTitle(ws, [2, 8, 3, 8, true], `Наработка`, defaultStyle)

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
                .style({ alignment: { horizontal: 'left' } })
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

// Создать ячейку с видом ремонтов
function createCellTypeOfRepair(ws, int, str, nodes, defaultStyle) {
    if (str) {
        if (typeof str === 'string') {
            ws.cell(...int)
                .string(str === 'medium' ? 'средний' : Object.keys(nodes).join(' '))
                .style(defaultStyle)
                .style({ alignment: { horizontal: 'center' } })
        }
    }
}
