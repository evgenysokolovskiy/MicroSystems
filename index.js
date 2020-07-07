const express = require('express')
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
app.use(express.json({ limit: '50mb' }))
app.use(
    express.urlencoded({
        limit: '50mb',
        extended: true,
        type: 'application/x-www-form-urlencoding'
    })
)

// Путь, куда сохранять отчёты
const buildPath = appRoot + '/xlsx/build'
const buildPathDetail = appRoot + '/xlsx/build/detail'
// Путь, что парсить
const parsePath = appRoot + '/xlsx/parse'
const parsePathRepairCompleted = appRoot + '/xlsx/repairCompleted'
const parsePathCheck = appRoot + '/xlsx/check'
const parsePathScheme = appRoot + '/xlsx/scheme'
const parseShpFact = appRoot + '/xlsx/shp/fact'
const parseShpTechnology = appRoot + '/xlsx/shp/technology'
const parsePathDetail = appRoot + '/xlsx/detail'
const parseLaboratoryFact = appRoot + '/xlsx/laboratory/fact'
const parseLaboratoryTechnology = appRoot + '/xlsx/laboratory/technology'
const repairCompleted = require(appRoot + '/server/tasks/parse/repairCompleted')
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

//require('./server/tasks/parse/detail/')({ app, parsePathDetail, buildPathDetail })

/*
app.get('/download/file.xlsx', function(req, res) {
	const file = `${buildPath}/система_анализа_и_планирования_ремонтов_оборудования.xlsx`
    res.download(file)
    console.log('Данные отправлены на /download/file.xlsx')
})
*/
