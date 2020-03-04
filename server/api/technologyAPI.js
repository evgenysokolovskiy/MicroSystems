// Отправить данные к '/api/technology'

const technology = require('../../technology')
console.log(technology)
module.exports = function({ app }) {
    app.get('/api/technology', function(req, res) {
        res.json(technology)
        console.log('Данные отправлены на /api/technology')
    })
}
