// Отправить данные к '/api/joinTechnologyFact'

/*
module.exports = function({ app, joinTechnologyFact }) {
    if (joinTechnologyFact) {
        app.get('/api/joinTechnologyFact', function(req, res) {
            res.json(joinTechnologyFact)
            console.log('Данные отправлены на /api/joinTechnologyFact')
        })
    }
}
*/

module.exports = function({ app, joinTechnologyFact }) {
    if (joinTechnologyFact) {
        Object.entries(joinTechnologyFact).forEach(procedure => {
            // Отправить все типы подшипника для каждой процедуры
            const types = Object.keys(procedure[1])
                .filter(item => +item)
                .sort((a, b) => a - b)

            app.get(`/api/joinTechnologyFact/${procedure[0]}/types`, function(req, res) {
                res.json(types)
                console.log(`Данные отправлены на /api/joinTechnologyFact/${procedure[0]}/types`)
            })

            // Отправить данные для каждой карты каждого типа каждой процедуры
            Object.entries(procedure[1]).forEach(type => {
                if (!+type[0]) return
                app.get(`/api/joinTechnologyFact/${procedure[0]}/${type[0]}`, function(req, res) {
                    res.json(type[1])
                    console.log(
                        `Данные отправлены на /api/joinTechnologyFact/${procedure[0]}/${type[0]}`
                    )
                })
            })
        })
    }
}
