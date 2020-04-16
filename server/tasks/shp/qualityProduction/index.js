const clonedeep = require('lodash.clonedeep')
const interval = require('../../../config/shp/interval')
const calculateDataOneCard = require('../helpers/calculateDataOneCard')

module.exports = function(joinTechnologyFact) {
    let d = {}
    let total = {
        weight: 0,
        qualityWeight: 0,
        defectWeight: 0,
        notCheckWeight: 0
    }

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
            notCheck: {},
            weight: 0, // Общий загруженный вес продукции
            qualityWeight: 0, // Вес качественной продукции
            defectWeight: 0, // Вес дефектной продукции
            notCheckWeight: 0 // Вес продукции, проверка качества которого не производилась
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

                    // Заполнить данными свойства quality, defect
                    let hasFact, notFact
                    if (
                        val['diameter']
                            .reverse()
                            .find(item => item['falseFact'] || item['trueFact'])
                    ) {
                        hasFact = val['diameter']
                            .reverse()
                            .find(item => item['falseFact'] || item['trueFact'])
                    } else {
                        notCheck = val['diameter']
                        // Получить вес продукции, по которой не осуществлялась проверка
                        // Т.е. не определено качество продукции
                        const notCheckWeightItem = card[1].reverse().find(item => item['weight'])
                        if (notCheckWeightItem)
                            obj['notCheckWeight'] += +notCheckWeightItem['weight']
                    }

                    const quality =
                        hasFact &&
                        hasFact['trueFact'] &&
                        card[1].reverse().find(item => item['weight'])
                    const defect =
                        hasFact &&
                        hasFact['falseFact'] &&
                        card[1].reverse().find(item => item['weight'])

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
                    const notCheckItem = notCheck && {
                        [type[0]]: {
                            ...obj['notCheck'][type[0]],
                            [[card[0]]]: notCheck
                        }
                    }
                    obj['quality'] = { ...obj['quality'], ...qualityItem }
                    obj['defect'] = { ...obj['defect'], ...defectItem }
                    obj['notCheck'] = { ...obj['notCheck'], ...notCheckItem }

                    // Получить вес качественной и дефектной продукции
                    if (quality) obj['qualityWeight'] += +quality['weight']
                    if (defect) obj['defectWeight'] += +defect['weight']
                })
            })
        })
        // Получить общий вес. Передать свойству weight
        obj['weight'] = obj['qualityWeight'] + obj['defectWeight'] + obj['notCheckWeight']

        total = {
            weight: (() => (total['weight'] += obj['weight']))(),
            qualityWeight: (() => (total['qualityWeight'] += obj['qualityWeight']))(),
            defectWeight: (() => (total['defectWeight'] += obj['defectWeight']))(),
            notCheckWeight: (() => (total['notCheckWeight'] += obj['notCheckWeight']))()
        }

        const it = {
            [procedure[0]]: obj
        }
        d = { ...d, ...it }
    })

    d['total'] = total

    Object.entries(d).forEach(procedure => {
        //qualityItems - Количество карт, выпускающих качественную продукцию
        //defectItems - Количество карт, выпускающих дефектную продукцию
        //notCheckItems - Количество карт, по которым не осуществлялась проверка
        if (procedure[0] === 'total') return
        const quality = getAmountCards(procedure[1]['quality'])
        const defect = getAmountCards(procedure[1]['defect'])
        const notCheck = getAmountCards(procedure[1]['notCheck'])

        d[procedure[0]]['qualityItems'] = quality
        d[procedure[0]]['defectItems'] = defect
        d[procedure[0]]['notCheckItems'] = notCheck
        d[procedure[0]]['items'] = quality + defect + notCheck
    })
    console.log(d)
    return d
}

function getAmountCards(obj) {
    let count = 0
    Object.values(obj).forEach(item => {
        count += Object.keys(item).length
    })
    return count
}

/*
function getTotalQualityAmountCards(obj, param) {
  let count = 0
  Object.entries(obj).forEach(procedure => {
    if (procedure[0] === 'total') return
      count += getAmountCards(procedure[1][param])
  })
  return count
}
*/
