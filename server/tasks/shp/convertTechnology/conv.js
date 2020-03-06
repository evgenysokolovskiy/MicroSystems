// Преобразовать данные технологии

module.exports = function({ technology }) {

    const { stamping, running, grinding, rough, clean, final } = technology
    // Добавить продолжительность операции в часах
    const newStamping = calculateLength(stamping)
    const newRunning = calculateLength(running)
    const newGrinding = calculateLength(grinding)
    const newRough = calculateLength(rough)
    const newClean = calculateLength(clean)
    const newFinal = calculateLength(final)

    // Рассчитать промежуточные точки между начальной и конечной
    calculateIntermediatePointsTechnologyDiameter(newRunning)


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

// Рассчитать продолжительность операции в часах
function calculateLength(data) {
    const newData = data.map(item => {
        item ['len'] = Math.round( ( (item['maxWeight'] / item['weight1000']) * item['machineTime'] ) / 60)
        return item
    })
    return newData
}

// Рассчитать промежуточные точки
function calculateIntermediatePointsTechnology(data) {
    let arr = []
    data.map(item => {
        const { minDiameter, maxDiameter, minDiameterEnd, maxDiameterEnd, len } = item
        const start = [ minDiameter, maxDiameter ]
        const end = [ minDiameterEnd, maxDiameterEnd ]

        arr = [start]
        const a = start
        const A = (start - end) / (len - 1)

        for (let i = 1; i < len; i++) {
            arr = [...arr, (a - A * i).toFixed(3)]
        }
        //console.log(arr)
    })
    return arr
}

// Рассчитать промежуточные точки для Диаметра
function calculateIntermediatePointsTechnologyDiameter(data) {
    data.map(item => {
        let { 
            minDiameter: min, 
            maxDiameter: max, 
            minDiameterEnd: minEnd, 
            maxDiameterEnd: maxEnd, 
            len
        } = item
        let pointsDiameter = [{ norm: [max, min] }]
        const a = min
        const A = (min - minEnd) / (len - 1)
        const b = max
        const B = (max - maxEnd) / (len - 1)
        for (let i = 1; i < len; i++) {
            max = +(a - A * i).toFixed(3)
            min = +(b - B * i).toFixed(3)
            const item = {
                norm: [min, max]
            }
            pointsDiameter = [...pointsDiameter, item]
        }
        item['pointsDiameter'] = pointsDiameter
        if (item['len']) console.log(item)
    })























   //data.map(item => {
        //let { minDiameter: min, maxDiameter: max, minDiameterEnd: minEnd, maxDiameterEnd: maxEnd, len } = item
  /*      
        // Начальная точка (известна)
        let dataDiameter = [{ norm: [min, max] }]
        const a = min
        const A = (min - minEnd) / (len - 1)
        const b = max
        const B = (max - maxEnd) / (len - 1)

        for (let i = 1; i < len; i++) {
            max = +(a - A * i).toFixed(3)
            min = +(b - B * i).toFixed(3)
            const item = {
                norm: [max, min]
            }
            dataDiameter = [...dataDiameter, item]
        }
*/
        /*if (item['len'])*/ //console.log( dataDiameter )
    //})
}