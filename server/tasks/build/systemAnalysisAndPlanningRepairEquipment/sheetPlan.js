// План

const createCell = require(appRoot + '/server/tasks/build/helpers/cellCreator').createCell
const createCellTitle = require(appRoot + '/server/tasks/build/helpers/cellCreator').createCellTitle

module.exports = function ({ plan, ws, defaultStyle }) {
    // Закрепить строку, столбец
    ws.row(3).freeze()
    ws.column(1).setWidth(15)
    ws.column(1).freeze()
    // Название листа
    createCell(ws, [1, 1], 'План ремонтов', defaultStyle)

    let step1 = 2
    let step4 = 2
    let stepTitle = 2

    Object.keys(plan).forEach((key) => {
        if (
            key === '60' ||
            key === '71' ||
            key === '77' ||
            key === 'undefined' ||
            key === 'Произ-во'
        )
            return // здесь фильтровать нужные производства

        // Ширина колонок с моделью
        ws.column(step4).setWidth(15)
        // Названия производств
        createCellTitle(ws, [2, step4, 2, step4 + 3, true], `Производство №${key}`, defaultStyle)

        // Заголовки колонок
        createCell(ws, [3, stepTitle], 'Модель', defaultStyle)
        createCell(ws, [3, ++stepTitle], 'Цех. номер', defaultStyle)
        createCell(ws, [3, ++stepTitle], 'Инв. номер', defaultStyle)
        createCell(ws, [3, ++stepTitle], 'Вид ремонта', defaultStyle)

        // Построение данных для производства key
        const start = startRowsArr(plan)
        plan[key]['data'].forEach((timeInterval, i) => {
            let row = start[i]
            // Название периода времени (например, месяц)
            createCellTitle(ws, [row, 1], plan[key]['period'][i], defaultStyle)

            // Модель, инвентарный номер, цеховой номер, вид ремонта
            timeInterval.forEach((item) => {
                createCell(ws, [row, step1], item['model'], defaultStyle)
                createCell(ws, [row, ++step1], item['num'], defaultStyle)
                createCell(ws, [row, ++step1], item['inn'], defaultStyle)

                // Если средний ремонт, вывести "Средний"
                if (item['typeOfRepair'] === 'medium') {
                    createCell(ws, [row, ++step1], 'Средний', defaultStyle)
                }
                // Если текущий ремонт, вывести перечень узлов
                if (item['typeOfRepair'] === 'nodes') {
                    createCell(
                        ws,
                        [row, ++step1],
                        Object.keys(item['nodes']).join('\n'),
                        defaultStyle
                    )
                }
                step1 = step1 - 3
                row++
            })

            // Вертикальная граница между производствами
            ws.cell(2, step4, row, step4).style({ border: { left: { style: 'thin' } } })

            row = start[i]
            // Горизонтальная граница между временными периодами
            ws.cell(row, 1, row, step4 + 3).style({ border: { top: { style: 'thin' } } })
        })

        stepTitle++
        step1 = step1 + 4
        step4 = step4 + 4
    })
}

// Определить строку начала каждого периода времени
function startRowsArr(plan) {
    // Каждое производство имеет разное количество оборудования в определенный период
    // Требуется найти строку, которая будет ниже, чем последняя строка производства с максимальным количеством станков
    // Для этого:
    // Определить максимальное количество оборудования среди производств в плане в каждый период времени
    // Свойства объекта - порядковый номер массива из перебираемого массива plan
    // Значения свойств - максимальное количество станков из всех производств для каждого периода времени
    let maxEquipmentObj = {}
    Object.keys(plan).forEach((key) => {
        plan[key]['data'].forEach((timeInterval, i) => {
            if (!maxEquipmentObj[i] || timeInterval.length > maxEquipmentObj[i]) {
                maxEquipmentObj[i] = timeInterval.length
            }
        })
    })
    // Преобразовать maxEquipmentObj в массив
    // Добавить первым элементом номер строки, с которой начинается построение данных в таблице
    const start = 4
    const arr = [start, ...Object.values(maxEquipmentObj)]
    // Суммировать два соседних в массиве значения, первый и второй, второй и третий и т.д.
    // Добавить отступ margin (количетство строк)
    // Сохранить в массив
    let startRowsArr = []
    const margin = 0
    arr.reduce((prev, current) => {
        startRowsArr = [...startRowsArr, prev]
        return prev + current + margin
    })
    return startRowsArr
}
