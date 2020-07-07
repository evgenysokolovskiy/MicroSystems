// Создать ячейку с данными
module.exports.createCell = function (ws, int, str, defaultStyle) {
    if (str) {
        if (typeof str === 'string') {
            ws.cell(...int)
                .string(str)
                .style(defaultStyle)
                .style({ alignment: { horizontal: 'left', vertical: 'center' } })
        } else if (typeof str === 'number') {
            ws.cell(...int)
                .number(str)
                .style(defaultStyle)
                .style({ alignment: { horizontal: 'right', vertical: 'center' } })
        }
    }
}

// Создать ячейку с данными (текст по центру)
module.exports.createCellCenter = function createCellCenter(ws, int, str, defaultStyle) {
    if (str) {
        if (typeof str === 'string') {
            ws.cell(...int)
                .string(str)
                .style(defaultStyle)
                .style({ alignment: { horizontal: 'center', vertical: 'center' } })
        } else if (typeof str === 'number') {
            ws.cell(...int)
                .number(str)
                .style(defaultStyle)
                .style({ alignment: { horizontal: 'right', vertical: 'center' } })
        }
    }
}

// Создать ячейку заголовка
module.exports.createCellTitle = function createCellTitle(ws, int, str, defaultStyle) {
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
module.exports.createCellTypeOfRepair = function createCellTypeOfRepair(
    ws,
    int,
    str,
    nodes,
    defaultStyle
) {
    if (str) {
        if (typeof str === 'string') {
            ws.cell(...int)
                .string(str === 'medium' ? 'Средний' : 'nodes' ? 'Текущий' : '')
                .style(defaultStyle)
                .style({ alignment: { horizontal: 'left', vertical: 'center' } })
        }
    }
}
// Object.keys(nodes).join(' ')
