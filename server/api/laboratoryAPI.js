// Отправить информацию об интервале между отсечками на шкале времени к '/api/laboratory/percent'
const INDEXES_FACT_DATE = require('../config/laboratory/shp/fact')['date']

module.exports = function({ app, data }) {
    const { shp, shsp, sog } = data
    if (shp) {
        app.get('/api/laboratory/percentShp', function(req, res) {
            res.json(shp['percent'])
            console.log('Данные отправлены на /api/laboratory/percentShp')
        })

        app.get('/api/laboratory/amountShp', function(req, res) {
            res.json(shp['amount'])
            console.log('Данные отправлены на /api/laboratory/amountShp')
        })

        app.get('/api/laboratory/sourceShp', function(req, res) {
            res.json(shp['source'])
            console.log('Данные отправлены на /api/laboratory/sourceShp')
        })

        app.get('/api/laboratory/allShp', function(req, res) {
            res.json({
                dateIndex: INDEXES_FACT_DATE,
                data: shp['all']
            })
            console.log('Данные отправлены на /api/laboratory/allShp')
        })
    }

    if (shsp) {
        app.get('/api/laboratory/percentShsp', function(req, res) {
            res.json(shsp['percent'])
            console.log('Данные отправлены на /api/laboratory/percentShsp')
        })

        app.get('/api/laboratory/amountShsp', function(req, res) {
            res.json(shsp['amount'])
            console.log('Данные отправлены на /api/laboratory/amountShsp')
        })

        app.get('/api/laboratory/sourceShsp', function(req, res) {
            res.json(shsp['source'])
            console.log('Данные отправлены на /api/laboratory/sourceShsp')
        })
    }
    /*
    if (sog) {
        app.get('/api/laboratory/percentSog', function(req, res) {
            res.json(shsp['percent'])
            console.log('Данные отправлены на /api/laboratory/percentSog')
        })

        app.get('/api/laboratory/amountSog', function(req, res) {
            res.json(shsp['amount'])
            console.log('Данные отправлены на /api/laboratory/amountSog')
        })

        app.get('/api/laboratory/sourceSog', function(req, res) {
            res.json(shsp['source'])
            console.log('Данные отправлены на /api/laboratory/sourceSog')
        })
    }
*/
}
