// Отправить информацию об интервале между отсечками на шкале времени к '/api/laboratory/percent'
const INDEXES_FACT_DATE_SHP = require(appRoot + '/server/config/laboratory/shp/fact')['date']
const INDEXES_FACT_DATE_SHSP = require(appRoot + '/server/config/laboratory/shsp/fact')['date']
const INDEXES_FACT_DATE_SOG = require(appRoot + '/server/config/laboratory/sog/fact')['date']

module.exports = function({ app, data }) {
    const { shp, shsp, sog } = data

    if (shp) {
        app.get('/api/laboratory/percentshp', function(req, res) {
            res.set('Set-Cookie', 'HttpOnly;Secure;SameSite=Strict')
            res.json(shp['percent'])
            console.log('Данные отправлены на /api/laboratory/percentshp')
        })

        app.get('/api/laboratory/amountshp', function(req, res) {
            res.set('Set-Cookie', 'HttpOnly;Secure;SameSite=Strict')
            res.json(shp['amount'])
            console.log('Данные отправлены на /api/laboratory/amountshp')
        })

        app.get('/api/laboratory/sourceshp', function(req, res) {
            res.set('Set-Cookie', 'HttpOnly;Secure;SameSite=Strict')
            res.json(shp['source'])
            console.log('Данные отправлены на /api/laboratory/sourceshp')
        })

        app.get('/api/laboratory/allshp', function(req, res) {
            res.set('Set-Cookie', 'HttpOnly;Secure;SameSite=Strict')
            res.json({
                dateIndex: INDEXES_FACT_DATE_SHP,
                data: shp['all'],
                technology: shp['technology'],
                defaultStart: shp['startDate']
            })
            console.log('Данные отправлены на /api/laboratory/allshp')
        })
    }

    if (shsp) {
        app.get('/api/laboratory/percentshsp', function(req, res) {
            res.set('Set-Cookie', 'HttpOnly;Secure;SameSite=Strict')
            res.json(shsp['percent'])
            console.log('Данные отправлены на /api/laboratory/percentshsp')
        })

        app.get('/api/laboratory/amountshsp', function(req, res) {
            res.set('Set-Cookie', 'HttpOnly;Secure;SameSite=Strict')
            res.json(shsp['amount'])
            console.log('Данные отправлены на /api/laboratory/amountshsp')
        })

        app.get('/api/laboratory/sourceshsp', function(req, res) {
            res.set('Set-Cookie', 'HttpOnly;Secure;SameSite=Strict')
            res.json(shsp['source'])
            console.log('Данные отправлены на /api/laboratory/sourceshsp')
        })

        app.get('/api/laboratory/allshsp', function(req, res) {
            res.set('Set-Cookie', 'HttpOnly;Secure;SameSite=Strict')
            res.json({
                dateIndex: INDEXES_FACT_DATE_SHSP,
                data: shsp['all'],
                technology: shsp['technology'],
                defaultStart: shsp['startDate']
            })
            console.log('Данные отправлены на /api/laboratory/allshsp')
        })
    }

    if (sog) {
        app.get('/api/laboratory/percentsog', function(req, res) {
            res.set('Set-Cookie', 'HttpOnly;Secure;SameSite=Strict')
            res.json(sog['percent'])
            console.log('Данные отправлены на /api/laboratory/percentsog')
        })

        app.get('/api/laboratory/amountsog', function(req, res) {
            res.set('Set-Cookie', 'HttpOnly;Secure;SameSite=Strict')
            res.json(sog['amount'])
            console.log('Данные отправлены на /api/laboratory/amountsog')
        })

        app.get('/api/laboratory/sourcesog', function(req, res) {
            res.set('Set-Cookie', 'HttpOnly;Secure;SameSite=Strict')
            res.json(sog['source'])
            console.log('Данные отправлены на /api/laboratory/sourcesog')
        })

        app.get('/api/laboratory/allsog', function(req, res) {
            res.set('Set-Cookie', 'HttpOnly;Secure;SameSite=Strict')
            res.json({
                dateIndex: INDEXES_FACT_DATE_SOG,
                data: sog['all'],
                technology: sog['technology'],
                defaultStart: sog['startDate']
            })
            console.log('Данные отправлены на /api/laboratory/allsog')
        })
    }
}
