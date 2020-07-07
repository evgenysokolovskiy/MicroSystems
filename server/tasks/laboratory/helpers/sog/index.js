const clonedeep = require('lodash.clonedeep')
const INDEXES_TECHNOLOGY = require(appRoot + '/server/config/laboratory/sog/technology')
const INDEXES_FACT = require(appRoot + '/server/config/laboratory/sog/fact')

// indexes technology
const indexTechnologyName = INDEXES_TECHNOLOGY['name']
const indexTechnologyPhMin = INDEXES_TECHNOLOGY['phMin']
const indexTechnologyPhMax = INDEXES_TECHNOLOGY['phMax']
const indexTechnologyDensityMin = INDEXES_TECHNOLOGY['densityMin']
const indexTechnologyDensityMax = INDEXES_TECHNOLOGY['densityMax']
const indexTechnologySodaMin = INDEXES_TECHNOLOGY['sodaMin']
const indexTechnologySodaMax = INDEXES_TECHNOLOGY['sodaMax']
const indexTechnologyBicarbonate = INDEXES_TECHNOLOGY['bicarbonate']
const indexTechnologyNitriteMin = INDEXES_TECHNOLOGY['nitriteMin']
const indexTechnologyNitriteMax = INDEXES_TECHNOLOGY['nitriteMax']
const indexTechnologyDegree = INDEXES_TECHNOLOGY['degree']
const indexTechnologyCorrosion = INDEXES_TECHNOLOGY['corrosion']
const indexTechnologyMechanicalAdmixture = INDEXES_TECHNOLOGY['mechanicalAdmixture']
const indexTechnologySoapMin = INDEXES_TECHNOLOGY['soapMin']
const indexTechnologySoapMax = INDEXES_TECHNOLOGY['soapMax']

// indexes fact
const indexFactDate = INDEXES_FACT['date']
const indexFactName = INDEXES_FACT['name']
const indexFactInn = INDEXES_FACT['inn']
const indexFactPh = INDEXES_FACT['ph']
const indexFactDensity = INDEXES_FACT['density']
const indexFactSoda = INDEXES_FACT['soda']
const indexFactBicarbonate = INDEXES_FACT['bicarbonate']
const indexFactNitrite = INDEXES_FACT['nitrite']
const indexFactDegree = INDEXES_FACT['degree']
const indexFactCorrosion = INDEXES_FACT['corrosion']
const indexFactMechanicalAdmixture = INDEXES_FACT['mechanicalAdmixture']
const indexFactSoap = INDEXES_FACT['soap']

// Столько дней назад от текущей даты учитываются данные
// Данные к API отправляются только за период с началом (текущая дата минус указанное число дней)
// При изменении интервала времени на клиенте, перерасчёт будет производится на клиенте
// Так же на клиент будут отправлены сырые данные за весь период на другой адрес API
const BEFORE_DAYS_RANGE = 365

module.exports = function ({ fact: f, technology: t }) {
    const allFact = clonedeep(f).slice(4)
    const technology = clonedeep(t).slice(5)

    // Начальная дата в миллисекундах в соответствии с BEFORE_DAYS_RANGE
    const startDate = getDateBeforeDaysFromNow(BEFORE_DAYS_RANGE)

    // Получить массив с датой в миллисекундах
    const all = clonedeep(allFact).map((item) => {
        item[indexFactDate] = ExcelDateToJSMsDate(item[indexFactDate])
        return item
    })

    // Отфильтровать массив с датой в миллисекундах в соответствии с BEFORE_DAYS_RANGE
    const fact = clonedeep(all).filter((item) => item[indexFactDate] > startDate)

    // 1) Преобразовать технологию
    let objTechnology = {}
    technology.forEach((t) => {
        const obj = {}
        if (typeof t[indexTechnologyPhMin] === 'number') {
            obj['phMin'] = t[indexTechnologyPhMin]
            obj['phMax'] = t[indexTechnologyPhMax]
        }
        if (typeof t[indexTechnologyDensityMin] === 'number') {
            obj['densityMin'] = t[indexTechnologyDensityMin]
            obj['densityMax'] = t[indexTechnologyDensityMax]
        }
        if (typeof t[indexTechnologySodaMin] === 'number') {
            obj['sodaMin'] = t[indexTechnologySodaMin]
            obj['sodaMax'] = t[indexTechnologySodaMax]
        }
        if (typeof t[indexTechnologyBicarbonate] === 'number')
            obj['bicarbonate'] = t[indexTechnologyBicarbonate]
        if (typeof t[indexTechnologyNitriteMin] === 'number') {
            obj['nitriteMin'] = t[indexTechnologyNitriteMin]
            obj['nitriteMax'] = t[indexTechnologyNitriteMax]
        }
        if (typeof t[indexTechnologyDegree] === 'number') {
            obj['degree'] = t[indexTechnologyDegree]
        }
        if (typeof t[indexTechnologyCorrosion] === 'number') {
            obj['corrosion'] = t[indexTechnologyCorrosion]
        }
        if (typeof t[indexTechnologyMechanicalAdmixture] === 'number') {
            obj['mechanicalAdmixture'] = t[indexTechnologyMechanicalAdmixture]
        }
        if (typeof t[indexTechnologySoapMin] === 'number') {
            obj['soapMin'] = t[indexTechnologySoapMin]
            obj['soapMax'] = t[indexTechnologySoapMax]
        }

        objTechnology[t[indexTechnologyName]] = obj
    })

    // 2) На основании технологии и факта просчитать количество true/false для каждого свойства и значения
    let amount = {}
    let source = {}

    fact.forEach((f) => {
        if (!f[indexFactName] || !f[indexFactDate]) return
        const name = f[indexFactName].trim()
        if (!amount[name]) amount[name] = {}
        if (!source[name]) source[name] = {}

        // Водородный показатель-pH
        if (
            f[indexFactPh] &&
            objTechnology[name] &&
            typeof objTechnology[name]['phMin'] === 'number' &&
            typeof objTechnology[name]['phMax'] === 'number'
        ) {
            if (!amount[name]['pH, %']) amount[name]['pH, %'] = { true: 0, false: 0 }

            if (typeof f[indexFactPh] === 'number') {
                if (
                    f[indexFactPh] >= objTechnology[name]['phMin'] &&
                    f[indexFactPh] <= objTechnology[name]['phMax']
                ) {
                    amount[name]['pH, %']['true']++
                } else {
                    amount[name]['pH, %']['false']++
                }

                // Группировать по инвентарным номерам (машинам)
                if (!source[name]['pH, %']) source[name]['pH, %'] = {}
                const inn = f[indexFactInn]
                let data = source[name]['pH, %'][inn]
                if (!data) data = []
                source[name]['pH, %'][inn] = [
                    ...data,
                    {
                        date: msDateToString(f[indexFactDate]),
                        msDate: f[indexFactDate],
                        fact: f[indexFactPh],
                        technology: [objTechnology[name]['phMin'], objTechnology[name]['phMax']]
                    }
                ]
            }
        }

        // Концентрация
        if (
            f[indexFactDensity] &&
            objTechnology[name] &&
            typeof objTechnology[name]['densityMin'] === 'number' &&
            typeof objTechnology[name]['densityMax'] === 'number'
        ) {
            if (!amount[name]['Концентрация, %'])
                amount[name]['Концентрация, %'] = { true: 0, false: 0 }

            if (typeof f[indexFactDensity] === 'number') {
                if (
                    f[indexFactDensity] >= objTechnology[name]['densityMin'] &&
                    f[indexFactDensity] <= objTechnology[name]['densityMax']
                ) {
                    amount[name]['Концентрация, %']['true']++
                } else {
                    amount[name]['Концентрация, %']['false']++
                }

                // Группировать по инвентарным номерам (машинам)
                if (!source[name]['Концентрация, %']) source[name]['Концентрация, %'] = {}
                const inn = f[indexFactInn]
                let data = source[name]['Концентрация, %'][inn]
                if (!data) data = []
                source[name]['Концентрация, %'][inn] = [
                    ...data,
                    {
                        date: msDateToString(f[indexFactDate]),
                        msDate: f[indexFactDate],
                        fact: f[indexFactDensity],
                        technology: [
                            objTechnology[name]['densityMin'],
                            objTechnology[name]['densityMax']
                        ]
                    }
                ]
            }
        }

        // Сода
        if (
            f[indexFactSoda] &&
            objTechnology[name] &&
            typeof objTechnology[name]['sodaMin'] === 'number' &&
            typeof objTechnology[name]['sodaMax'] === 'number'
        ) {
            if (!amount[name]['Сода, г/л']) amount[name]['Сода, г/л'] = { true: 0, false: 0 }

            if (typeof f[indexFactSoda] === 'number') {
                if (
                    f[indexFactSoda] >= objTechnology[name]['sodaMin'] &&
                    f[indexFactSoda] <= objTechnology[name]['sodaMax']
                ) {
                    amount[name]['Сода, г/л']['true']++
                } else {
                    amount[name]['Сода, г/л']['false']++
                }

                // Группировать по инвентарным номерам (машинам)
                if (!source[name]['Сода, г/л']) source[name]['Сода, г/л'] = {}
                const inn = f[indexFactInn]
                let data = source[name]['Сода, г/л'][inn]
                if (!data) data = []
                source[name]['Сода, г/л'][inn] = [
                    ...data,
                    {
                        date: msDateToString(f[indexFactDate]),
                        msDate: f[indexFactDate],
                        fact: f[indexFactSoda],
                        technology: [objTechnology[name]['sodaMin'], objTechnology[name]['sodaMax']]
                    }
                ]
            }
        }

        // Бикарбонат натрия
        if (
            f[indexFactBicarbonate] &&
            objTechnology[name] &&
            typeof objTechnology[name]['bicarbonate'] === 'number'
        ) {
            if (!amount[name]['Бикарбонат натрия, %'])
                amount[name]['Бикарбонат натрия, %'] = { true: 0, false: 0 }
            if (typeof f[indexFactBicarbonate] === 'number') {
                if (f[indexFactBicarbonate] <= objTechnology[name]['bicarbonate']) {
                    amount[name]['Бикарбонат натрия, %']['true']++
                } else {
                    amount[name]['Бикарбонат натрия, %']['false']++
                }

                // Группировать по инвентарным номерам (машинам)
                if (!source[name]['Бикарбонат натрия, %']) source[name]['Бикарбонат натрия, %'] = {}
                const inn = f[indexFactInn]
                let data = source[name]['Бикарбонат натрия, %'][inn]
                if (!data) data = []
                source[name]['Бикарбонат натрия, %'][inn] = [
                    ...data,
                    {
                        date: msDateToString(f[indexFactDate]),
                        msDate: f[indexFactDate],
                        fact: f[indexFactBicarbonate],
                        technology: objTechnology[name]['bicarbonate']
                    }
                ]
            }
        }

        // Нитрит натрия
        if (
            f[indexFactNitrite] &&
            objTechnology[name] &&
            typeof objTechnology[name]['nitriteMin'] === 'number' &&
            typeof objTechnology[name]['nitriteMax'] === 'number'
        ) {
            if (!amount[name]['Нитрит натрия, %'])
                amount[name]['Нитрит натрия, %'] = { true: 0, false: 0 }

            if (typeof f[indexFactNitrite] === 'number') {
                if (
                    f[indexFactNitrite] >= objTechnology[name]['nitriteMin'] &&
                    f[indexFactNitrite] <= objTechnology[name]['nitriteMax']
                ) {
                    amount[name]['Нитрит натрия, %']['true']++
                } else {
                    amount[name]['Нитрит натрия, %']['false']++
                }

                // Группировать по инвентарным номерам (машинам)
                if (!source[name]['Нитрит натрия, %']) source[name]['Нитрит натрия, %'] = {}
                const inn = f[indexFactInn]
                let data = source[name]['Нитрит натрия, %'][inn]
                if (!data) data = []
                source[name]['Нитрит натрия, %'][inn] = [
                    ...data,
                    {
                        date: msDateToString(f[indexFactDate]),
                        msDate: f[indexFactDate],
                        fact: f[indexFactNitrite],
                        technology: [
                            objTechnology[name]['nitriteMin'],
                            objTechnology[name]['nitriteMax']
                        ]
                    }
                ]
            }
        }

        // Степень биопоражения
        if (
            f[indexFactDegree] &&
            objTechnology[name] &&
            typeof objTechnology[name]['degree'] === 'number'
        ) {
            if (!amount[name]['Степень биопоражения'])
                amount[name]['Степень биопоражения'] = { true: 0, false: 0 }

            if (typeof f[indexFactDegree] === 'number') {
                if (f[indexFactDegree] <= objTechnology[name]['degree']) {
                    amount[name]['Степень биопоражения']['true']++
                } else {
                    amount[name]['Степень биопоражения']['false']++
                }

                // Группировать по инвентарным номерам (машинам)
                if (!source[name]['Степень биопоражения']) source[name]['Степень биопоражения'] = {}
                const inn = f[indexFactInn]
                let data = source[name]['Степень биопоражения'][inn]
                if (!data) data = []
                source[name]['Степень биопоражения'][inn] = [
                    ...data,
                    {
                        date: msDateToString(f[indexFactDate]),
                        msDate: f[indexFactDate],
                        fact: f[indexFactDegree],
                        technology: objTechnology[name]['degree']
                    }
                ]
            }
        }

        // Коррозия
        if (
            f[indexFactCorrosion] &&
            objTechnology[name] &&
            typeof objTechnology[name]['corrosion'] === 'number'
        ) {
            if (!amount[name]['Коррозия']) amount[name]['Коррозия'] = { true: 0, false: 0 }

            if (typeof f[indexFactCorrosion] === 'number') {
                if (f[indexFactCorrosion] <= objTechnology[name]['corrosion']) {
                    amount[name]['Коррозия']['true']++
                } else {
                    amount[name]['Коррозия']['false']++
                }

                // Группировать по инвентарным номерам (машинам)
                if (!source[name]['Коррозия']) source[name]['Коррозия'] = {}
                const inn = f[indexFactInn]
                let data = source[name]['Коррозия'][inn]
                if (!data) data = []
                source[name]['Коррозия'][inn] = [
                    ...data,
                    {
                        date: msDateToString(f[indexFactDate]),
                        msDate: f[indexFactDate],
                        fact: f[indexFactCorrosion],
                        technology: objTechnology[name]['corrosion']
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

        // Концентрация
        if (
            f[indexFactSoap] &&
            objTechnology[name] &&
            typeof objTechnology[name]['soapMin'] === 'number' &&
            typeof objTechnology[name]['soapMax'] === 'number'
        ) {
            if (!amount[name]['Мыло, г/л']) amount[name]['Мыло, г/л'] = { true: 0, false: 0 }

            if (typeof f[indexFactSoap] === 'number') {
                if (
                    f[indexFactSoap] >= objTechnology[name]['soapMin'] &&
                    f[indexFactSoap] <= objTechnology[name]['soapMax']
                ) {
                    amount[name]['Мыло, г/л']['true']++
                } else {
                    amount[name]['Мыло, г/л']['false']++
                }

                // Группировать по инвентарным номерам (машинам)
                if (!source[name]['Мыло, г/л']) source[name]['Мыло, г/л'] = {}
                const inn = f[indexFactInn]
                let data = source[name]['Мыло, г/л'][inn]
                if (!data) data = []
                source[name]['Мыло, г/л'][inn] = [
                    ...data,
                    {
                        date: msDateToString(f[indexFactDate]),
                        msDate: f[indexFactDate],
                        fact: f[indexFactSoap],
                        technology: [objTechnology[name]['soapMin'], objTechnology[name]['soapMax']]
                    }
                ]
            }
        }
    })

    // 3) Рассчитать процент true для каждого свойства и значения
    let percent = {}
    Object.entries(amount).forEach((item) => {
        percent[item[0]] = {}
        Object.entries(item[1]).forEach((prop) => {
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
        const dd = serial.split('.')[0]
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
    Object.entries(data).forEach((item) => {
        if (Object.values(item[1])[0]) {
            obj[item[0]] = item[1]
        }
    })
    return obj
}
