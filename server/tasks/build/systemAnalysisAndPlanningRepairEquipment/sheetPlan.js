// План

module.exports = function({ plan, ws, defaultStyle }) {
    // Закрепить строку, столбец
    ws.row(3).freeze()
    ws.column(1).setWidth(15)
    ws.column(1).freeze()
    // Название листа
    ws.cell(1, 1)
        .string('План 2020г')
        .style(defaultStyle)

    let step1 = 2
    let step4 = 2
    let stepTitle = 2

    Object.keys(plan).forEach(key => {
        if (key === '71' || key === '77' || key === 'undefined' || key === 'Произ-во') return // здесь фильтровать нужные производства

        // Ширина колонок с моделью
        ws.column(step4).setWidth(15)
        // Названия производств
        ws.cell(2, step4, 2, step4 + 3, true)
            .string(`Производство №${key}`)
            .style(defaultStyle)
            .style({
                font: { bold: true },
                alignment: { horizontal: 'center' }
            })

        // // Заголовки колонок
        ws.cell(3, stepTitle)
            .string(`Модель`)
            .style(defaultStyle)
            .style({ alignment: { horizontal: 'center' } })

        ws.cell(3, ++stepTitle)
            .string(`Цех. номер`)
            .style(defaultStyle)
            .style({ alignment: { horizontal: 'center' } })

        ws.cell(3, ++stepTitle)
            .string(`Инв. номер`)
            .style(defaultStyle)
            .style({ alignment: { horizontal: 'center' } })

        ws.cell(3, ++stepTitle)
            .string(`Вид ремонта`)
            .style(defaultStyle)
            .style({ alignment: { horizontal: 'center' } })

        // Построение данных для производства key
        const start = startRowsArr(plan)
        plan[key]['data'].forEach((timeInterval, i) => {
            let row = start[i]

            // Название периода времени (например, месяц)
            ws.cell(row, 1)
                .string(plan[key]['period'][i])
                .style(defaultStyle)
                .style({ font: { bold: true }, alignment: { horizontal: 'center' } })

            // Модель, инвентарный номер, цеховой номер, вид ремонта
            timeInterval.forEach(item => {
                ws.cell(row, step1)
                    .string('Модель')
                    .style(defaultStyle)

                const model = item['model']
                if (model) {
                    if (typeof model === 'string') {
                        ws.cell(row, step1)
                            .string(model)
                            .style(defaultStyle)
                    } else if (typeof model === 'number') {
                        ws.cell(row, step1)
                            .number(model)
                            .style(defaultStyle)
                            .style({ alignment: { horizontal: 'left' } })
                    }
                }

                step1++
                if (item['num']) {
                    ws.cell(row, step1)
                        .number(item['num'])
                        .style(defaultStyle)
                }

                step1++
                if (item['inn']) {
                    ws.cell(row, step1)
                        .number(item['inn'])
                        .style(defaultStyle)
                }

                step1++
                if (item['typeOfRepair']) {
                    ws.cell(row, step1)
                        .string(
                            item['typeOfRepair'] === 'medium'
                                ? 'средний'
                                : Object.keys(item['nodes']).join(' ')
                        )
                        .style(defaultStyle)
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
    Object.keys(plan).forEach(key => {
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