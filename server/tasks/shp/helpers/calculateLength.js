// Рассчитать продолжительность операции в часах

const interval = require(appRoot + '/server/config/shp/interval')

module.exports = function (data) {
    const newData = data.map((item) => {
        item['len'] = Math.round(
            ((item['maxWeight'] / item['weight1000']) * item['machineTime']) / interval
        )
        return item
    })
    return newData
}
