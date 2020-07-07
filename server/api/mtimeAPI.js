// Отправить информацию о последнем изменении файла к '/api/mtime'

module.exports = function ({ app, mtime }) {
    if (mtime) {
        app.get('/api/mtime', function (req, res) {
            res.setHeader('Set-Cookie', 'HttpOnly;Secure;SameSite=Strict')
            res.json(mtime)
            console.log('Данные отправлены на /api/mtime')
        })
    }
}
