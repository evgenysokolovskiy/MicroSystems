// Парсить данные из detail и передать функции

const fs = require('fs')
const xlsx = require('node-xlsx') // parse excel file
const systemCompareEquipment = require(appRoot + '/server/tasks/build/systemCompareEquipment/')

const fact = {
    50: ['01213070067', '01213070070', '01214030032'],
    56: [
        '03591010095',
        '03591010108',
        '03593040074',
        '03598080092',
        '03591010076',
        '03598080101',
        '03598080126'
    ],
    57: ['0801010007.0002', '11122210003'],
    61: [
        '03234010069',
        '03234010113',
        '03234010150',
        '03234140006',
        '03234140012',
        '03234140046',
        '03234140053',
        '03234150045',
        '03511050109',
        '03511160012',
        '03511210009',
        '03511210015',
        '03511210023'
    ],
    63: ['03238080078', '03238080081', '03512060047', '03513080011', '03513080045']
}

// Месяц в миллисекундах
const month = 2628002880
// Период сравнения в месяцах
const period = 1
// Начало ремонта
const startRepair = new Date('2019.11.01').getTime()
// Окончание ремонта
const endRepair = new Date('2019.11.30').getTime()
// Дата периода до ремонта
const start = startRepair - period * month
// Окончание периода после ремонта
const end = endRepair + period * month

module.exports = function ({ app, parsePathDetail, buildPathDetail }) {
    fs.readdir(parsePathDetail, function (err, files) {
        const paths = files.map((item) => `${parsePathDetail}/${item}`)
        for (let i = 0; i < paths.length; i++) {
            new Promise(function (resolve, reject) {
                // Прочитать файл по ссылке paths[i]
                const data = xlsx.parse(`${paths[i]}`)[0].data

                if (data) {
                    let convertedFact = {}
                    Object.entries(fact).forEach((factItem) => {
                        let before = []
                        let after = []
                        let inns = {}
                        let beforeTime = 0
                        let afterTime = 0
                        let beforeLen = 0
                        let afterLen = 0
                        let model
                        let num

                        factItem[1].forEach((inn) => {
                            data.forEach((item) => {
                                if (inn == item[6]) {
                                    if (item[4] == 61) console.log(item)
                                    const date = convertStringToDate(item[2])
                                    const obj = {
                                        start: date,
                                        end: item[3],
                                        spot: item[4],
                                        model: item[5],
                                        inn: item[6],
                                        num: item[7],
                                        code: item[8],
                                        amount: item[11],
                                        summTime: item[12]
                                    }
                                    if (date > start && date < startRepair) {
                                        before = [...before, obj]
                                        if (isInteger(item[12])) {
                                            beforeTime += +item[12]
                                        } else {
                                            beforeTime += +item[12].replace(',', '.')
                                        }
                                        beforeLen++
                                    }
                                    if (date < end && date > endRepair) {
                                        after = [...after, obj]
                                        if (isInteger(item[12])) {
                                            afterTime += +item[12]
                                        } else {
                                            afterTime += +item[12].replace(',', '.')
                                        }
                                        afterLen++
                                    }

                                    model = item[5]
                                    num = item[7]
                                }
                            })

                            inns[inn] = {
                                model,
                                num,
                                before,
                                after,
                                beforeLen,
                                afterLen,
                                beforeTime,
                                afterTime
                            }
                        })

                        convertedFact[factItem[0]] = inns
                        return factItem
                    })

                    resolve(
                        (() => {
                            // Сформировать файл
                            systemCompareEquipment({ convertedFact, buildPathDetail })
                        })()
                    )
                } else {
                    reject(new Error('Err'))
                }
            }).catch((err) => console.log(err))
        }
    })
}

// Конкатенировать дату и время проверки
function convertStringToDate(str) {
    if (!str) return
    const dd = str.split('.')[0]
    const mm = str.split('.')[1] - 1
    const yyyy = str.split(' ')[0].split('.')[2]
    return new Date(yyyy, mm, dd).getTime()
}

// Проверка на целое число
function isInteger(num) {
    return (num ^ 0) === num
}
