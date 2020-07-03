const clonedeep = require('lodash.clonedeep')
const INDEXES_TECHNOLOGY = require('../../../../config/laboratory/shp/technology')
const INDEXES_FACT = require('../../../../config/laboratory/shp/fact')

// indexes technology
const indexTechnologyName = INDEXES_TECHNOLOGY['name']
const indexTechnologyInhibitorMin = INDEXES_TECHNOLOGY['inhibitorMin']
const indexTechnologyInhibitorMax = INDEXES_TECHNOLOGY['inhibitorMax']
const indexTechnologyViscosityMin = INDEXES_TECHNOLOGY['viscosityMin']
const indexTechnologyViscosityMax = INDEXES_TECHNOLOGY['viscosityMax']
const indexTechnologyH2O = INDEXES_TECHNOLOGY['H2O']
const indexTechnologyMechanicalAdmixture = INDEXES_TECHNOLOGY['mechanicalAdmixture']
const indexTechnologyMetalInclusions = INDEXES_TECHNOLOGY['metalInclusions']
const indexTechnologyFlashPoint = INDEXES_TECHNOLOGY['flashPoint']
const indexTechnologyAcidNumber = INDEXES_TECHNOLOGY['acidNumber']
// indexes fact
const indexFactDate = INDEXES_FACT['date']
const indexFactName = INDEXES_FACT['name']
const indexFactInn = INDEXES_FACT['inn']
const indexFactInhibitor = INDEXES_FACT['inhibitor']
const indexFactViscosity = INDEXES_FACT['viscosity']
const indexFactH2O = INDEXES_FACT['H2O']
const indexFactMechanicalAdmixture = INDEXES_FACT['mechanicalAdmixture']
const indexFactMetalInclusions = INDEXES_FACT['metalInclusions']
const indexFactFlashPoint = INDEXES_FACT['flashPoint']
const indexFactAcidNumber = INDEXES_FACT['acidNumber']
// Столько дней назад от текущей даты учитываются данные
// Данные к API отправляются только за период с началом (текущая дата минус указанное число дней)
// При изменении интервала времени на клиенте, перерасчёт будет производится на клиенте
// Так же на клиент будут отправлены сырые данные за весь период на другой адрес API
const BEFORE_DAYS_RANGE = 365

module.exports = function({ fact: f, technology: t }) {
    const allFact = clonedeep(f).slice(4)
    const technology = clonedeep(t).slice(5)

    // Начальная дата в миллисекундах в соответствии с BEFORE_DAYS_RANGE
    const startDate = getDateBeforeDaysFromNow(BEFORE_DAYS_RANGE)
    // Получить массив с датой в миллисекундах
    const all = clonedeep(allFact).map(item => {
        item[indexFactDate] = ExcelDateToJSMsDate(item[indexFactDate])
        return item
    })
    // Отфильтровать массив с датой в миллисекундах в соответствии с BEFORE_DAYS_RANGE
    const fact = clonedeep(all).filter(item => item[indexFactDate] > startDate)

    // 1) Преобразовать технологию
    let objTechnology = {}
    technology.forEach(t => {
        const obj = {}
        if (typeof t[indexTechnologyInhibitorMin] === 'number') {
            obj['inhibitorMin'] = t[indexTechnologyInhibitorMin]
            obj['inhibitorMax'] = t[indexTechnologyInhibitorMax]
        }
        if (typeof t[indexTechnologyViscosityMin] === 'number') {
            obj['viscosityMin'] = t[indexTechnologyViscosityMin]
            obj['viscosityMax'] = t[indexTechnologyViscosityMax]
        }
        if (typeof t[indexTechnologyH2O] === 'number') obj['h2o'] = t[indexTechnologyH2O]
        if (typeof t[indexTechnologyMechanicalAdmixture] === 'number') {
            obj['mechanicalAdmixture'] = t[indexTechnologyMechanicalAdmixture]
        }
        if (typeof t[indexTechnologyMetalInclusions] === 'number') {
            obj['metalInclusions'] = t[indexTechnologyMetalInclusions]
        }
        if (typeof t[indexTechnologyFlashPoint] === 'number') {
            obj['flashPoint'] = t[indexTechnologyFlashPoint]
        }
        if (typeof t[indexTechnologyAcidNumber] === 'number') {
            obj['acidNumber'] = t[indexTechnologyAcidNumber]
        }

        objTechnology[t[indexTechnologyName]] = obj
    })

    // 2) На основании технологии и факта просчитать количество true/false для каждого свойства и значения
    let amount = {}
    let source = {}
    fact.forEach(f => {
        if (!f[indexFactName] || !f[indexFactDate]) return
        const name = f[indexFactName].trim()
        if (!amount[name]) amount[name] = {}
        if (!source[name]) source[name] = {}

        // Ингибитор
        if (
            f[indexFactInhibitor] &&
            objTechnology[name] &&
            typeof objTechnology[name]['inhibitorMin'] === 'number' &&
            typeof objTechnology[name]['inhibitorMax'] === 'number'
        ) {
            if (!amount[name]['Ингибитор, %']) amount[name]['Ингибитор, %'] = { true: 0, false: 0 }
            if (typeof f[indexFactInhibitor] === 'number') {
                if (
                    f[indexFactInhibitor] >= objTechnology[name]['inhibitorMin'] &&
                    f[indexFactInhibitor] <= objTechnology[name]['inhibitorMax']
                ) {
                    amount[name]['Ингибитор, %']['true']++
                } else {
                    amount[name]['Ингибитор, %']['false']++
                }

                // Группировать по инвентарным номерам (машинам)
                if (!source[name]['Ингибитор, %']) source[name]['Ингибитор, %'] = {}
                const inn = f[indexFactInn]
                let data = source[name]['Ингибитор, %'][inn]
                if (!data) data = []
                source[name]['Ингибитор, %'][inn] = [
                    ...data,
                    {
                        date: msDateToString(f[indexFactDate]),
                        msDate: f[indexFactDate],
                        fact: f[indexFactInhibitor],
                        technology: [
                            objTechnology[name]['inhibitorMin'],
                            objTechnology[name]['inhibitorMax']
                        ]
                    }
                ]
            }
        }

        // Вязкость
        if (
            f[indexFactViscosity] &&
            objTechnology[name] &&
            typeof objTechnology[name]['viscosityMin'] === 'number' &&
            typeof objTechnology[name]['viscosityMax'] === 'number'
        ) {
            if (!amount[name]['Вязкость, мм2/сек'])
                amount[name]['Вязкость, мм2/сек'] = { true: 0, false: 0 }

            if (typeof f[indexFactViscosity] === 'number') {
                if (
                    f[indexFactViscosity] >= objTechnology[name]['viscosityMin'] &&
                    f[indexFactViscosity] <= objTechnology[name]['viscosityMax']
                ) {
                    amount[name]['Вязкость, мм2/сек']['true']++
                } else {
                    amount[name]['Вязкость, мм2/сек']['false']++
                }

                // Группировать по инвентарным номерам (машинам)
                if (!source[name]['Вязкость, мм2/сек']) source[name]['Вязкость, мм2/сек'] = {}
                const inn = f[indexFactInn]
                let data = source[name]['Вязкость, мм2/сек'][inn]
                if (!data) data = []
                source[name]['Вязкость, мм2/сек'][inn] = [
                    ...data,
                    {
                        date: msDateToString(f[indexFactDate]),
                        msDate: f[indexFactDate],
                        fact: f[indexFactViscosity],
                        technology: [
                            objTechnology[name]['viscosityMin'],
                            objTechnology[name]['viscosityMax']
                        ]
                    }
                ]
            }
        }

        // H2O
        if (
            f[indexFactH2O] &&
            objTechnology[name] &&
            typeof objTechnology[name]['h2o'] === 'number'
        ) {
            if (!amount[name]['H2O, %']) amount[name]['H2O, %'] = { true: 0, false: 0 }
            if (typeof f[indexFactH2O] === 'number') {
                if (f[indexFactH2O] === objTechnology[name]['h2o']) {
                    amount[name]['H2O, %']['true']++
                } else {
                    amount[name]['H2O, %']['false']++
                }

                // Группировать по инвентарным номерам (машинам)
                if (!source[name]['H2O, %']) source[name]['H2O, %'] = {}
                const inn = f[indexFactInn]
                let data = source[name]['H2O, %'][inn]
                if (!data) data = []
                source[name]['H2O, %'][inn] = [
                    ...data,
                    {
                        date: msDateToString(f[indexFactDate]),
                        msDate: f[indexFactDate],
                        fact: f[indexFactH2O],
                        technology: objTechnology[name]['h2o']
                    }
                ]
            }
        }

        // Механические примеси
        if (
            f[indexFactMechanicalAdmixture] &&
            objTechnology[name] &&
            typeof objTechnology[name]['mechanicalAdmixture'] === 'number'
        ) {
            if (!amount[name]['Механические примеси, %'])
                amount[name]['Механические примеси, %'] = { true: 0, false: 0 }

            if (typeof f[indexFactMechanicalAdmixture] === 'number') {
                if (f[indexFactMechanicalAdmixture] <= objTechnology[name]['mechanicalAdmixture']) {
                    amount[name]['Механические примеси, %']['true']++
                } else {
                    amount[name]['Механические примеси, %']['false']++
                }

                // Группировать по инвентарным номерам (машинам)
                if (!source[name]['Механические примеси, %'])
                    source[name]['Механические примеси, %'] = {}
                const inn = f[indexFactInn]
                let data = source[name]['Механические примеси, %'][inn]
                if (!data) data = []
                source[name]['Механические примеси, %'][inn] = [
                    ...data,
                    {
                        date: msDateToString(f[indexFactDate]),
                        msDate: f[indexFactDate],
                        fact: f[indexFactMechanicalAdmixture],
                        technology: objTechnology[name]['mechanicalAdmixture']
                    }
                ]
            }
        }

        // Механические включения
        if (
            f[indexFactMetalInclusions] &&
            objTechnology[name] &&
            typeof objTechnology[name]['metalInclusions'] === 'number'
        ) {
            if (!amount[name]['Металлические включения'])
                amount[name]['Металлические включения'] = { true: 0, false: 0 }

            if (typeof f[indexFactMetalInclusions] === 'number') {
                if (f[indexFactMetalInclusions] <= objTechnology[name]['metalInclusions']) {
                    amount[name]['Металлические включения']['true']++
                } else {
                    amount[name]['Металлические включения']['false']++
                }

                // Группировать по инвентарным номерам (машинам)
                if (!source[name]['Металлические включения'])
                    source[name]['Металлические включения'] = {}
                const inn = f[indexFactInn]
                let data = source[name]['Металлические включения'][inn]
                if (!data) data = []
                source[name]['Металлические включения'][inn] = [
                    ...data,
                    {
                        date: msDateToString(f[indexFactDate]),
                        msDate: f[indexFactDate],
                        fact: f[indexFactMetalInclusions],
                        technology: objTechnology[name]['metalInclusions']
                    }
                ]
            }
        }

        // t вспышки
        if (
            f[indexFactFlashPoint] &&
            objTechnology[name] &&
            typeof objTechnology[name]['flashPoint'] === 'number'
        ) {
            if (!amount[name]['t вспышки, не менее град С'])
                amount[name]['t вспышки, не менее град С'] = { true: 0, false: 0 }

            if (typeof f[indexFactFlashPoint] === 'number') {
                if (f[indexFactFlashPoint] >= objTechnology[name]['flashPoint']) {
                    amount[name]['t вспышки, не менее град С']['true']++
                } else {
                    amount[name]['t вспышки, не менее град С']['false']++
                }

                // Группировать по инвентарным номерам (машинам)
                if (!source[name]['t вспышки, не менее град С'])
                    source[name]['t вспышки, не менее град С'] = {}
                const inn = f[indexFactInn]
                let data = source[name]['t вспышки, не менее град С'][inn]
                if (!data) data = []
                source[name]['t вспышки, не менее град С'][inn] = [
                    ...data,
                    {
                        date: msDateToString(f[indexFactDate]),
                        msDate: f[indexFactDate],
                        fact: f[indexFactFlashPoint],
                        technology: objTechnology[name]['flashPoint']
                    }
                ]
            }
        }

        // Кислотное число
        if (
            f[indexFactAcidNumber] &&
            objTechnology[name] &&
            typeof objTechnology[name]['acidNumber'] === 'number'
        ) {
            if (!amount[name]['Кислотное число, мг.кон'])
                amount[name]['Кислотное число, мг.кон'] = { true: 0, false: 0 }

            if (typeof f[indexFactAcidNumber] === 'number') {
                if (f[indexFactAcidNumber] === objTechnology[name]['acidNumber']) {
                    amount[name]['Кислотное число, мг.кон']['true']++
                } else {
                    amount[name]['Кислотное число, мг.кон']['false']++
                }

                // Группировать по инвентарным номерам (машинам)
                if (!source[name]['Кислотное число, мг.кон'])
                    source[name]['Кислотное число, мг.кон'] = {}
                const inn = f[indexFactInn]
                let data = source[name]['Кислотное число, мг.кон'][inn]
                if (!data) data = []
                source[name]['Кислотное число, мг.кон'][inn] = [
                    ...data,
                    {
                        date: msDateToString(f[indexFactDate]),
                        msDate: f[indexFactDate],
                        fact: f[indexFactAcidNumber],
                        technology: objTechnology[name]['acidNumber']
                    }
                ]
            }
        }
    })

    // 3) Рассчитать процент true для каждого свойства и значения
    let percent = {}
    Object.entries(amount).forEach(item => {
        percent[item[0]] = {}
        Object.entries(item[1]).forEach(prop => {
            percent[item[0]][prop[0]] = (
                (prop[1]['true'] / (prop[1]['true'] + prop[1]['false'])) *
                100
            ).toFixed()
        })
    })

    if (Object.keys(percent).length === 0 || Object.keys(amount).length === 0) return

    source = deleteEmptyProps(source)
    percent = deleteEmptyProps(percent)
    amount = deleteEmptyProps(amount)

    return {
        amount,
        source,
        percent,
        all,
        technology,
        startDate
    }
}

// Преобразовать дату (в виде дробного числа из excel)
function ExcelDateToJSMsDate(serial) {
    let currentDate
    if (typeof serial === 'number') {
        const utc_days = Math.floor(serial - 25569)
        const utc_value = utc_days * 86400
        currentDate = new Date(utc_value * 1000).getTime()
    } else if (typeof serial === 'string') {
        currentDate = new Date()
        const y = serial.split('.')[2]
        const yyyy = y.length === 2 ? `20${y}` : y
        const mm = serial.split('.')[1] - 1
        const dd = serial.split('.')[0] + 1
        currentDate = new Date(yyyy, mm, dd).getTime()
    }
    return currentDate
}

// Преобразовать миллисекунды в строку
function msDateToString(ms) {
    const date = new Date(ms)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    return `${String(day).padStart(2, '0')}.${String(month).padStart(2, '0')}.${String(year)}`
}

// Получить дату назад от текущей даты указанное кол-во дней
function getDateBeforeDaysFromNow(range) {
    // 86400000 - миллисекунд в сутках
    const daysBefore = range * 86400000
    // Текущая дата
    const now = Date.now()
    const dateBeforeDays = now - daysBefore
    return dateBeforeDays
}

// Удалить свойства, равные {}, т.е., когда нет фактических данных
function deleteEmptyProps(data) {
    let obj = {}
    Object.entries(data).forEach(item => {
        if (Object.values(item[1])[0]) {
            obj[item[0]] = item[1]
        }
    })
    return obj
}

/*
// Преобразовать дату (в виде дробного числа из excel) в формат времени 13:00
function ExcelDateToJSDate(serial) {
    const utc_days = Math.floor(serial - 25569)
    const utc_value = utc_days * 86400
    const date_info = new Date(utc_value * 1000)

    const fractional_day = serial - Math.floor(serial) + 0.0000001
    let total_seconds = Math.floor(86400 * fractional_day)
    const seconds = total_seconds % 60
    total_seconds -= seconds
    const hours = Math.floor(total_seconds / (60 * 60))
    const minutes = Math.floor(total_seconds / 60) % 60
    return `${String(date_info.getDate()).padStart(2, '0')}.${String(
        date_info.getMonth() + 1
    ).padStart(2, '0')}.${String(date_info.getFullYear()).slice(2)}`
}
*/
