// Отправить данные к '/api/jointechnologyfact'

module.exports = function({ app, joinTechnologyFact }) {
    if (joinTechnologyFact) {
        app.get('/api/jointechnologyfact', function(req, res) {
            res.json(joinTechnologyFact)
            console.log('Данные отправлены на /api/jointechnologyfact')
        })
    }
}
