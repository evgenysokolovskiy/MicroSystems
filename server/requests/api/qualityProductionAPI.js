// Отправить данные к '/api/qualityproduction'

module.exports = function ({ app, realTime, remember, all }) {
    if (realTime) {
        app.get('/api/qualityproduction', function (req, res) {
            res.set('Set-Cookie', 'HttpOnly;Secure;SameSite=Strict')
            res.json({ realTime, remember, all })
            console.log('Данные отправлены на /api/qualityproduction')
        })
    }
}
