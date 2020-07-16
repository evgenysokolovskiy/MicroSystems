// Отправить информацию об интервале между отсечками на шкале времени к '/api/interval'

const interval = require(appRoot + '/server/config/shp/interval')

module.exports = function ({ app }) {
    if (interval) {
        app.get('/api/interval', function (req, res) {
            res.set('Set-Cookie', 'HttpOnly;Secure;SameSite=Strict')
            res.json(interval)
            console.log('Данные отправлены на /api/interval')
        })
    }
}
