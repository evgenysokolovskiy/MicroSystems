// Отправить данные к '/api/technology'

const convertTechnology = require('../tasks/shp/convertTechnology/')
const technology = { ...convertTechnology() }

module.exports = function({ app }) {
    app.get('/api/technology', function(req, res) {
        res.json(technology)
        console.log('Данные отправлены на /api/technology')
    })
}