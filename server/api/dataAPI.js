// Отправить данные к '/api/data'

module.exports = function(app, data) {
    app.get('/api/data', function(req, res) {
        res.json(data)
        console.log('Данные отправлены на /api/data')
    })
}
