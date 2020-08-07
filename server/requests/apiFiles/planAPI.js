// Отправить данные к '/api/plan'

module.exports = function ({ app, buildPath }) {
    app.get('/download/plan.xlsx', function (req, res) {
        const file = `${buildPath}/система_анализа_и_планирования_ремонтов_оборудования.xlsx`
        res.download(file)
        console.log('Данные отправлены на /download/plan.xlsx')
    })
}
