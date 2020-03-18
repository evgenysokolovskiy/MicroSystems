// Рассчитать продолжительность операции в часах

module.exports = function(data) {
    const newData = data.map(item => {
        // В часах
        item['len'] = Math.round(
            ((item['maxWeight'] / item['weight1000']) * item['machineTime']) / 30
        )
        return item
    })
    return newData
}
