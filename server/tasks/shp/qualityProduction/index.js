const clonedeep = require('lodash.clonedeep')
const interval = require('../../../config/shp/interval')
const calculateDataOneCard = require('../helpers/calculateDataOneCard')
const convertDateToString = require('../helpers/calculateDates').convertDateToString
const convertStringToDateBatchLoadingTime = require('../helpers/calculateDates')
    .convertStringToDateBatchLoadingTime

module.exports = function({ joinTechnologyFact }) {
    let d = {}

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
            notFact: {},
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
        })

        const it = {
            [procedure[0]]: obj
        }
        d = { ...d, ...it }
    })

    Object.entries(d).forEach(procedure => {
        //qualityItems - Количество карт, выпускающих качественную продукцию
        //defectItems - Количество карт, выпускающих дефектную продукцию
        //notFactItems - Количество карт, по которым не осуществлялась проверка
        if (procedure[0] === 'total' || procedure[0] === 'cards') return
        const quality = getAmountCards(procedure[1]['quality'])
        const defect = getAmountCards(procedure[1]['defect'])
        const notFact = getAmountCards(procedure[1]['notFact'])

        d[procedure[0]]['qualityItems'] = quality
        d[procedure[0]]['defectItems'] = defect
        d[procedure[0]]['notFactItems'] = notFact
        d[procedure[0]]['items'] = quality + defect + notFact
    })

    const cards = getCardsQualityBatchLoadingUnLoadingTime(d, joinTechnologyFact)
    const total = {
        amountCards: (() => Object.keys(cards).length)()
    }

    d['cards'] = cards
    d['total'] = total

    return d
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
                        cards[card[0]] = { ...cards[card[0]], ...value }
                    }
                })
            })
        })
    })
    return cards
}
