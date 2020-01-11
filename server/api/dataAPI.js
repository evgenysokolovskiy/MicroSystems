// Отправить данные к '/api/plan'

module.exports = function({ app, plan }) {
    app.get('/api/plan', function(req, res) {
        res.json(plan)
        console.log('Данные отправлены на /api/plan')
    })
}
