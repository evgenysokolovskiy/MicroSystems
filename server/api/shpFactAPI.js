// Отправить данные к '/api/shpFact'

module.exports = function({ app, fact }) {
    if (fact) {
        app.get('/api/fact', function(req, res) {
            res.json(fact)
            console.log('Данные отправлены на /api/fact')
        })
    }
}
