// Отправить данные к '/api/qualityProduction'

module.exports = function({ app, realTime, remember, all }) {
    if (realTime) {
        app.get('/api/qualityProduction', function(req, res) {
            res.json({ realTime, remember, all })
            console.log('Данные отправлены на /api/qualityProduction')
        })
    }
}
