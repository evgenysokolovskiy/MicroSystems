// Отчёт "система_анализа_и_планирования_ремонтов_оборудования"

const xl = require('excel4node') // create excel file
const summary = require('./summary')
const plan = require('./plan')
const equipment = require('./equipment')

module.exports = function(data, reportsDir) {
    const wb = new xl.Workbook()
    const ws1 = wb.addWorksheet('Сводная')
    const ws2 = wb.addWorksheet('План ремонтов')
    //const ws3 = wb.addWorksheet('Оборудование')

    const defaultStyle = wb.createStyle({
        font: {
            name: 'Times New Roman',
            color: '#000000',
            size: 11
        },
        alignment: { wrapText: true }
    })

    const bgStyle = wb.createStyle({
        fill: {
            type: 'pattern',
            patternType: 'solid',
            bgColor: '#FFFF00',
            fgColor: '#FFFF00'
        }
    })

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

    summary(data, ws1, defaultStyle) // Итоги
    plan(data, ws2, defaultStyle) // План
    equipment(data, wb, defaultStyle)

    wb.write(`${reportsDir}/система_анализа_и_планирования_ремонтов_оборудования.xlsx`, err => {
        err ? console.error(err) : console.log('Файл успешно сохранён!')
    })
}
