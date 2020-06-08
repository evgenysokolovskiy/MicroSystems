// Отправить информацию об интервале между отсечками на шкале времени к '/api/laboratory/percent'

module.exports = function({ app, data }) {
    if (data) {
        app.get('/api/laboratory/percent', function(req, res) {
            res.json(data['percent'])
            console.log('Данные отправлены на /api/laboratory/percent')
        })

        app.get('/api/laboratory/amount', function(req, res) {
            res.json(data['amount'])
            console.log('Данные отправлены на /api/laboratory/amount')
        })

        app.get('/api/laboratory/source', function(req, res) {
            res.json(data['source'])
            console.log('Данные отправлены на /api/laboratory/source')
        })
    }
}
