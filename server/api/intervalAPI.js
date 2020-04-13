// Отправить информацию об интервале между отсечками на шкале времени к '/api/interval'

const interval = require('../config/shp/interval')

module.exports = function({ app }) {
    if (interval) {
        app.get('/api/interval', function(req, res) {
            res.json(interval)
            console.log('Данные отправлены на /api/interval')
        })
    }
}
