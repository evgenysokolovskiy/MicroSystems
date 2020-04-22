const technology = require('./technology')
const fact = require('./fact')

module.exports = function({ app, parseShpTechnology, parseShpFact }) {
    technology({ app, parseShpTechnology, parseShpFact, fact })
}
