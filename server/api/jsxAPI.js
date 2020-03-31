// Отправить данные к '/api/jsx'

module.exports = function({ app, jsx }) {
    if (jsx) {
        app.get('/api/jsx', function(req, res) {
            res.json(jsx)
            console.log('Данные отправлены на /api/jsx')
        })
    }
}
