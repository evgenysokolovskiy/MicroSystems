const technology = require('./technology')
const fact = require('./fact')

module.exports = function({ app, parseShpTechnology, parseShpFact }) {
    console.log(parseShpTechnology)
    technology({ app, parseShpTechnology, parseShpFact, fact })
}
