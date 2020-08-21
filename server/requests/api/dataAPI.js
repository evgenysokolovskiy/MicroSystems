// Отправить данные к '/api/equipment'

module.exports = function ({ app, equipment }) {
    app.get('/api/equipment', function (req, res) {
        res.set('Set-Cookie', 'HttpOnly;Secure;SameSite=Strict')
        res.json(equipment)
        console.log('Данные отправлены на /api/equipment')
    })
}
