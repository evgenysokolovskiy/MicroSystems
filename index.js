const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
const port = process.env.PORT || 5000
const server = require('http')
    .Server(app)
    .listen(port, function() {
        console.log(`listening on port ${port}`)
    })

app.use(express.static(path.join(__dirname, 'client/build')))
app.use(express.json({ limit: '50mb' }))
app.use(
    express.urlencoded({
        limit: '50mb',
        extended: true,
        type: 'application/x-www-form-urlencoding'
    })
)

// Путь, куда сохранять отчёты
const buildPath = path.join(__dirname, 'xlsx', 'build')
const buildPathDetail = path.join(__dirname, 'xlsx', 'build', 'detail')
// Путь, что парсить
const parsePath = path.join(__dirname, 'xlsx', 'parse')
const parsePathRepairCompleted = path.join(__dirname, 'xlsx', 'repairCompleted')
const parsePathCheck = path.join(__dirname, 'xlsx', 'check')
const parsePathScheme = path.join(__dirname, 'xlsx', 'scheme')
const parseShpFact = path.join(__dirname, 'xlsx', 'shp', 'fact')
const parseShpTechnology = path.join(__dirname, 'xlsx', 'shp', 'technology')
const parsePathDetail = path.join(__dirname, 'xlsx', 'detail')

const repairCompleted = require('./server/tasks/parse/repairCompleted/')
require('./server/tasks/parse/main/')({
    app,
    parsePath,
    parsePathRepairCompleted,
    buildPath,
    repairCompleted
})
require('./server/tasks/parse/check/')({ app, parsePathCheck, buildPath })
require('./server/tasks/parse/scheme/')({ app, parsePathScheme, buildPath })
require('./server/tasks/parse/shp/fact')({ app, parseShpFact })
require('./server/tasks/parse/shp/technology')({ app, parseShpTechnology })
require('./server/api/technologyAPI')({ app })
//require('./server/tasks/parse/detail/')({ app, parsePathDetail, buildPathDetail })

/*
app.get('/download/file.xlsx', function(req, res) {
	const file = `${buildPath}/система_анализа_и_планирования_ремонтов_оборудования.xlsx`
    res.download(file)
    console.log('Данные отправлены на /download/file.xlsx')
})
*/
