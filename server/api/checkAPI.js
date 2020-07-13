// Отправить данные к '/api/check/наименование производства'

module.exports.checkForGeneralUse = function({ app, checkForGeneralUse, name }) {
    app.get(`/api/checkforgeneraluse/${name}`, function(req, res) {
        res.json(checkForGeneralUse)
        console.log(`Данные отправлены на /api/checkforgeneraluse/${name}`)
    })
}

module.exports.converted = function({ app, convertedData, name }) {
    app.get(`/api/check/${name}`, function(req, res) {
        res.json(convertedData)
        console.log(`Данные отправлены на /api/check/${name}`)
    })
}
