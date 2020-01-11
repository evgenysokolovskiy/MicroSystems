// Полная информация по оборудованию

module.exports = function({ plan, wb, defaultStyle }) {
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
        // Заголовок таблицы
        ws.cell(1, 1)
            .string('Оборудование')
            .style(defaultStyle)

        // "Модель, инвентарный номер, цеховой номер, вид ремонта"
        ws.cell(2, 1, 3, 1, true)
            .string(`Модель`)
            .style(defaultStyle)
            .style({ alignment: { horizontal: 'center', vertical: 'center' } })

        ws.cell(2, 2, 3, 2, true)
            .string(`Цех. номер`)
            .style(defaultStyle)
            .style({ alignment: { horizontal: 'center', vertical: 'center' } })

        ws.cell(2, 3, 3, 3, true)
            .string(`Инв. номер`)
            .style(defaultStyle)
            .style({ alignment: { horizontal: 'center', vertical: 'center' } })

        ws.cell(2, 4, 2, 5, true)
            .string(`Предварительный план на год`)
            .style(defaultStyle)
            .style({ alignment: { horizontal: 'center' } })

        ws.cell(3, 4)
            .string(`Вид ремонта`)
            .style(defaultStyle)
            .style({ alignment: { horizontal: 'center' } })

        ws.cell(3, 5)
            .string(`Дата`)
            .style(defaultStyle)
            .style({ alignment: { horizontal: 'center' } })

        ws.cell(2, 6, 2, 7, true)
            .string(`Последний выполненный ремонт`)
            .style(defaultStyle)
            .style({ alignment: { horizontal: 'center' } })

        ws.cell(3, 6)
            .string(`Вид ремонта`)
            .style(defaultStyle)
            .style({ alignment: { horizontal: 'center' } })

        ws.cell(3, 7)
            .string(`Дата`)
            .style(defaultStyle)
            .style({ alignment: { horizontal: 'center' } })

        // Построение данных для производства key
        plan[key]['data'].forEach((timeInterval, i) => {
            // Модель, инвентарный номер, цеховой номер, вид ремонта
            timeInterval.forEach(item => {
                if (item['model']) {
                    ws.cell(row, 1)
                        .string(item['model'])
                        .style(defaultStyle)
                }

                if (item['num']) {
                    ws.cell(row, 2)
                        .number(item['num'])
                        .style(defaultStyle)
                }

                if (item['inn']) {
                    ws.cell(row, 3)
                        .number(item['inn'])
                        .style(defaultStyle)
                }

                if (item['typeOfRepair']) {
                    ws.cell(row, 4)
                        .string(
                            item['typeOfRepair'] === 'medium'
                                ? 'средний'
                                : Object.keys(item['nodes']).join(' ')
                        )
                        .style(defaultStyle)
                        .style({ alignment: { horizontal: 'center' } })
                }

                ws.cell(row, 5)
                    .string(plan[key]['period'][i])
                    .style(defaultStyle)
                    .style({ alignment: { horizontal: 'center' } })
                row++
            })
        })
    })
}
