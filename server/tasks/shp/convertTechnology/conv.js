// Преобразовать данные технологии

const calculateIntermediatePoints = require('../helpers/calculateIntermediatePoints')
const calculateLength = require('../helpers/calculateLength')

module.exports = function({ technology }) {
    const { stamping, running, grinding, rough, clean, final } = technology

    // Добавить продолжительность операции в часах
    const newStamping = calculateLength(stamping)
    const newRunning = calculateLength(running)
    const newGrinding = calculateLength(grinding)
    const newRough = calculateLength(rough)
    const newClean = calculateLength(clean)
    const newFinal = calculateLength(final)

    // Рассчитать промежуточные точки (для stamping не рассчитываем)
    calculateIntermediatePoints(newRunning)
    calculateIntermediatePoints(newGrinding)
    calculateIntermediatePoints(newRough)
    calculateIntermediatePoints(newClean)
    calculateIntermediatePoints(newFinal)

    const obj = {
        running: (() => convertDataFinal(newRunning))(),
        grinding: (() => convertDataFinal(newGrinding))(),
        rough: (() => convertDataFinal(newRough))(),
        clean: (() => convertDataFinal(newClean))(),
        final: (() => convertDataFinal(newFinal))()
    }

    return obj

    /*
    const { technologyDiameter, technologyInconstancy, technologyDimension, technologyPressure, technologySpeed } = technology
    const { LEN } = technologyDiameter

    // Рассчитать промежуточные точки
    const dataDiameter = calculateIntermediatePointsTechnologyDiameter(technologyDiameter)
    const dataInconstancy = calculateIntermediatePointsTechnology(technologyInconstancy)
    const dataDimension = calculateIntermediatePointsTechnology(technologyDimension)

    // Для построения графиков объединить нужные объекты
    let dataInconstancyDimension = []
    let dataPressureSpeed = []
    for (let i = 0; i < LEN; i++) {
        dataInconstancyDimension = [
            ...dataInconstancyDimension, 
            {
                inconstancy: dataInconstancy[i],
                dimension: dataDimension[i]
            }
        ]

        dataPressureSpeed = [
            ...dataPressureSpeed, 
            {
                pressure: technologyPressure[i],
                speed: technologySpeed[i]
            }
        ]
    }

    return { 
        LEN, 
        dataInconstancyDimension, 
        dataPressureSpeed, 
        dataDiameter, 
        dataInconstancy, 
        dataDimension, 
        technologyPressure, 
        technologySpeed 
    }
    */
}

function convertDataFinal(data) {
    const obj = {}
    data &&
        Object.values(data).forEach(item => {
            obj[item['type']] = item
        })
    return obj
}
