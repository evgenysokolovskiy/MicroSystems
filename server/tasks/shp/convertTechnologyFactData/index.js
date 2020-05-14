const clonedeep = require('lodash.clonedeep')
const interval = require('../../../config/shp/interval')
const calculateDataOneCard = require('../helpers/calculateDataOneCard')
const getCards = require('../helpers/getCards')
const calculateDataFewCards = require('../helpers/calculateDataFewCards')

module.exports = function({ joinTechnologyFact: joint }) {
    const joinTechnologyFact = clonedeep(joint)
    const obj = {}

    Object.entries(joinTechnologyFact).forEach(procedure => {
        Object.values(procedure).forEach(item => {
            if (typeof item !== 'object') return

            Object.entries(item).forEach(type => {
                if (!+type[0]) return
                type[1]['dataOneCard'] = {}
                type[1]['dataFewCards'] = {}

                // Технология
                const technology = type[1]['technology']
                // Факт
                const fact = type[1]['fact']
                // Номера карт для выбранного типа подшипника
                const cards = getCards({ fact })
                type[1]['cards'] = cards
                // Данные для построения сводного графика всех карт для данного типа
                type[1]['dataFewCards'] = calculateDataFewCards({
                    technology,
                    fact,
                    procedure: procedure[0],
                    type: type[0],
                    cards,
                    interval
                })

                Object.entries(type[1]['fact']).forEach(card => {
                    type[1]['dataOneCard'] = {
                        ...type[1]['dataOneCard'],
                        [card[0]]: calculateDataOneCard({
                            technology,
                            fact,
                            procedure: procedure[0],
                            type: type[0],
                            card: card[0],
                            interval
                        })
                    }
                })
            })
        })
    })

    return joinTechnologyFact
}
