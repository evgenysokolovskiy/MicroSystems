// Отчёт "система_анализа_и_планирования_ремонтов_оборудования"

const xl = require('excel4node') // create excel file
const sheetSummary = require('./sheetSummary')
const sheetPlan = require('./sheetPlan')
const sheetEquipment = require('./sheetEquipment')

module.exports = function({ plan, offPlan, collapseNodes, dir }) {
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
            /*
            left: {
                style: 'hair',
                color: 'black'
            },
            right: {
                style: 'hair',
                color: 'black'
            },
            */
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

    sheetSummary({
        collapseNodes,
        plan,
        ws: ws1,
        defaultStyle,
        borderStyle
    }) // Итоги
    sheetPlan({
        plan,
        ws: ws2,
        defaultStyle
    }) // План
    sheetEquipment({
        plan,
        offPlan,
        wb,
        defaultStyle
    }) // Оборудование

    wb.write(`${dir}/система_анализа_и_планирования_ремонтов_оборудования.xlsx`, err => {
        err ? console.error(err) : console.log('Файл успешно сохранён!')
    })
}
