const technology = require(appRoot + '/server/tasks/parse/shp/technology')
const fact = require(appRoot + '/server/tasks/parse/shp/fact')

module.exports = function({ app, parseShpTechnology, parseShpFact }) {
    technology({ app, parseShpTechnology, parseShpFact, fact })
}
