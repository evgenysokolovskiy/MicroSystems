import clonedeep from 'lodash.clonedeep'

// Определить номера карт для выбранного типа подшипника
export function getCards({ fact: f }) {
    const fact = clonedeep(f)
    // Карты, для которых из фактических данных определено время загрузки
    const hasBatchLoadingTime = {}
    Object.entries(fact).forEach(item => {
        item[1].forEach(arr => {
            const batchLoadingTime = convertStringToDateBatchLoadingTime(arr['batchLoadingTime'])
            if (batchLoadingTime) hasBatchLoadingTime[item[0]] = batchLoadingTime
        })
    })

    // Карты, для которых из фактических данных не определено время загрузки
    const notBatchLoadingTime = Object.keys(fact).filter(item => {
        const abc = Object.keys(hasBatchLoadingTime).some(val => val === item)
        if (!abc) return item
    })

    return {
        hasBatchLoadingTime: ['Сводная', ...Object.keys(hasBatchLoadingTime)],
        notBatchLoadingTime
    }
}

// Совместить технологию с фактом
export function getData({ technology: t, fact: f, card }) {
    if (card === 'Сводная') return
    const technology = clonedeep(t)
    const fact = clonedeep(f)

    const {
        pointsDiameter,
        pointsInconstancy,
        pointsDimension,
        pointsPressure,
        pointsSpeed
    } = technology

    // 1) Получить дату факта: конкатенировать дату и время как строку --------------------------------------
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

    // 2) Определить временную отметку загрузки (определена как string) -------------------------------------
    let batchLoadingTime
    convertFactJointDate &&
        convertFactJointDate.forEach(item => {
            if (item['batchLoadingTime']) batchLoadingTime = item['batchLoadingTime']
        })
    // 3) Преобразовать string в Date (в миллисекундах) -----------------------------------------------------
    let start = convertStringToDateBatchLoadingTime(batchLoadingTime)

    // Количество часов по технологии
    const len = pointsDiameter.length

    // 4) Определить временные отметки от начальной отметки start до конечной на расстоянии длины len -------

    // Интервал между отметками составляет заданный интервал int в миллисекундах
    let arr = [start]
    // 1800000 - полчаса
    // 3600000 - час
    const int = 1800000
    for (let i = 1; i < len; i++) {
        start = start + int
        arr = [...arr, start]
    }

    // 5) Получить новые массивы, дополненные date в миллисекундах ------------------------------------------
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
            speed: pointsSpeed[i]
        }
        pointsPressureSpeed = [...pointsPressureSpeed, itemPressureSpeed]
    }

    const pointsPressureSpeedDate = [...pointsPressureSpeed].map((item, i) => {
        item['date'] = arr[i]
        return item
    })

    // 6) Добавить факт к массивам с дополненной датой ------------------------------------------------------
    // Диаметр
    const diameter = [...pointsDiameterDate].map(technology => {
        convertFactJointDate &&
            [...convertFactJointDate].forEach(fact => {
                if (technology['date'] === fact['jointDate']) {
                    const factDiameter = fact['diameter']
                    // 'fact' необходим для построения линейного графика, соединяющего точки
                    technology['fact'] = factDiameter
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
                }
            })

        technology['date'] = convertDateToString(technology['date'])
        return technology
    })

    // ------------------------------------------------------------------------------------------------------
    return {
        diameter,
        inconstancyDimension,
        pressureSpeed
    }
}

// Конвертировать дату в строку
function convertDateToString(milliseconds) {
    if (!milliseconds) return
    const date = new Date(milliseconds)
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const d = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()

    return `${d}.${month}.${year} ${hours}:${minutes}`
}

// Конкатенировать дату и время проверки
// конвертировать в дату(в миллисекундах) с округлением до получаса
function convertStringToDate(obj) {
    if (!obj['date'] || !obj['measurementTime']) return
    const dd = obj['date'].split('.')[0]
    const mm = obj['date'].split('.')[1] - 1
    const yyyy = obj['date'].split('.')[2]
    let hours = obj['measurementTime'].split('.')[0]
    const minutes = obj['measurementTime'].split('.')[1]

    // Округлить время до получаса
    const m = minutes > 15 && minutes < 45 && minutes !== 0 ? '30' : '00'
    const h = minutes > 44 ? (hours === 23 ? '00' : ++hours) : hours

    return new Date(yyyy, mm, dd, h, m).getTime()
}

// Конвертировать строку в дату (в миллисекундах) с округлением до получаса
function convertStringToDateBatchLoadingTime(str) {
    if (!str) return
    const dd = str.split('.')[0]
    const mm = str.split('.')[1] - 1
    const yyyy = str.split('.')[2].split('  ')[0]
    let hours = str.split('  ')[1].split('.')[0]
    const minutes = str.split('  ')[1].split('.')[1]

    // Округлить время до получаса
    const m = minutes > 15 && minutes < 45 && minutes !== 0 ? '30' : '00'
    const h = minutes > 44 ? (hours === 23 ? '00' : ++hours) : hours

    return new Date(yyyy, mm, dd, h, m).getTime()
}

// Получить данные по отметке времени
export function getTargetData(data, target) {
    if (!data) return
    const { diameter, inconstancyDimension, pressureSpeed } = data

    // Получить данные (в момент времени 'target')
    let minDiameter, maxDiameter, inconstancy, dimension, pressure, speed, factDiameter
    let factDimension, factInconstancy, factPressure, factSpeed
    // Данные по отсечке времени для графика "Диаметр"
    diameter.forEach(item => {
        if (item['date'] === target) {
            minDiameter = item['norm'][0]
            maxDiameter = item['norm'][1]
            factDiameter = item['fact']
        }
    })

    // Данные по отсечке времени для графика "Непостоянство-размерность"
    inconstancyDimension.forEach(item => {
        if (item['date'] === target) {
            inconstancy = item['inconstancy']
            dimension = item['dimension']
            factDimension = item['factDimension']
            factInconstancy = item['factInconstancy']
        }
    })

    // Данные по отсечке времени для графика "Давление-скорость"
    pressureSpeed.forEach(item => {
        if (item['date'] === target) {
            pressure = item['pressure']
            speed = item['speed']
            factPressure = item['factPressure']
            factSpeed = item['factSpeed']
        }
    })

    // Технология (в момент времени 'target')
    const technology = {
        minDiameter,
        maxDiameter,
        inconstancy,
        dimension,
        pressure,
        speed
    }
    // Факт (в момент времени 'target')
    const fact = {
        factDiameter,
        factInconstancy,
        factDimension,
        factPressure,
        factSpeed
    }

    return { ...technology, ...fact }
}
