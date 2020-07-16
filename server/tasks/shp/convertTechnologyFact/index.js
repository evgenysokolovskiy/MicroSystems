const convertFact = require(appRoot + '/server/tasks/shp/convertFact/').convertFact

module.exports = function ({ technology, fact }) {
    let joinTechnologyFact = {}

    // Добавить технологию
    const f = convertFact({ fact })
    Object.keys(technology).forEach((key) => {
        const obj1 = {}
        Object.entries(technology[key]).forEach((item) => {
            obj1[item[0]] = item[1]
        })

        const obj2 = {}
        Object.entries(obj1).forEach((val) => {
            obj2[val[0]] = {
                technology: val[1]
            }
        })
        joinTechnologyFact[key] = obj2
    })

    // Добавить факт
    Object.entries(joinTechnologyFact).forEach((item) => {
        Object.entries(item[1]).forEach((type) => {
            const factItem = f[item[0]][type[0]]
            if (factItem) item[1][type[0]]['fact'] = factItem
        })
    })

    Object.entries(joinTechnologyFact).forEach((item) => {
        Object.entries(item[1]).forEach((type) => {
            const cards = {}
            type[1]['fact'] &&
                type[1]['fact'].forEach((card) => {
                    const c = cards[card['cardNumber']]
                    cards[card['cardNumber']] = c ? [...c, card] : [card]
                })
            item[1][type[0]]['fact'] = cards
        })
    })
    /*
    // Добавить факт при выгрузке. Равен среднему значению выходного норматива
   Object.entries(joinTechnologyFact).forEach(item => {
        Object.entries(item[1]).forEach(type => {
            const min = type[1]['technology']['minDiameterEnd']
            const max = type[1]['technology']['maxDiameterEnd']
            const middle = (( max - min ) / 2).toFixed(3)

            if (!type[1]['fact']) return
            Object.entries(type[1]['fact']).forEach(card => {
                card[1].forEach(val => {
                    if (val['qualityProducts']) {
                        if (!val['diameter']) {
                            val['diameter'] = 0
                        }
                    }
                })
            })

        })

   })
*/
    //console.log(joinTechnologyFact['grinding']['5.953']['fact']['94'])
    //console.log(joinTechnologyFact['grinding']['5.953']['technology']['minDiameterEnd'])
    //console.log(joinTechnologyFact['grinding']['5.953']['technology']['maxDiameterEnd'])

    return joinTechnologyFact
}
