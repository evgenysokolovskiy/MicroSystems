// Отправить данные к '/api/scheme/наименование цеха'

module.exports = function ({ app, convertData, name }) {
    app.get(`/api/scheme/${name}`, function (req, res) {
        res.set('Set-Cookie', 'HttpOnly;Secure;SameSite=Strict')
        res.json(convertData)
        console.log(`Данные отправлены на /api/scheme/${name}`)
    })
}
