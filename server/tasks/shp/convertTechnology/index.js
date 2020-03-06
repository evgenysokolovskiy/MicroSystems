// Преобразовать данные технологии

const technology = require('../../../../technology')

module.exports = function() {
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
}

// Рассчитать промежуточные точки
function calculateIntermediatePointsTechnology(data) {
    const { START, END, LEN } = data
    // 1) Расчитать данные технологии на основании начальной, конечной точек и длины графика
    let arr = [START]
    const a = START
    const A = (START - END) / (LEN - 1)

    for (let i = 1; i < LEN; i++) {
        arr = [...arr, (a - A * i).toFixed(3)]
    }
    return arr
}

// Рассчитать промежуточные точки для Диаметра
function calculateIntermediatePointsTechnologyDiameter(data) {
    const { START, END, LEN } = data
    let max = START[0] 
    let min = START[1]
    // 1) Расчитать данные технологии на основании начальной, конечной точек и длины графика
    let dataDiameter = [{ norm: [max, min] }]
    const a = START[0]
    const A = (START[0] - END[0]) / (LEN - 1)
    const b = START[1]
    const B = (START[1] - END[1]) / (LEN - 1)
    for (let i = 1; i < LEN; i++) {
        max = +(a - A * i).toFixed(3)
        min = +(b - B * i).toFixed(3)
        const item = {
            norm: [max, min]
        }
        dataDiameter = [...dataDiameter, item]
    }
    return dataDiameter
}