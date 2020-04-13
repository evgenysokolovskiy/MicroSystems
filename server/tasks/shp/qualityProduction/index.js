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
                    let hasFact
                    if (
                        val['diameter']
                            .reverse()
                            .find(item => item['falseFact'] || item['trueFact'])
                    ) {
                        hasFact = val['diameter']
                            .reverse()
                            .find(item => item['falseFact'] || item['trueFact'])
                    } else {
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
                    obj['quality'] = { ...obj['quality'], ...qualityItem }
                    obj['defect'] = { ...obj['defect'], ...defectItem }

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

    return d
}
