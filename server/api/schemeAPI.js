// Отправить данные к '/api/check/наименование производства'

module.exports = function({ app, convertData, name }) {
    app.get(`/api/scheme/${name}`, function(req, res) {
        res.json(convertData)
        console.log(`Данные отправлены на /api/scheme/${name}`)
    })
}
