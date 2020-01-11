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

const rootDir = path.join(__dirname, 'data', 'root')
const dir = path.join(__dirname, 'data', 'reports')
require('./server/helpers/parse/rootFile')({ app, rootDir, dir })
