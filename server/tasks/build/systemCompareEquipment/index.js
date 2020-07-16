// Отчёт "система_анализа_и_планирования_ремонтов_оборудования"

const xl = require('excel4node') // create excel file
const sheetEquipment = require(appRoot + '/server/tasks/systemCompareEquipment/sheetEquipment')

module.exports = function ({ convertedFact, buildPathDetail }) {
    const wb = new xl.Workbook()

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

    sheetEquipment({
        convertedFact,
        wb,
        defaultStyle,
        borderStyle
    }) // Оборудование

    wb.write(`${buildPathDetail}/система_сравнения_оборудования_до_и_после_ремонта.xlsx`, (err) => {
        err ? console.error(err) : console.log('Файл успешно сохранён!')
    })
}
