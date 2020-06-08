const technology = require('./technology')
const fact = require('./fact')

module.exports = function({ app, parseLaboratoryTechnology, parseLaboratoryFact }) {
    technology({ app, parseLaboratoryTechnology, parseLaboratoryFact, fact })
}
