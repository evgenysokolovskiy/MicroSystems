// Отправить данные к '/api/technology'

const data = require('../../data')

module.exports = function({ app }) {
    app.get('/api/technology', function(req, res) {
        res.json(data)
        console.log('Данные отправлены на /api/technology')
    })
}
