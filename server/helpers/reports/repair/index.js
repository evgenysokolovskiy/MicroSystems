// Отчёт "система_анализа_и_планирования_ремонтов_оборудования"

const xl = require('excel4node') // create excel file
const summary = require('./summary')
const plan = require('./plan')

module.exports = function(data, reportsDir) {
    const wb = new xl.Workbook()
    const ws1 = wb.addWorksheet('Сводная')
    const ws2 = wb.addWorksheet('План ремонтов')

    const defaultStyle = wb.createStyle({
        font: {
            name: 'Times New Roman',
            color: '#000000',
            size: 11
        },
        alignment: { wrapText: true }
    })

    summary(data, ws1, defaultStyle) // Итоги
    plan(data, ws2, defaultStyle) // План

    wb.write(`${reportsDir}/система_анализа_и_планирования_ремонтов_оборудования.xlsx`, err => {
        err ? console.error(err) : console.log('Файл успешно сохранён!')
    })
}
