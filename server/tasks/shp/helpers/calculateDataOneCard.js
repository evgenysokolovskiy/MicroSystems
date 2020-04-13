// Совместить технологию с фактом по одной карте

const clonedeep = require('lodash.clonedeep')
const interval = require('../../../config/shp/interval')
const convertDateToString = require('./calculateDates').convertDateToString
const convertStringToDate = require('./calculateDates').convertStringToDate
const convertStringToDateBatchLoadingTime = require('./calculateDates')
    .convertStringToDateBatchLoadingTime

module.exports = function({ technology: t, fact: f, card, interval }) {
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
    const convertFactJointDate =
        fact &&
        card &&
        fact[card].map(item => {
            const date = convertStringToDate(item)
            item['jointDate'] = date
            return item
        })

    // Определить временную отметку начала построения технологии в миллисекундах
    // Соответствует временной отметке загрузки

    // 2) Определить временную отметку загрузки (определена как string)
    let batchLoadingTime
    convertFactJointDate &&
        convertFactJointDate.forEach(item => {
            if (item['batchLoadingTime']) batchLoadingTime = item['batchLoadingTime']
        })
    // 3) Преобразовать string в Date (в миллисекундах)
    let start = convertStringToDateBatchLoadingTime(batchLoadingTime)

    // Количество часов по технологии
    const len = pointsDiameter.length

    // 4) Определить временные отметки от начальной отметки start до конечной на расстоянии длины len

    // Интервал между отметками составляет заданный интервал intervalMilliseconds в миллисекундах
    let arr = [start]
    // interval - количество минут (30 - полчаса)
    // 60000 - количество миллисекунд в одной минуте
    // 1800000 - полчаса
    // 3600000 - час
    const intervalMilliseconds = interval && +interval * 60000

    for (let i = 1; i < len; i++) {
        start = start + intervalMilliseconds
        arr = [...arr, start]
    }

    // 5) Получить новые массивы, дополненные date в миллисекундах
    // Диаметр
    const pointsDiameterDate = [...pointsDiameter].map((item, i) => {
        item['date'] = arr[i]
        return item
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
                if (technology['date'] === fact['jointDate']) {
                    const factDiameter = replaceToDot(fact['diameter'])
                    // 'fact' необходим для построения линейного графика, соединяющего точки
                    technology['fact'] = +factDiameter
                    // 'trueFact' и 'falseFact' необходимы для построения точек
                    factDiameter > technology['norm'][0] && factDiameter < technology['norm'][1]
                        ? (technology['trueFact'] = factDiameter)
                        : (technology['falseFact'] = factDiameter)
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
