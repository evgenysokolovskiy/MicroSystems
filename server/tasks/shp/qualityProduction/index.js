const clonedeep = require('lodash.clonedeep')
const interval = require('../../../config/shp/interval')
const calculateDataOneCard = require('../helpers/calculateDataOneCard')
const convertDateToString = require('../helpers/calculateDates').convertDateToString
const convertStringToDateBatchLoadingTime = require('../helpers/calculateDates')
    .convertStringToDateBatchLoadingTime

// На выходе необходимо получить 2 объекта:
// - Помнит все данные после завершения процедуры (для анализа, например, для осевого графика)
// - Данные в реальном времени (не сохраняет данные по завершенным процедурам)
module.exports = function({ joinTechnologyFact, mtime }) {
    let realTimeObj = {} // Только действующие процедуры
    let rememberObj = {} // Только завершённые процедуры
    let allObj = {} // Все процедуры за всё время

    Object.entries(clonedeep(joinTechnologyFact)).forEach(procedure => {
        const realTime = {
            quality: {}, // Перечень карт с качественной продукцией (на момент последней проверки)
            defect: {}, // Перечень карт с дефектной продукцией (на момент последней проверки)
            notFact: {}, // Перечень карт без проверки (на момент последней проверки)
            weight: 0, // Общий загруженный вес продукции
            qualityWeight: 0, // Вес качественной продукции
            defectWeight: 0, // Вес дефектной продукции
            notFactWeight: 0 // Вес продукции, проверка качества которого не производилась
        }

        const remember = {
            quality: {}, // Перечень карт с качественной продукцией (на момент последней проверки)
            defect: {}, // Перечень карт с дефектной продукцией (на момент последней проверки)
            notFact: {}, // Перечень карт без проверки (на момент последней проверки)
            weight: 0, // Общий загруженный вес продукции
            qualityWeight: 0, // Вес качественной продукции
            defectWeight: 0, // Вес дефектной продукции
            notFactWeight: 0 // Вес продукции, проверка качества которого не производилась
        }

        const all = {
            quality: {}, // Перечень карт с качественной продукцией (на момент последней проверки)
            defect: {}, // Перечень карт с дефектной продукцией (на момент последней проверки)
            notFact: {}, // Перечень карт без проверки (на момент последней проверки)
            weight: 0, // Общий загруженный вес продукции
            qualityWeight: 0, // Вес качественной продукции
            defectWeight: 0, // Вес дефектной продукции
            notFactWeight: 0 // Вес продукции, проверка качества которого не производилась
        }

        // 1) По весу продукции
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
                        calculateDataOneCard({
                            technology,
                            fact,
                            procedure: procedure[0],
                            type: type[0],
                            card: card[0],
                            interval
                        })
                    )

                    // Начальный вес партии
                    const hasWeight = card[1].find(item => item['weight'])
                    const weight = hasWeight && hasWeight['weight']
                    // Проработка партии на данной процедуре завершена (имеет вес качественной продукции)
                    const hasQualityWeight = card[1].reverse().find(item => item['qualityProducts'])
                    const qualityWeight = hasQualityWeight && hasQualityWeight['qualityProducts']
                    // Вес дефектной продукции
                    const defectiveWeight = weight && qualityWeight && +weight - +qualityWeight

                    // Исходя из наличия hasQualityWeight (вес качественной продукции при сдаче партии) можно сделать вывод:
                    // Если есть - партия сдана, в настоящий момент перешла на следующую процедуру или ожидает её
                    // Если нет - процедура выполняется в данный момент

                    // *** ПАРТИЯ СДАНА
                    if (hasQualityWeight) {
                        // *** Партия сдана на данной процедуры (процедура закрыта)
                        let rememberQuality, rememberDefect, rememberNotFact
                        const hasFact = val['diameter']
                            .reverse()
                            .find(item => item['falseFact'] || item['trueFact'])

                        if (hasFact) {
                            rememberQuality =
                                hasFact['trueFact'] &&
                                card[1].reverse().find(item => item['qualityProducts'])
                            rememberDefect =
                                hasFact['falseFact'] &&
                                card[1].reverse().find(item => item['qualityProducts'])
                        } else {
                            rememberNotFact = card[1]
                                .reverse()
                                .find(item => item['qualityProducts'])
                        }

                        const qualityItem = rememberQuality && {
                            [type[0]]: {
                                ...remember['quality'][type[0]],
                                [[card[0]]]: rememberQuality
                            }
                        }
                        const defectItem = rememberDefect && {
                            [type[0]]: {
                                ...remember['defect'][type[0]],
                                [[card[0]]]: rememberDefect
                            }
                        }
                        const notFactItem = rememberNotFact && {
                            [type[0]]: {
                                ...remember['notFact'][type[0]],
                                [[card[0]]]: rememberNotFact
                            }
                        }

                        remember['quality'] = { ...remember['quality'], ...qualityItem }
                        remember['defect'] = { ...remember['defect'], ...defectItem }
                        remember['notFact'] = { ...remember['notFact'], ...notFactItem }

                        // Получить вес качественной и дефектной продукции
                        if (rememberQuality) remember['qualityWeight'] += +rememberQuality['weight']
                        if (rememberDefect) remember['defectWeight'] += +rememberDefect['weight']
                        if (rememberNotFact) remember['notFactWeight'] += +rememberNotFact['weight']
                    }

                    // *** ПАРТИЯ НАХОДИТСЯ НА ДАННОЙ ПРОЦЕДУРЕ
                    if (!hasQualityWeight) {
                        // *** Партия выполняется на данной процедуре
                        let realQuality, realDefect, realNotFact
                        const realHasFact = val['diameter']
                            .reverse()
                            .find(item => item['falseFact'] || item['trueFact'])

                        if (realHasFact) {
                            realQuality =
                                realHasFact['trueFact'] && card[1].find(item => item['weight'])
                            realDefect =
                                realHasFact['falseFact'] && card[1].find(item => item['weight'])
                        } else {
                            realNotFact = card[1].find(item => item['weight'])
                        }

                        const realQualityItem = realQuality && {
                            [type[0]]: {
                                ...realTime['quality'][type[0]],
                                [[card[0]]]: realQuality
                            }
                        }
                        const realDefectItem = realDefect && {
                            [type[0]]: {
                                ...realTime['defect'][type[0]],
                                [[card[0]]]: realDefect
                            }
                        }
                        const realNotFactItem = realNotFact && {
                            [type[0]]: {
                                ...realTime['notFact'][type[0]],
                                [[card[0]]]: realNotFact
                            }
                        }

                        realTime['quality'] = { ...realTime['quality'], ...realQualityItem }
                        realTime['defect'] = { ...realTime['defect'], ...realDefectItem }
                        realTime['notFact'] = { ...realTime['notFact'], ...realNotFactItem }

                        // Получить вес качественной и дефектной продукции
                        if (realQuality) realTime['qualityWeight'] += +realQuality['weight']
                        if (realDefect) realTime['defectWeight'] += +realDefect['weight']
                        if (realNotFact) realTime['notFactWeight'] += +realNotFact['weight']
                    }

                    // *** ВСЕ ПАРТИИ
                    let allQuality, allDefect, allNotFact
                    const allHasFact = val['diameter']
                        .reverse()
                        .find(item => item['falseFact'] || item['trueFact'])

                    if (allHasFact) {
                        allQuality = allHasFact['trueFact'] && card[1].find(item => item['weight'])
                        allDefect = allHasFact['falseFact'] && card[1].find(item => item['weight'])
                    } else {
                        allNotFact = card[1].find(item => item['weight'])
                    }

                    const allQualityItem = allQuality && {
                        [type[0]]: {
                            ...all['quality'][type[0]],
                            [[card[0]]]: allQuality
                        }
                    }
                    const allDefectItem = allDefect && {
                        [type[0]]: {
                            ...all['defect'][type[0]],
                            [[card[0]]]: allDefect
                        }
                    }
                    const allNotFactItem = allNotFact && {
                        [type[0]]: {
                            ...all['notFact'][type[0]],
                            [[card[0]]]: allNotFact
                        }
                    }

                    all['quality'] = { ...all['quality'], ...allQualityItem }
                    all['defect'] = { ...all['defect'], ...allDefectItem }
                    all['notFact'] = { ...all['notFact'], ...allNotFactItem }

                    // Получить вес качественной и дефектной продукции
                    if (allQuality) all['qualityWeight'] += +allQuality['weight']
                    if (allDefect) all['defectWeight'] += +allDefect['weight']
                    if (allNotFact) all['notFactWeight'] += +allNotFact['weight']
                })
            })

            realTime['weight'] = (() =>
                realTime['qualityWeight'] + realTime['defectWeight'] + realTime['notFactWeight'])()

            remember['weight'] = (() =>
                remember['qualityWeight'] + remember['defectWeight'] + remember['notFactWeight'])()

            all['weight'] = (() =>
                all['qualityWeight'] + all['defectWeight'] + all['notFactWeight'])()
        })

        realTimeObj = { ...realTimeObj, [procedure[0]]: realTime }
        rememberObj = { ...rememberObj, [procedure[0]]: remember }
        allObj = { ...allObj, [procedure[0]]: all }
    })

    // 2) По количеству карт

    // По процедурам в реальном времени
    Object.entries(realTimeObj).forEach(procedure => {
        if (procedure[0] === 'total' || procedure[0] === 'cards') return
        const quality = getAmountCards(procedure[1]['quality'])
        const defect = getAmountCards(procedure[1]['defect'])
        const notFact = getAmountCards(procedure[1]['notFact'])

        realTimeObj[procedure[0]]['qualityItems'] = quality
        realTimeObj[procedure[0]]['defectItems'] = defect
        realTimeObj[procedure[0]]['notFactItems'] = notFact
        realTimeObj[procedure[0]]['items'] = quality + defect + notFact
    })

    // По завершенным процедурам
    Object.entries(rememberObj).forEach(procedure => {
        if (procedure[0] === 'total' || procedure[0] === 'cards') return
        const quality = getAmountCards(procedure[1]['quality'])
        const defect = getAmountCards(procedure[1]['defect'])
        const notFact = getAmountCards(procedure[1]['notFact'])

        rememberObj[procedure[0]]['qualityItems'] = quality
        rememberObj[procedure[0]]['defectItems'] = defect
        rememberObj[procedure[0]]['notFactItems'] = notFact
        rememberObj[procedure[0]]['items'] = quality + defect + notFact
    })

    // По всем процедурам
    Object.entries(allObj).forEach(procedure => {
        if (procedure[0] === 'total' || procedure[0] === 'cards') return
        const quality = getAmountCards(procedure[1]['quality'])
        const defect = getAmountCards(procedure[1]['defect'])
        const notFact = getAmountCards(procedure[1]['notFact'])

        allObj[procedure[0]]['qualityItems'] = quality
        allObj[procedure[0]]['defectItems'] = defect
        allObj[procedure[0]]['notFactItems'] = notFact
        allObj[procedure[0]]['items'] = quality + defect + notFact
    })

    // 3) Добавить свойства группировки по типам и картам
    // Добавить время начала и предположительное время окончания процедуры (для realTime)
    const [realTypes, realCards] = groupCardsQualityBatchLoadingUnLoadingTime(
        realTimeObj,
        joinTechnologyFact,
        mtime
    )
    const [rememberTypes, rememberCards] = groupCardsQualityBatchLoadingUnLoadingTime(
        rememberObj,
        joinTechnologyFact,
        mtime
    )
    const [allTypes, allCards] = groupCardsQualityBatchLoadingUnLoadingTime(
        allObj,
        joinTechnologyFact,
        mtime
    )

    const realTotal = {
        amountCards: (() => Object.keys(realCards).length)()
    }
    realTimeObj['types'] = realTypes
    realTimeObj['cards'] = realCards
    realTimeObj['total'] = realTotal

    const rememberTotal = {
        amountCards: (() => Object.keys(rememberCards).length)()
    }
    rememberObj['types'] = rememberTypes
    rememberObj['cards'] = rememberCards
    rememberObj['total'] = rememberTotal

    const allTotal = {
        amountCards: (() => Object.keys(allCards).length)()
    }
    allObj['types'] = allTypes
    allObj['cards'] = allCards
    allObj['total'] = allTotal

    //console.log(allObj['types']['9.525']['234'])
    //console.log(realTimeObj['types']['9.525']['234-56-20'])
    //console.log(rememberObj['types']['9.525']['234-56-20'])
    return [realTimeObj, rememberObj, allObj]
}

/* HELPERS */

// Подсчитать количество карт
function getAmountCards(obj) {
    let count = 0
    Object.values(obj).forEach(item => {
        count += Object.keys(item).length
    })
    return count
}

// Определить все уникальные карты и состояние продукции на каждом этапе
// Добавить время начала и окончания процедуры по карте
// Группировать по типам и по картам
function groupCardsQualityBatchLoadingUnLoadingTime(obj, join, mtime) {
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

                    // 2) Определить: время загрузки, время выгрузки
                    let batchLoadingDate, // Дата загрузки
                        batchLoadingTime, // Время загрузки
                        unLoadingDate, // Дата выгрузки
                        unloadingTime // Время выгрузки

                    // Получить фактические данные о времени загрузки и выгрузки
                    const d = join[procedure[0]][type[0]]['fact'][card[0]]
                    d.forEach(c => {
                        // Если имеет weight, то загрузка партии
                        if (c['weight']) batchLoadingDate = c['date']
                        if (c['weight']) batchLoadingTime = c['batchLoadingTime']
                        // Если имеет qualityProducts, то выгрузка партии
                        if (c['qualityProducts']) unLoadingDate = c['date']
                        if (c['qualityProducts']) unloadingTime = c['batchLoadingTime']
                    })

                    // Время загрузки партии в мииллисекундах
                    const msBatchLoadingTime =
                        batchLoadingDate &&
                        batchLoadingTime &&
                        convertStringToDateBatchLoadingTime(batchLoadingDate, batchLoadingTime)
                    // Время выгрузки партии в мииллисекундах
                    let msUnloadingTime =
                        unLoadingDate &&
                        unloadingTime &&
                        convertStringToDateBatchLoadingTime(unLoadingDate, unloadingTime)
                    // Время по технологии в миллисекундах
                    // Предположительное время выгрузки согласно технологии
                    // join[procedure[0]][type[0]]['technology']['len'] - количество отсечек по технологии
                    // interval - столько минут составляет каждый интервал между отсечками
                    // Т.е. чтобы получить дату окончания тех.процесса по технологии необходимо:
                    // Если интервал равен 30 минутам, а длина 42 отсечки, то к времени загрузки необходимо прибавить
                    // 42 раза по 30 минут
                    const msTechnology =
                        join[procedure[0]][type[0]]['technology']['len'] * interval * 60000
                    const msUnloadingTechnologyTime = msBatchLoadingTime + msTechnology
                    const unloadingTechnologyTime = convertDateToString(msUnloadingTime)

                    if (msBatchLoadingTime) {
                        // Если процедура не закончена
                        if (!msUnloadingTime) {
                            // Если время загрузки находится на расстояние от оси меньше, чем время по технологии, то
                            // Предположительное время окончания процедуры будет выходить за ось (время сохранения файла excel)
                            // И равняться времени по технологии
                            const m = mtime.getTime()
                            if (m - msBatchLoadingTime > msTechnology) {
                                msUnloadingTime = m
                            } else {
                                msUnloadingTime = msBatchLoadingTime + msTechnology
                            }
                        }

                        const value = {
                            [procedure[0]]: {
                                ...cards[card[0]][procedure[0]],

                                // Загрузка (факт)
                                msBatchLoadingTime, // миллисекунды
                                batchLoadingTime: (() => convertDateToString(msBatchLoadingTime))(), // Строка

                                // Выгрузка (факт)
                                msUnloadingTime, // миллисекунды
                                unloadingTime: (() => convertDateToString(msUnloadingTime))(), // Строка

                                // Выгрузка (технология)
                                msUnloadingTechnologyTime, // миллисекунды
                                unloadingTechnologyTime: (() =>
                                    convertDateToString(msUnloadingTime))(), // Строка

                                // Продолжительность мс по технологии
                                msTechnology
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

    return [types, cards]
}
