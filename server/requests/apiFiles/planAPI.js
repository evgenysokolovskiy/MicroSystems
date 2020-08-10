// Отправить данные к '/api/plan'

module.exports = function ({ app, buildPath }) {
    app.get('/download/plan.xlsx', function (req, res) {
        const file = `${buildPath}/система_анализа_и_планирования_ремонтов_оборудования.xlsx`
        res.download(file)
        console.log('Данные отправлены на /download/plan.xlsx')
    })

    app.get('/download/allEquipment/sortedNum.xlsx', function (req, res) {
        const file = `${buildPath}/оборудование_с_сортировкой_по_цеховому_номеру.xlsx`
        res.download(file)
        console.log('Данные отправлены на /download/allEquipment/sortedNum.xlsx')
    })

    app.get('/download/allEquipment/sortedPercent.xlsx', function (req, res) {
        const file = `${buildPath}/оборудование_с_сортировкой_по_проценту.xlsx`
        res.download(file)
        console.log('Данные отправлены на /download/allEquipment/sortedPercent.xlsx')
    })

    app.get('/download/allEquipment/filteredPercentMoreNorm.xlsx', function (req, res) {
        const file = `${buildPath}/оборудование_не_соответствующее_нормативам_по_простоям.xlsx`
        res.download(file)
        console.log('Данные отправлены на /download/allEquipment/filteredPercentMoreNorm.xlsx')
    })
}
