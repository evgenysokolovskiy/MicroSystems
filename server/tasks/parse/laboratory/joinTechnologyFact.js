const technology = require(appRoot + '/server/tasks/parse/laboratory/technology')
const fact = require(appRoot + '/server/tasks/parse/laboratory/fact')

module.exports = function({ app, parseLaboratoryTechnology, parseLaboratoryFact }) {
    technology({ app, parseLaboratoryTechnology, parseLaboratoryFact, fact })
}
