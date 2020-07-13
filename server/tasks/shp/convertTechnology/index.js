// Преобразовать данные технологии

const calculateIntermediatePoints = require(appRoot +
    '/server/tasks/shp/helpers/calculateIntermediatePoints')
const calculateLength = require(appRoot + '/server/tasks/shp/helpers/calculateLength')

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
}

function convertDataFinal(data) {
    const obj = {}
    data &&
        Object.values(data).forEach(item => {
            obj[item['type']] = item
        })
    return obj
}
