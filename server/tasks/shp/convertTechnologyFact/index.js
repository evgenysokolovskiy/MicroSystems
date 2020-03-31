const convertFact = require('../convertFact/').convertFact

module.exports = function({ technology, fact }) {
    let joinTechnologyFact = {}

    // Добавить технологию
    const f = convertFact({ fact })
    Object.keys(technology).forEach(key => {
        const obj1 = {}
        Object.entries(technology[key]).forEach(item => {
            obj1[item[0]] = item[1]
        })

        const obj2 = {}
        Object.entries(obj1).forEach(val => {
            obj2[val[0]] = {
                technology: val[1]
            }
        })
        joinTechnologyFact[key] = obj2
    })

    // Добавить факт
    Object.entries(joinTechnologyFact).forEach(item => {
        Object.entries(item[1]).forEach(type => {
            const factItem = f[item[0]][type[0]]
            if (factItem) item[1][type[0]]['fact'] = factItem
        })
    })

    Object.entries(joinTechnologyFact).forEach(item => {
        Object.entries(item[1]).forEach(type => {
            const cards = {}
            type[1]['fact'] &&
                type[1]['fact'].forEach(card => {
                    const c = cards[card['cardNumber']]
                    cards[card['cardNumber']] = c ? [...c, card] : [card]
                })
            item[1][type[0]]['fact'] = cards
        })
    })

    return joinTechnologyFact
}
