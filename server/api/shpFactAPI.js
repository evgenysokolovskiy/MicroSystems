// Отправить данные к '/api/shpFact'

module.exports = function({ app, data }) {
    app.get('/api/shpFact', function(req, res) {
        res.json(data)
        console.log('Данные отправлены на /api/shpFact')
    })
}
