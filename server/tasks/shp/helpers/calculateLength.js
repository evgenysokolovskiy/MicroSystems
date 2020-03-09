// Рассчитать продолжительность операции в часах

module.exports = function( data ) {
    const newData = data.map(item => {
        item ['len'] = Math.round( ( (item['maxWeight'] / item['weight1000']) * item['machineTime'] ) / 60)
        return item
    })
    return newData
}