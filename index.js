const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
const helmet = require('helmet')
const port = process.env.PORT || 5000
const server = require('http')
    .Server(app)
    .listen(port, function () {
        console.log(`listening on port ${port}`)
    })

global.appRoot = path.resolve(__dirname)

app.use(express.static(appRoot + '/client/build'))
app.use(helmet())
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

// * Отправить JSON, STREAM данные к API (при первоначальной загрузке сервера)
require(appRoot + '/server/requests/api/imagesAPI')(app)
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

// * Отправить асинхронные данные к API (от внешних источников)
//require(appRoot + '/server/tasks/fetchWeather/')({ https })

// Отправить файлы к API (при первоначальной загрузке сервера)
require(appRoot + '/server/requests/apiFiles/planAPI')({
    app,
    buildPath
})

// Получить POST данные из форм
require(appRoot + '/server/requests/post/')({ app, parseLaboratoryFact, parseShpFact })

/*
COSMODDB_USER = "vbf"
COSMOSDB_PASSWORD = "MJ2a9ItK1cBU1JYJBs54lDEaHTKrCMa1zTq5DDsz7kcMYmvg2giDlgggDIHdr87nKHNe2KtOqlRsX8pbsKtUcQ=="
COSMOSDB_DBNAME = "vbf"
COSMOSDB_HOST= "vbf.mongo.cosmos.azure.com"
COSMOSDB_PORT=10255


mongoose.connect("mongodb://"+COSMOSDB_HOST+":"+COSMOSDB_PORT+"/"+COSMOSDB_DBNAME+"?ssl=true&replicaSet=globaldb", {
  auth: {
    user: COSMODDB_USER,
    password: COSMOSDB_PASSWORD
  },
useNewUrlParser: true,
useUnifiedTopology: true,
retryWrites: false
})
.then(() => console.log('Connection to CosmosDB successful'))
.catch((err) => console.error(err))



const baseConfig = {
    discriminatorKey: "_type", //If you've got a lot of different data types, you could also consider setting up a secondary index here.
    collection: "alldata"   //Name of the Common Collection
}


const commonModel = mongoose.model('Common', new mongoose.Schema({}, baseConfig));


const Family_common = commonModel.discriminator('FamilyType', new mongoose.Schema({
    lastName: String,
    parents: [{
        familyName: String,
        firstName: String,
        gender: String
    }],
    children: [{
        familyName: String,
        firstName: String,
       gender: String,
        grade: Number
    }],
    pets:[{
        givenName: String
    }],
    address: {
        country: String,
        state: String,
        city: String
    }
}, baseConfig))


const Vacation_common = commonModel.discriminator('VacationDestinationsType', new mongoose.Schema({
    name: String,
    country: String
}, baseConfig))


const family_common = new Family_common({
 lastName: "Volum",
 parents: [
     { firstName: "Thomas" },
     { firstName: "Mary Kay" }
 ],
 children: [
     { firstName: "Ryan", gender: "male", grade: 8 },
     { firstName: "Patrick", gender: "male", grade: 7 }
 ],
 pets: [
     { givenName: "Buddy" }
 ],
 address: { country: "USA", state: "WA", city: "Seattle" }
});

family_common.save((err, saveFamily) => {
 console.log("Saved: " + JSON.stringify(saveFamily));
})


const vacay_common = new Vacation_common({
 name: "Honolulu",
 country: "USA"
});

vacay_common.save((err, saveVacay) => {
 console.log("Saved: " + JSON.stringify(saveVacay));
})

*/

/*

Family_common.find({ 'children.gender' : "male"}, function(err, foundFamily){
    foundFamily.forEach(fam => console.log("Found Family (using discriminator): " + JSON.stringify(fam)));
});

*/
