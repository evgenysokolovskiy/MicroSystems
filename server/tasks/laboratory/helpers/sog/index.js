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
const indexFacDate = INDEXES_FACT['date']
const indexFactName = INDEXES_FACT['name']
const indexFactInhibitor = INDEXES_FACT['inhibitor']
const indexFactViscosity = INDEXES_FACT['viscosity']
const indexFactH2O = INDEXES_FACT['H2O']
const indexFactMechanicalAdmixture = INDEXES_FACT['mechanicalAdmixture']
const indexFactMetalInclusions = INDEXES_FACT['metalInclusions']
const indexFactFlashPoint = INDEXES_FACT['flashPoint']
const indexFactAcidNumber = INDEXES_FACT['acidNumber']

module.exports = function({ fact: f, technology: t }) {
    const fact = clonedeep(f).slice(4)
    const technology = clonedeep(t).slice(5)

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
        if (!f[indexFactName]) return
        const name = f[indexFactName].trim()
        if (!amount[name]) amount[name] = {}
        if (!source[name]) source[name] = {}

        // Ингибитор
        if (
            typeof objTechnology[name]['inhibitorMin'] === 'number' &&
            typeof objTechnology[name]['inhibitorMax'] === 'number'
        ) {
            if (!amount[name]['Ингибитор, %']) amount[name]['Ингибитор, %'] = { true: 0, false: 0 }
            if (!source[name]['Ингибитор, %']) source[name]['Ингибитор, %'] = []

            if (typeof f[indexFactInhibitor] === 'number') {
                if (
                    f[indexFactInhibitor] > objTechnology[name]['inhibitorMin'] &&
                    f[indexFactInhibitor] < objTechnology[name]['inhibitorMax']
                ) {
                    amount[name]['Ингибитор, %']['true']++
                } else {
                    amount[name]['Ингибитор, %']['false']++
                }

                source[name]['Ингибитор, %'] = [
                    ...source[name]['Ингибитор, %'],
                    {
                        date: ExcelDateToJSDate(f[indexFacDate]),
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
            typeof objTechnology[name]['viscosityMin'] === 'number' &&
            typeof objTechnology[name]['viscosityMax'] === 'number'
        ) {
            if (!amount[name]['Вязкость, мм2/сек'])
                amount[name]['Вязкость, мм2/сек'] = { true: 0, false: 0 }
            if (!source[name]['Вязкость, мм2/сек']) source[name]['Вязкость, мм2/сек'] = []

            if (typeof f[indexFactViscosity] === 'number') {
                if (
                    f[indexFactViscosity] > objTechnology[name]['viscosityMin'] &&
                    f[indexFactViscosity] < objTechnology[name]['viscosityMax']
                ) {
                    amount[name]['Вязкость, мм2/сек']['true']++
                } else {
                    amount[name]['Вязкость, мм2/сек']['false']++
                }

                source[name]['Вязкость, мм2/сек'] = [
                    ...source[name]['Вязкость, мм2/сек'],
                    {
                        date: ExcelDateToJSDate(f[indexFacDate]),
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
        if (typeof objTechnology[name]['h2o'] === 'number') {
            if (!amount[name]['H2O, %']) amount[name]['H2O, %'] = { true: 0, false: 0 }
            if (!source[name]['H2O, %']) source[name]['H2O, %'] = []
            if (typeof f[indexFactH2O] === 'number') {
                if (f[indexFactH2O] > objTechnology[name]['h2o']) {
                    amount[name]['H2O, %']['false']++
                } else {
                    amount[name]['H2O, %']['true']++
                }

                source[name]['H2O, %'] = [
                    ...source[name]['H2O, %'],
                    {
                        date: ExcelDateToJSDate(f[indexFacDate]),
                        fact: f[indexFactH2O],
                        technology: objTechnology[name]['h2o']
                    }
                ]
            }
        }

        // Механические примеси
        if (typeof objTechnology[name]['mechanicalAdmixture'] === 'number') {
            if (!amount[name]['Механические примеси, %'])
                amount[name]['Механические примеси, %'] = { true: 0, false: 0 }
            if (!source[name]['Механические примеси, %'])
                source[name]['Механические примеси, %'] = []

            if (typeof f[indexFactMechanicalAdmixture] === 'number') {
                if (f[indexFactMechanicalAdmixture] > objTechnology[name]['mechanicalAdmixture']) {
                    amount[name]['Механические примеси, %']['false']++
                } else {
                    amount[name]['Механические примеси, %']['true']++
                }

                source[name]['Механические примеси, %'] = [
                    ...source[name]['Механические примеси, %'],
                    {
                        date: ExcelDateToJSDate(f[indexFacDate]),
                        fact: f[indexFactMechanicalAdmixture],
                        technology: objTechnology[name]['mechanicalAdmixture']
                    }
                ]
            }
        }

        // Механические включения
        if (typeof objTechnology[name]['metalInclusions'] === 'number') {
            if (!amount[name]['Металлические включения'])
                amount[name]['Металлические включения'] = { true: 0, false: 0 }
            if (!source[name]['Металлические включения'])
                source[name]['Металлические включения'] = []

            if (typeof f[indexFactMetalInclusions] === 'number') {
                if (f[indexFactMetalInclusions] > objTechnology[name]['metalInclusions']) {
                    amount[name]['Металлические включения']['false']++
                } else {
                    amount[name]['Металлические включения']['true']++
                }

                source[name]['Металлические включения'] = [
                    ...source[name]['Металлические включения'],
                    {
                        date: ExcelDateToJSDate(f[indexFacDate]),
                        fact: f[indexFactMetalInclusions],
                        technology: objTechnology[name]['metalInclusions']
                    }
                ]
            }
        }

        // t вспышки
        if (typeof objTechnology[name]['flashPoint'] === 'number') {
            if (!amount[name]['t вспышки, не менее град С'])
                amount[name]['t вспышки, не менее град С'] = { true: 0, false: 0 }
            if (!source[name]['t вспышки, не менее град С'])
                source[name]['t вспышки, не менее град С'] = []

            if (typeof f[indexFactFlashPoint] === 'number') {
                if (f[indexFactFlashPoint] > objTechnology[name]['flashPoint']) {
                    amount[name]['t вспышки, не менее град С']['false']++
                } else {
                    amount[name]['t вспышки, не менее град С']['true']++
                }

                source[name]['t вспышки, не менее град С'] = [
                    ...source[name]['t вспышки, не менее град С'],
                    {
                        date: ExcelDateToJSDate(f[indexFacDate]),
                        fact: f[indexFactFlashPoint],
                        technology: objTechnology[name]['flashPoint']
                    }
                ]
            }
        }

        // Кислотное число
        if (typeof objTechnology[name]['acidNumber'] === 'number') {
            if (!amount[name]['Кислотное число, мг.кон'])
                amount[name]['Кислотное число, мг.кон'] = { true: 0, false: 0 }
            if (!source[name]['Кислотное число, мг.кон'])
                source[name]['Кислотное число, мг.кон'] = []

            if (typeof f[indexFactAcidNumber] === 'number') {
                if (f[indexFactAcidNumber] > objTechnology[name]['acidNumber']) {
                    amount[name]['Кислотное число, мг.кон']['false']++
                } else {
                    amount[name]['Кислотное число, мг.кон']['true']++
                }

                source[name]['Кислотное число, мг.кон'] = [
                    ...source[name]['Кислотное число, мг.кон'],
                    {
                        date: ExcelDateToJSDate(f[indexFacDate]),
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

    if (Object.keys(percent).length === 0 || Object.keys(percent).length === 0) return

    return {
        amount,
        source,
        percent
    }
}

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
