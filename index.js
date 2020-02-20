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
// Путь к файлу, который парсить
const parsePath = path.join(__dirname, 'xlsx', 'parse')
// Путь, куда сохранять отчёты
const buildPath = path.join(__dirname, 'xlsx', 'build')
require('./server/tasks/parse/main/')({ app, parsePath, buildPath })

// Путь к файлу, который парсить
const parsePathCheck = path.join(__dirname, 'xlsx', 'check')
require('./server/tasks/parse/check/')({ app, parsePathCheck, buildPath })

const parsePathScheme = path.join(__dirname, 'xlsx', 'scheme')
require('./server/tasks/parse/scheme/')({ app, parsePathScheme, buildPath })

/*
app.get('/download/file.xlsx', function(req, res) {
	const file = `${buildPath}/система_анализа_и_планирования_ремонтов_оборудования.xlsx`
    res.download(file)
    console.log('Данные отправлены на /download/file.xlsx')
})
*/
