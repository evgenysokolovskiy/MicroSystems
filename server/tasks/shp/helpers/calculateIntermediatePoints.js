// Рассчитать промежуточные точки

const PRESSURE = 10
const SPEED = 60
const SPEED_ELEVATOR = 0.2

module.exports = function(data) {
    calculateIntermediatePointsTechnologyDiameter(data)
    calculateIntermediatePointsTechnologyInconstancy(data)
    calculateIntermediatePointsTechnologyDimension(data)
    addPressureSpeed(data, PRESSURE, SPEED, SPEED_ELEVATOR)
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
        let pointsDiameter = [{ norm: [min, max] }]
        const a = min
        const A = (min - minEnd) / (len - 1)
        const b = max
        const B = (max - maxEnd) / (len - 1)
        for (let i = 1; i < len; i++) {
            min = +(a - A * i).toFixed(3)
            max = +(b - B * i).toFixed(3)
            const item = {
                norm: [min, max]
            }
            pointsDiameter = [...pointsDiameter, item]
        }
        item['pointsDiameter'] = pointsDiameter
    })
}

// Рассчитать промежуточные точки для Непостоянства
function calculateIntermediatePointsTechnologyInconstancy(data) {
    data.map(item => {
        let { len, inconstancy, inconstancyEnd } = item
        let pointsInconstancy = [inconstancy]
        const a = inconstancy
        const A = (inconstancy - inconstancyEnd) / (len - 1)

        for (let i = 1; i < len; i++) {
            const point = +(a - A * i).toFixed(3)

            pointsInconstancy = [...pointsInconstancy, point]
        }
        item['pointsInconstancy'] = pointsInconstancy
    })
}

// Рассчитать промежуточные точки для Разноразмерности
function calculateIntermediatePointsTechnologyDimension(data) {
    data.map(item => {
        let { len, dimension, dimensionEnd } = item
        let pointsDimension = [dimension]
        const a = dimension
        const A = (dimension - dimensionEnd) / (len - 1)

        for (let i = 1; i < len; i++) {
            const point = +(a - A * i).toFixed(3)

            pointsDimension = [...pointsDimension, point]
        }
        item['pointsDimension'] = pointsDimension
    })
}

function addPressureSpeed(data, PRESSURE, SPEED, SPEED_ELEVATOR) {
    data.map(item => {
        const { len } = item
        let pointsPressure = [],
            pointsSpeed = [],
            pointsSpeedElevator = []
        for (let i = 0; i < len - 1; i++) {
            pointsPressure = [...pointsPressure, PRESSURE]
            pointsSpeed = [...pointsSpeed, SPEED]
            pointsSpeedElevator = [...pointsSpeedElevator, SPEED_ELEVATOR]
        }
        item['pointsPressure'] = pointsPressure
        item['pointsSpeed'] = pointsSpeed
        item['pointsSpeedElevator'] = pointsSpeedElevator
    })
}
