// Отправить данные к '/api/qualityProduction'

module.exports = function({ app, qualityProduction }) {
    if (qualityProduction) {
        app.get('/api/qualityProduction', function(req, res) {
            res.json(qualityProduction)
            console.log('Данные отправлены на /api/qualityProduction')
        })
    }
}
