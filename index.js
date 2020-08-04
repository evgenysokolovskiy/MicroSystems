const express = require('express')
//const helmet = require('helmet')
const app = express()
const fs = require('fs')
const path = require('path')
const port = process.env.PORT || 5000
const server = require('http')
    .Server(app)
    .listen(port, function () {
        console.log(`listening on port ${port}`)
    })

global.appRoot = path.resolve(__dirname)

app.use(express.static(appRoot + '/client/build'))

//app.use(helmet())
app.use(express.json({ limit: '50mb' }))
app.use(
    express.urlencoded({
        limit: '50mb',
        extended: true,
        type: 'application/x-www-form-urlencoding'
    })
)

// Путь, куда сохранять отчёты
const buildPath = appRoot + '/files/xlsx/build'
const buildPathDetail = appRoot + '/files/xlsx/build/detail'
// Путь, что парсить
const parsePath = appRoot + '/files/xlsx/parse'
const parsePathRepairCompleted = appRoot + '/files/xlsx/repairCompleted'
const parsePathCheck = appRoot + '/files/xlsx/check'
const parsePathScheme = appRoot + '/files/xlsx/scheme'
const parseShpFact = appRoot + '/files/xlsx/shp/fact'
const parseShpTechnology = appRoot + '/files/xlsx/shp/technology'
const parsePathDetail = appRoot + '/files/xlsx/detail'
const parseLaboratoryFact = appRoot + '/files/xlsx/laboratory/fact'
const parseLaboratoryTechnology = appRoot + '/files/xlsx/laboratory/technology'
const repairCompleted = require(appRoot + '/server/tasks/parse/repairCompleted')

require(appRoot + '/server/api/imagesAPI')(app)
require(appRoot + '/server/tasks/parse/main')({
    app,
    parsePath,
    parsePathRepairCompleted,
    buildPath,
    repairCompleted
})
require(appRoot + '/server/tasks/parse/check')({
    app,
    parsePathCheck,
    buildPath
})
require(appRoot + '/server/tasks/parse/scheme')({
    app,
    parsePathScheme,
    buildPath
})
require(appRoot + '/server/tasks/parse/shp/joinTechnologyFact')({
    app,
    parseShpTechnology,
    parseShpFact
})
require(appRoot + '/server/tasks/parse/laboratory/joinTechnologyFact')({
    app,
    parseLaboratoryTechnology,
    parseLaboratoryFact
})

//require(appRoot + '/server/tasks/fetchWeather/')({ https })

//require('./server/tasks/parse/detail/')({ app, parsePathDetail, buildPathDetail })

app.get('/download/file.xlsx', function (req, res) {
    const file = `${buildPath}/система_анализа_и_планирования_ремонтов_оборудования.xlsx`
    res.download(file)
    console.log('Данные отправлены на /download/file.xlsx')
})
