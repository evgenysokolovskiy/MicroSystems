const clonedeep = require('lodash.clonedeep')
const convertStringToDateBatchLoadingTime = require(appRoot +
    '/server/tasks/shp/helpers/calculateDates').convertStringToDateBatchLoadingTime

// Определить номера карт для выбранного типа подшипника
module.exports = function({ fact: f }) {
    const fact = clonedeep(f)
    // Карты, для которых из фактических данных определено время загрузки
    const hasBatchLoadingTime = {}
    Object.entries(fact).forEach(item => {
        item[1].forEach(arr => {
            const batchLoadingTime = convertStringToDateBatchLoadingTime(
                arr['date'],
                arr['batchLoadingTime']
            )
            if (batchLoadingTime) hasBatchLoadingTime[item[0]] = batchLoadingTime
        })
    })

    // Карты, для которых из фактических данных не определено время загрузки
    const notBatchLoadingTime = Object.keys(fact).filter(
        item => !Object.keys(hasBatchLoadingTime).some(val => val === item)
    )

    return {
        hasBatchLoadingTime: ['Сводная', ...Object.keys(hasBatchLoadingTime)],
        notBatchLoadingTime
    }
}
