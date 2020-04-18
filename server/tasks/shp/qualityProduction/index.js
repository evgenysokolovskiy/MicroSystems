const clonedeep = require('lodash.clonedeep')
const interval = require('../../../config/shp/interval')
const calculateDataOneCard = require('../helpers/calculateDataOneCard')
const convertDateToString = require('../helpers/calculateDates').convertDateToString
const convertStringToDateBatchLoadingTime = require('../helpers/calculateDates')
    .convertStringToDateBatchLoadingTime

module.exports = function({ joinTechnologyFact }) {
    let rememberCompletedSteps = {}
let forgetCompletedSteps = {}

//const arr = joinTechnologyFact['running']['14.288']['fact']['336-56-20']
//console.log(arr)


    Object.entries(clonedeep(joinTechnologyFact)).forEach(procedure => {
        if (
            procedure[0] !== 'running' &&
            procedure[0] !== 'grinding' &&
            procedure[0] !== 'stamping'
        )
            return
        const obj = {
            quality: {}, // Перечень карт с качественной продукцией (на момент последней проверки)
            defect: {}, // Перечень карт с дефектной продукцией (на момент последней проверки)
            notFact: {}, // Перечень карт без проверки (на момент последней проверки)
            weight: 0, // Общий загруженный вес продукции
            qualityWeight: 0, // Вес качественной продукции
            defectWeight: 0, // Вес дефектной продукции
            notFactWeight: 0 // Вес продукции, проверка качества которого не производилась
        }

const forget = {
    quality: {}, // Перечень карт с качественной продукцией (на момент последней проверки)
    defect: {}, // Перечень карт с дефектной продукцией (на момент последней проверки)
    notFact: {}, // Перечень карт без проверки (на момент последней проверки)
    weight: 0, // Общий загруженный вес продукции
    qualityWeight: 0, // Вес качественной продукции
    defectWeight: 0, // Вес дефектной продукции
    notFactWeight: 0 // Вес продукции, проверка качества которого не производилась
}

        Object.values(procedure).forEach(item => {
            if (typeof item !== 'object') return
            Object.entries(item).forEach(type => {
                if (!+type[0]) return
                // Технология
                const technology = type[1]['technology']
                // Факт
                const fact = type[1]['fact']

                Object.entries(type[1]['fact']).forEach(card => {
                    let val = clonedeep(
                        calculateDataOneCard({ technology, fact, card: card[0], interval })
                    )




// Начальный вес партии
const hasWeight = card[1].find(item => item['weight'])
const weight = hasWeight && hasWeight['weight']
// Проработка партии на данной процедуре завершена (имеет вес качественной продукции)
const hasQualityWeight = card[1].reverse().find(item => item['qualityProducts'])
const qualityWeight = hasQualityWeight && hasQualityWeight['qualityProducts']
// Вес дефектной продукции
const defectiveWeight = weight && qualityWeight && +weight - +qualityWeight


// Если не имеет годного веса продукции на выходе, значит данная процедура еще не закончилась 
// или закончилась, но вся продукция имеет брак. Тогда тоже принадлежит данной процедуре
if (!qualityWeight) {
    let forgetQuality, forgetDefect, forgetNotFact
    const forgetHasFact = val['diameter']
        .reverse()
        .find(item => item['falseFact'] || item['trueFact'])

    if (forgetHasFact) {
        forgetQuality =
            forgetHasFact['trueFact'] && card[1].find(item => item['weight'])
        forgetDefect =
            forgetHasFact['falseFact'] && card[1].find(item => item['weight'])
    } else {
        forgetNotFact = card[1].find(item => item['weight'])
    }

    const forgetQualityItem = forgetQuality && {
        [type[0]]: {
            ...forget['quality'][type[0]],
            [[card[0]]]: forgetQuality
        }
    }
    const forgetDefectItem = forgetDefect && {
        [type[0]]: {
            ...forget['defect'][type[0]],
            [[card[0]]]: forgetDefect
        }
    }
    const forgetNotFactItem = forgetNotFact && {
        [type[0]]: {
            ...forget['notFact'][type[0]],
            [[card[0]]]: forgetNotFact
        }
    }

    forget['quality'] = { ...forget['quality'], ...forgetQualityItem }
    forget['defect'] = { ...forget['defect'], ...forgetDefectItem }
    forget['notFact'] = { ...forget['notFact'], ...forgetNotFactItem }

    // Получить вес качественной и дефектной продукции
    if (forgetQuality) forget['qualityWeight'] += +forgetQuality['weight']
    if (forgetDefect) forget['defectWeight'] += +forgetDefect['weight']
    if (forgetNotFact) forget['notFactWeight'] += +forgetNotFact['weight']
}


                    // Заполнить данными свойства quality, defect, notFact
                    let quality, defect, notFact
                    const hasFact = val['diameter']
                        .reverse()
                        .find(item => item['falseFact'] || item['trueFact'])
                    if (hasFact) {
                        quality =
                            hasFact['trueFact'] && card[1].reverse().find(item => item['weight'])
                        defect =
                            hasFact['falseFact'] && card[1].reverse().find(item => item['weight'])
                    } else {
                        notFact = card[1].reverse().find(item => item['weight'])
                    }

                    const qualityItem = quality && {
                        [type[0]]: {
                            ...obj['quality'][type[0]],
                            [[card[0]]]: quality
                        }
                    }
                    const defectItem = defect && {
                        [type[0]]: {
                            ...obj['defect'][type[0]],
                            [[card[0]]]: defect
                        }
                    }
                    const notFactItem = notFact && {
                        [type[0]]: {
                            ...obj['notFact'][type[0]],
                            [[card[0]]]: notFact
                        }
                    }

                    obj['quality'] = { ...obj['quality'], ...qualityItem }
                    obj['defect'] = { ...obj['defect'], ...defectItem }
                    obj['notFact'] = { ...obj['notFact'], ...notFactItem }

                    // Получить вес качественной и дефектной продукции
                    if (quality) obj['qualityWeight'] += +quality['weight']
                    if (defect) obj['defectWeight'] += +defect['weight']
                    if (notFact) obj['notFactWeight'] += +notFact['weight']
                })
            })
            obj['weight'] = (() =>
                obj['qualityWeight'] + obj['defectWeight'] + obj['notFactWeight'])()

            forget['weight'] = (() =>
                forget['qualityWeight'] + forget['defectWeight'] + forget['notFactWeight'])()
        })

        const it = {
            [procedure[0]]: obj
        }

        const forgetIt = {
            [procedure[0]]: forget
        }

        rememberCompletedSteps = { ...rememberCompletedSteps, ...it }
        forgetCompletedSteps = { ...forgetCompletedSteps, ...forgetIt }
    })

    Object.entries(rememberCompletedSteps).forEach(procedure => {
        //qualityItems - Количество карт, выпускающих качественную продукцию
        //defectItems - Количество карт, выпускающих дефектную продукцию
        //notFactItems - Количество карт, по которым не осуществлялась проверка
        if (procedure[0] === 'total' || procedure[0] === 'cards') return
        const quality = getAmountCards(procedure[1]['quality'])
        const defect = getAmountCards(procedure[1]['defect'])
        const notFact = getAmountCards(procedure[1]['notFact'])

        rememberCompletedSteps[procedure[0]]['qualityItems'] = quality
        rememberCompletedSteps[procedure[0]]['defectItems'] = defect
        rememberCompletedSteps[procedure[0]]['notFactItems'] = notFact
        rememberCompletedSteps[procedure[0]]['items'] = quality + defect + notFact
    })

    Object.entries(forgetCompletedSteps).forEach(procedure => {
        if (procedure[0] === 'total' || procedure[0] === 'cards') return
        const quality = getAmountCards(procedure[1]['quality'])
        const defect = getAmountCards(procedure[1]['defect'])
        const notFact = getAmountCards(procedure[1]['notFact'])

        forgetCompletedSteps[procedure[0]]['qualityItems'] = quality
        forgetCompletedSteps[procedure[0]]['defectItems'] = defect
        forgetCompletedSteps[procedure[0]]['notFactItems'] = notFact
        forgetCompletedSteps[procedure[0]]['items'] = quality + defect + notFact
    })

    const [types, cards] = getCardsQualityBatchLoadingUnLoadingTime(rememberCompletedSteps, joinTechnologyFact)
    const [forgetTypes, forgetCards] = getCardsQualityBatchLoadingUnLoadingTime(forgetCompletedSteps, joinTechnologyFact)
    const total = {
        amountCards: (() => Object.keys(cards).length)()
    }

    const forgetTotal = {
        amountCards: (() => Object.keys(forgetCards).length)()
    }

    rememberCompletedSteps['types'] = types
    rememberCompletedSteps['cards'] = cards
    rememberCompletedSteps['total'] = total

    forgetCompletedSteps['types'] = forgetTypes
    forgetCompletedSteps['cards'] = forgetCards
    forgetCompletedSteps['total'] = forgetTotal

    //console.log(rememberCompletedSteps['cards']['336-56-20'])
    return forgetCompletedSteps
}













function getAmountCards(obj) {
    let count = 0
    Object.values(obj).forEach(item => {
        count += Object.keys(item).length
    })
    return count
}

// Определить все уникальные карты
// И состояние продукции на каждом этапе
function getCardsQualityBatchLoadingUnLoadingTime(obj, join) {
    const cards = {}
    const types = {}
    Object.entries(obj).forEach(procedure => {
        Object.entries(procedure[1]).forEach(quality => {
            Object.entries(quality[1]).forEach(type => {
                Object.entries(type[1]).forEach(card => {
                    // 1) Добавить свойство - quality(качество продукции)
                    if (quality[0] === 'quality') {
                        const value = {
                            [procedure[0]]: {
                                quality: true
                            }
                        }
                        cards[card[0]] = { ...cards[card[0]], ...value }
                    }
                    if (quality[0] === 'defect') {
                        const value = {
                            [procedure[0]]: {
                                quality: false
                            }
                        }
                        cards[card[0]] = { ...cards[card[0]], ...value }
                    }
                    if (quality[0] === 'notFact') {
                        const value = {
                            [procedure[0]]: {
                                quality: 'notFact'
                            }
                        }
                        cards[card[0]] = { ...cards[card[0]], ...value }
                    }

                    // 2) Добавить свойство - 'batchLoadingTime'(время загрузки)
                    const batchLoadingTime = card[1]['batchLoadingTime']
                    // 3) Добавить предположительное время выгрузки согласно технологии
                    // join[procedure[0]][type[0]]['technology']['len'] - количество отсечек по технологии
                    // interval - столько минут составляет каждый интервал между отсечками
                    // Т.е. чтобы получить дату окончания тех.процесса по технологии необходимо:
                    // Если интервал равен 30 минутам, а длина 42 отсечки, то к времени загрузки необходимо прибавить
                    // 42 раза по 30 минут
                    // Длина тех.процесса в миллисекундах
                    const msBatchLoadingTime = convertStringToDateBatchLoadingTime(batchLoadingTime)
                    const msTechnology =
                        join[procedure[0]][type[0]]['technology']['len'] * interval * 60000
                    const msUnloadingTime = msBatchLoadingTime + msTechnology
                    const unloadingTime = convertDateToString(msUnloadingTime)

                    if (batchLoadingTime) {
                        const value = {
                            [procedure[0]]: {
                                ...cards[card[0]][procedure[0]],
                                batchLoadingTime,
                                unloadingTime,
                                msBatchLoadingTime,
                                msTechnology,
                                msUnloadingTime
                            }
                        }

                        let it = {}
                        if (types[type[0]]) {
                            it = types[type[0]][card[0]]
                        }

                        const val = {
                            [card[0]]: { ...it, ...value }
                        }
                        cards[card[0]] = { ...cards[card[0]], ...value }
                        types[type[0]] = { ...types[type[0]], ...val }
                    }
                })
            })
        })
    })

    return [ types, cards ]
}
