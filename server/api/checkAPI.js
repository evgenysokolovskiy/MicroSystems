// Отправить данные к '/api/check/наименование производства'

module.exports = function({ app, data, name }) {
    app.get(`/api/check/${name}`, function(req, res) {
        res.json(data)
        console.log(`Данные отправлены на /api/check/${name}`)
    })
}
