// Совместить технологию с фактом по одной карте

const clonedeep = require('lodash.clonedeep')
const interval = require('../../../config/shp/interval')
const convertDateToString = require('./calculateDates').convertDateToString
const convertStringToDateBatchLoadingTime = require('./calculateDates')
    .convertStringToDateBatchLoadingTime

module.exports = function({ technology: t, fact: f, procedure, card, interval }) {
    if (card === 'Сводная') return

    const technology = clonedeep(t)
    const fact = clonedeep(f)
    const {
        pointsDiameter,
        pointsInconstancy,
        pointsDimension,
        pointsPressure,
        pointsSpeed,
        pointsSpeedElevator
    } = technology

    // 1) Получить дату факта: конкатенировать дату и время как строку
    // Конвертировать конкатенированную дату в миллисекунды
    // Записать свойство convertFactJointDate['jointDate'], которое будет отображать дату фактического действия в миллисекундах
    // 2) Определить временную отметку начала построения технологии в миллисекундах
    // Соответствует временной отметке загрузки
    let batchLoadingDate, batchLoadingTime
    const convertFactJointDate =
        fact &&
        card &&
        fact[card].map(item => {
            if (item['weight']) {
                if (item['date']) batchLoadingDate = item['date']
                if (item['batchLoadingTime']) batchLoadingTime = item['batchLoadingTime']
            }

            const date = convertStringToDateBatchLoadingTime(item['date'], item['batchLoadingTime'])
            item['jointDate'] = date
            return item
        })

    // 3) Преобразовать string в Date (в миллисекундах)
    let start = convertStringToDateBatchLoadingTime(batchLoadingDate, batchLoadingTime)

    // Количество временных отметок по технологии
    const len = pointsDiameter.length
    const lastItem = fact[card][fact[card].length - 1]
    const end = lastItem
        ? convertStringToDateBatchLoadingTime(lastItem['date'], lastItem['batchLoadingTime'])
        : 0
    // Количество временных отметок в факте от даты загрузки до последних занесенных данных
    // Дата выгрузки или дата проверки для незавершенной процедуры
    const difference = (end - start) / 1800000

    // 4) Определить временные отметки от начальной отметки start до конечной на расстоянии длины len

    // Интервал между отметками составляет заданный интервал intervalMilliseconds в миллисекундах
    let arr = [start]
    // interval - количество минут (30 - полчаса)
    // 60000 - количество миллисекунд в одной минуте
    // 1800000 - полчаса
    // 3600000 - час
    const intervalMilliseconds = interval && +interval * 60000

    for (let i = 1; i < Math.max(len, difference) + 1; i++) {
        start = start + intervalMilliseconds
        arr = [...arr, start]
    }

    // 5) Получить новые массивы, дополненные date в миллисекундах
    // Диаметр
    let pointsDiameterDate = [...pointsDiameter].map((item, i) => {
        item['date'] = arr[i]
        return item
    })

    const lastIndexTechnology = pointsDiameterDate.length - 1
    const lastTechnologyDiameter = [...pointsDiameter][lastIndexTechnology]
    const rest = arr.slice(lastIndexTechnology)
    rest.forEach(item => {
        pointsDiameterDate = [...pointsDiameterDate, { date: item }]
    })

    // Непостоянство, разноразмерность (предварительно объединить в один массив)
    let pointsInconstancyDimension = []
    for (let i = 0; i < pointsInconstancy.length; i++) {
        const item = {
            inconstancy: pointsInconstancy[i],
            dimension: pointsDimension[i]
        }

        pointsInconstancyDimension = [...pointsInconstancyDimension, item]
    }

    const pointsInconstancyDimensionDate = [...pointsInconstancyDimension].map((item, i) => {
        item['date'] = arr[i]
        return item
    })

    // Давление, скорость (предварительно объединить в один массив)
    let pointsPressureSpeed = []
    for (let i = 0; i < pointsPressure.length; i++) {
        const itemPressureSpeed = {
            pressure: pointsPressure[i],
            speed: pointsSpeed[i],
            speedElevator: pointsSpeedElevator[i]
        }
        pointsPressureSpeed = [...pointsPressureSpeed, itemPressureSpeed]
    }

    const pointsPressureSpeedDate = [...pointsPressureSpeed].map((item, i) => {
        item['date'] = arr[i]
        return item
    })

    // 6) Добавить факт к массивам с дополненной датой
    // Диаметр
    const diameter = [...pointsDiameterDate].map(technology => {
        convertFactJointDate &&
            [...convertFactJointDate].forEach(fact => {
                let factDiameter = replaceToDot(fact['diameter'])

                if (technology['date'] === fact['jointDate']) {
                    // 'fact' необходим для построения линейного графика, соединяющего точки
                    // При указанных процедурах указывается +- в микронах к норме
                    if (
                        ((factDiameter || fact['qualityProducts']) && procedure === 'grinding') ||
                        procedure === 'rough' ||
                        procedure === 'clean' ||
                        procedure === 'final'
                    ) {
                        if (technology['norm']) {
                            if (+factDiameter > 0) {
                                factDiameter = (
                                    +technology['norm'][1] + +(factDiameter / 1000)
                                ).toFixed(3)
                            } else if (+factDiameter < 0) {
                                factDiameter = (
                                    +technology['norm'][0] - +(factDiameter / 1000)
                                ).toFixed(3)
                            } else {
                                factDiameter = (
                                    (+lastTechnologyDiameter['norm'][1] -
                                        +lastTechnologyDiameter['norm'][0]) /
                                    2
                                ).toFixed(3)
                            }
                        } else {
                            if (+factDiameter > 0) {
                                factDiameter = (
                                    +lastTechnologyDiameter['norm'][1] + +(factDiameter / 1000)
                                ).toFixed(3)
                            } else if (+factDiameter < 0) {
                                factDiameter = (
                                    +lastTechnologyDiameter['norm'][0] - +(factDiameter / 1000)
                                ).toFixed(3)
                            } else {
                                factDiameter = (
                                    (+lastTechnologyDiameter['norm'][1] -
                                        +lastTechnologyDiameter['norm'][0]) /
                                    2
                                ).toFixed(3)
                            }
                        }

                        if (technology['norm']) {
                            factDiameter > technology['norm'][0] &&
                            factDiameter < technology['norm'][1]
                                ? (technology['trueFact'] = factDiameter)
                                : (technology['falseFact'] = factDiameter)
                        } else {
                            if (!fact['qualityProducts']) {
                                technology['falseFact'] = factDiameter
                            } else {
                                if (!factDiameter) factDiameter = 0
                                if (+factDiameter > 0) {
                                    factDiameter = (
                                        +lastTechnologyDiameter['norm'][1] + +(factDiameter / 1000)
                                    ).toFixed(3)
                                    technology['falseFact'] = factDiameter
                                } else if (+factDiameter < 0) {
                                    factDiameter = (
                                        +lastTechnologyDiameter['norm'][0] - +(factDiameter / 1000)
                                    ).toFixed(3)
                                    technology['falseFact'] = factDiameter
                                } else {
                                    factDiameter = (
                                        +lastTechnologyDiameter['norm'][0] +
                                        (+lastTechnologyDiameter['norm'][1] -
                                            +lastTechnologyDiameter['norm'][0]) /
                                            2
                                    ).toFixed(3)
                                    technology['trueFact'] = factDiameter
                                }
                            }
                        }

                        technology['fact'] = factDiameter
                    }

                    // Обкатка (Фактические данные)
                    if ((factDiameter || fact['qualityProducts']) && procedure === 'running') {
                        if (technology['norm']) {
                            factDiameter > technology['norm'][0] &&
                            factDiameter < technology['norm'][1]
                                ? (technology['trueFact'] = factDiameter)
                                : (technology['falseFact'] = factDiameter)
                        } else {
                            if (!factDiameter) factDiameter = 0
                            if (+factDiameter > 0) {
                                factDiameter = (
                                    +lastTechnologyDiameter['norm'][1] + +(factDiameter / 1000)
                                ).toFixed(3)
                                technology['falseFact'] = factDiameter
                            } else if (+factDiameter < 0) {
                                factDiameter = (
                                    +lastTechnologyDiameter['norm'][0] - +(factDiameter / 1000)
                                ).toFixed(3)
                                technology['falseFact'] = factDiameter
                            } else {
                                factDiameter = (
                                    +lastTechnologyDiameter['norm'][0] +
                                    (+lastTechnologyDiameter['norm'][1] -
                                        +lastTechnologyDiameter['norm'][0]) /
                                        2
                                ).toFixed(3)
                                technology['trueFact'] = factDiameter
                            }
                        }

                        technology['fact'] = factDiameter
                    }
                }
            })
        technology['date'] = convertDateToString(technology['date'])
        return technology
    })

    // Непостоянство, разноразмерность
    const inconstancyDimension = [...pointsInconstancyDimensionDate].map(technology => {
        convertFactJointDate &&
            [...convertFactJointDate].forEach(fact => {
                if (technology['date'] === fact['jointDate']) {
                    // Непостоянство
                    const factInconstancy = fact['inconstancy']
                    technology['factInconstancy'] = factInconstancy
                    factInconstancy > technology['inconstancy']
                        ? (technology['factInconstancyFalse'] = factInconstancy)
                        : (technology['factInconstancyTrue'] = factInconstancy)

                    // Разноразмерность
                    const factDimension = fact['dimension']
                    technology['factDimension'] = factDimension
                    factDimension > technology['dimension']
                        ? (technology['factDimensionFalse'] = factDimension)
                        : (technology['factDimensionTrue'] = factDimension)
                }
            })

        technology['date'] = convertDateToString(technology['date'])
        return technology
    })

    // Давление, скорость
    const pressureSpeed = [...pointsPressureSpeedDate].map(technology => {
        convertFactJointDate &&
            [...convertFactJointDate].forEach(fact => {
                if (technology['date'] === fact['jointDate']) {
                    // Давление
                    const factPressure = fact['pressure']
                    technology['factPressure'] = factPressure
                    factPressure > technology['pressure']
                        ? (technology['factPressureFalse'] = factPressure)
                        : (technology['factPressureTrue'] = factPressure)

                    // Скорость
                    const factSpeed = fact['speed']
                    technology['factSpeed'] = factSpeed
                    factSpeed > technology['speed']
                        ? (technology['factSpeedFalse'] = factSpeed)
                        : (technology['factSpeedTrue'] = factSpeed)

                    // Скорость элеватора
                    const factSpeedElevator = fact['speedElevator']
                    technology['factSpeedElevator'] = factSpeedElevator
                    factSpeedElevator > technology['speedElevator']
                        ? (technology['factSpeedElevatorFalse'] = factSpeedElevator)
                        : (technology['factSpeedElevatorTrue'] = factSpeedElevator)
                }
            })

        technology['date'] = convertDateToString(technology['date'])
        return technology
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
