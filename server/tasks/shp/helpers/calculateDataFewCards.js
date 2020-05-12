// Совместить технологию с фактом по одной карте

const clonedeep = require('lodash.clonedeep')
const interval = require('../../../config/shp/interval')
const calculateDataOneCard = require('./calculateDataOneCard')

// Совместить технологию с фактом по нескольким картам
module.exports = function({ technology: t, fact: f, procedure, cards, interval }) {
    const technology = clonedeep(t)
    const fact = clonedeep(f)
    // Интервал (дробная часть от единицы как количество минут от часа)
    // Необходимо для построения дробной части на сводном по нескольким картам графике
    const int = interval && +interval / 60

    let diameter = [],
        inconstancyDimension = [],
        pressureSpeed = []

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

    cards['hasBatchLoadingTime'].forEach((card, index) => {
        if (card === 'Сводная') return
        const data = clonedeep(
            calculateDataOneCard({ technology, fact, procedure, card, interval })
        )

        for (let i = 0; i < diameter.length; i++) {
            if (data['diameter'][i]['fact']) {
                diameter[i][`fact${index}`] = replaceToDot(data['diameter'][i]['fact'])

                if (data['diameter'][i]['falseFact']) {
                    diameter[i][`falseFact${index}`] = replaceToDot(
                        data['diameter'][i]['falseFact']
                    )
                }

                if (data['diameter'][i]['trueFact']) {
                    diameter[i][`trueFact${index}`] = replaceToDot(data['diameter'][i]['trueFact'])
                }
            }
        }

        for (let i = 0; i < inconstancyDimension.length; i++) {
            if (data['inconstancyDimension'][i]['factInconstancy']) {
                inconstancyDimension[i][`factInconstancy${index}`] =
                    data['inconstancyDimension'][i]['factInconstancy']

                if (data['inconstancyDimension'][i]['factInconstancyFalse']) {
                    inconstancyDimension[i][`factInconstancyFalse${index}`] =
                        data['inconstancyDimension'][i]['factInconstancyFalse']
                }

                if (data['inconstancyDimension'][i]['factInconstancyTrue']) {
                    inconstancyDimension[i][`factInconstancyTrue${index}`] =
                        data['inconstancyDimension'][i]['factInconstancyTrue']
                }
            }

            if (data['inconstancyDimension'][i]['factDimension']) {
                inconstancyDimension[i][`factDimension${index}`] =
                    data['inconstancyDimension'][i]['factDimension']

                if (data['inconstancyDimension'][i]['factDimensionFalse']) {
                    inconstancyDimension[i][`factDimensionFalse${index}`] =
                        data['inconstancyDimension'][i]['factDimensionFalse']
                }

                if (data['inconstancyDimension'][i]['factDimensionTrue']) {
                    inconstancyDimension[i][`factDimensionTrue${index}`] =
                        data['inconstancyDimension'][i]['factDimensionTrue']
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
