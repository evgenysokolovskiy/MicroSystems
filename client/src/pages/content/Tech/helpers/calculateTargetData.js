// Получить данные по отметке времени
export function calculateTargetData(data, target) {
    if (!data) return
    const { diameter, inconstancyDimension, pressureSpeed } = data

    // Получить данные (в момент времени 'target')
    let minDiameter, maxDiameter, inconstancy, dimension, pressure, speed, factDiameter
    let factDimension, factInconstancy, factPressure, factSpeed
    // Данные по отсечке времени для графика "Диаметр"
    diameter &&
        diameter.forEach(item => {
            if (item['date'] === target) {
                minDiameter = item['norm'][0]
                maxDiameter = item['norm'][1]
                factDiameter = item['fact']
            }
        })

    // Данные по отсечке времени для графика "Непостоянство-размерность"
    inconstancyDimension &&
        inconstancyDimension.forEach(item => {
            if (item['date'] === target) {
                inconstancy = item['inconstancy']
                dimension = item['dimension']
                factDimension = item['factDimension']
                factInconstancy = item['factInconstancy']
            }
        })

    // Данные по отсечке времени для графика "Давление-скорость"
    pressureSpeed &&
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
