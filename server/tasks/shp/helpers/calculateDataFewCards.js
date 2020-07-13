// Совместить технологию с фактом по одной карте

const clonedeep = require('lodash.clonedeep')
const interval = require(appRoot + '/server/config/shp/interval')
const calculateDataOneCard = require(appRoot + '/server/tasks/shp/helpers/calculateDataOneCard')

// Совместить технологию с фактом по нескольким картам
module.exports = function({ technology: t, fact: f, procedure, type, cards, interval }) {
    const technology = clonedeep(t)
    const fact = clonedeep(f)
    // Интервал (дробная часть от единицы как количество минут от часа)
    // Необходимо для построения дробной части на сводном по нескольким картам графике
    const int = interval && +interval / 60

    let diameter = [],
        inconstancyDimension = [],
        pressureSpeed = []

    // *** ДОБАВИТЬ ТЕХНОЛОГИЮ
    diameter = technology['pointsDiameter']
    for (let i = 0, date = 0; i < diameter.length; i++, date = date + int) {
        diameter[i]['date'] = date
    }

    for (let i = 0, date = 0; i < technology['pointsInconstancy'].length; i++, date = date + int) {
        const item = {
            inconstancy: technology['pointsInconstancy'][i],
            dimension: technology['pointsDimension'][i],
            date
        }
        inconstancyDimension[i] = item
    }

    for (let i = 0, date = 0; i < technology['pointsPressure'].length; i++, date = date + int) {
        const item = {
            pressure: technology['pointsPressure'][i],
            speed: technology['pointsSpeed'][i],
            speedElevator: technology['pointsSpeedElevator'][i],
            date
        }
        pressureSpeed[i] = item
    }

    // *** ДОБАВИТЬ ФАКТИЧЕСКИЕ ДАННЫЕ

    // rest - все карты, исключая сводную
    const [total, ...rest] = cards['hasBatchLoadingTime']
    // Данные по всем картам данного типа
    const data = rest.map(card =>
        calculateDataOneCard({ technology, fact, procedure, type, card, interval })
    )

    // Максимальная продолжительность тех.процесса для всех карт данного типа
    const maxFactDiameter = Math.max(...Object.values(data).map(card => +card['diameter'].length))
    const maxFactInconstancyDimension = Math.max(
        ...Object.values(data).map(card => +card['inconstancyDimension'].length)
    )
    const maxFactPressureSpeed = Math.max(
        ...Object.values(data).map(card => +card['pressureSpeed'].length)
    )

    // Дополнить массив diameter до количества членов (объектов), равного max
    for (
        let i = 0, date = 0;
        i < Math.max(diameter.length, maxFactDiameter);
        i++, date = date + int
    ) {
        if (diameter[i]) {
            diameter[i]['date'] = date
        } else {
            diameter = [...diameter, { date }]
        }
    }

    // Дополнить массив inconstancyDimension до количества членов (объектов), равного max
    for (
        let i = 0, date = 0;
        i < Math.max(inconstancyDimension.length, maxFactInconstancyDimension);
        i++, date = date + int
    ) {
        if (inconstancyDimension[i]) {
            inconstancyDimension[i]['date'] = date
        } else {
            inconstancyDimension = [...inconstancyDimension, { date }]
        }
    }

    // Дополнить массив pressureSpeed до количества членов (объектов), равного max
    for (
        let i = 0, date = 0;
        i < Math.max(pressureSpeed.length, maxFactPressureSpeed);
        i++, date = date + int
    ) {
        if (pressureSpeed[i]) {
            pressureSpeed[i]['date'] = date
        } else {
            pressureSpeed = [...pressureSpeed, { date }]
        }
    }

    data.forEach((item, index) => {
        // diameter
        for (let i = 0; i < diameter.length; i++) {
            if (item['diameter'][i] && item['diameter'][i]['fact']) {
                diameter[i][`fact${index}`] = replaceToDot(item['diameter'][i]['fact'])

                if (item['diameter'][i]['falseFact']) {
                    diameter[i][`falseFact${index}`] = replaceToDot(
                        item['diameter'][i]['falseFact']
                    )
                }

                if (item['diameter'][i]['trueFact']) {
                    diameter[i][`trueFact${index}`] = replaceToDot(item['diameter'][i]['trueFact'])
                }
            }
        }

        // inconstansyDimension
        for (let i = 0; i < inconstancyDimension.length; i++) {
            if (
                item['inconstancyDimension'][i] &&
                item['inconstancyDimension'][i]['factInconstancy']
            ) {
                inconstancyDimension[i][`factInconstancy${index}`] =
                    item['inconstancyDimension'][i]['factInconstancy']

                if (item['inconstancyDimension'][i]['factInconstancyFalse']) {
                    inconstancyDimension[i][`factInconstancyFalse${index}`] =
                        item['inconstancyDimension'][i]['factInconstancyFalse']
                }

                if (item['inconstancyDimension'][i]['factInconstancyTrue']) {
                    inconstancyDimension[i][`factInconstancyTrue${index}`] =
                        item['inconstancyDimension'][i]['factInconstancyTrue']
                }
            }

            if (
                item['inconstancyDimension'][i] &&
                item['inconstancyDimension'][i]['factDimension']
            ) {
                inconstancyDimension[i][`factDimension${index}`] =
                    item['inconstancyDimension'][i]['factDimension']

                if (item['inconstancyDimension'][i]['factDimensionFalse']) {
                    inconstancyDimension[i][`factDimensionFalse${index}`] =
                        item['inconstancyDimension'][i]['factDimensionFalse']
                }

                if (item['inconstancyDimension'][i]['factDimensionTrue']) {
                    inconstancyDimension[i][`factDimensionTrue${index}`] =
                        item['inconstancyDimension'][i]['factDimensionTrue']
                }
            }
        }
    })

    return {
        diameter,
        inconstancyDimension,
        pressureSpeed
    }
}

function replaceToDot(str) {
    const newStr = typeof str === 'string' ? str.replace(',', '.') : str
    return +newStr
}
