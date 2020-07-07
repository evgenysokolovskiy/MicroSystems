module.exports = function ({ app, joinTechnologyFact }) {
    if (joinTechnologyFact) {
        Object.entries(joinTechnologyFact).forEach((procedure) => {
            // Отправить все типы подшипника для каждой процедуры
            const types = Object.keys(procedure[1])
                .filter((item) => +item)
                .sort((a, b) => a - b)

            app.get(`/api/jointechnologyfact/${procedure[0]}/types`, function (req, res) {
                res.setHeader('Set-Cookie', 'HttpOnly;Secure;SameSite=Strict')
                res.json(types)
                console.log(`Данные отправлены на /api/jointechnologyfact/${procedure[0]}/types`)
            })

            Object.entries(procedure[1]).forEach((type) => {
                if (!+type[0]) return

                // Отправить номера карт для данного типа
                app.get(`/api/jointechnologyfact/${procedure[0]}/${type[0]}/cards`, function (
                    req,
                    res
                ) {
                    res.setHeader('Set-Cookie', 'HttpOnly;Secure;SameSite=Strict')
                    res.json(type[1]['cards'])
                    console.log(
                        `Данные отправлены на /api/jointechnologyfact/${procedure[0]}/${type[0]}/cards`
                    )
                })

                // Отправить данные для сводной карты каждого типа каждой процедуры
                app.get(`/api/jointechnologyfact/${procedure[0]}/${type[0]}/summary`, function (
                    req,
                    res
                ) {
                    res.setHeader('Set-Cookie', 'HttpOnly;Secure;SameSite=Strict')
                    res.json(type[1]['dataFewCards'])
                    console.log(
                        `Данные отправлены на /api/jointechnologyfact/${procedure[0]}/${type[0]}/summary`
                    )
                })

                Object.entries(type[1]['dataFewCards']).forEach((param) => {
                    app.get(
                        `/api/jointechnologyfact/${procedure[0]}/${type[0]}/summary/${param[0]}`,
                        function (req, res) {
                            res.setHeader('Set-Cookie', 'HttpOnly;Secure;SameSite=Strict')
                            res.json(param[1])
                            console.log(
                                `Данные отправлены на /api/jointechnologyfact/${procedure[0]}/${type[0]}/summary/${param[0]}`
                            )
                        }
                    )
                })

                Object.entries(type[1]['dataOneCard']).forEach((card) => {
                    Object.entries(card[1]).forEach((param) => {
                        app.get(
                            `/api/jointechnologyfact/${procedure[0]}/${type[0]}/${card[0]}/${param[0]}`,
                            function (req, res) {
                                res.setHeader('Set-Cookie', 'HttpOnly;Secure;SameSite=Strict')
                                res.json(param[1])
                                console.log(
                                    `Данные отправлены на /api/jointechnologyfact/${procedure[0]}/${type[0]}/${card[0]}/${param[0]}`
                                )
                            }
                        )
                    })

                    // Отправить данные для каждой карты каждого типа каждой процедуры
                    app.get(
                        `/api/jointechnologyfact/${procedure[0]}/${type[0]}/${card[0]}`,
                        function (req, res) {
                            res.setHeader('Set-Cookie', 'HttpOnly;Secure;SameSite=Strict')
                            res.json(card[1])
                            console.log(
                                `Данные отправлены на /api/jointechnologyfact/${procedure[0]}/${type[0]}/${card[0]}`
                            )
                        }
                    )
                })
            })
        })
    }
}
