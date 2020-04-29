// Отправить данные к '/api/joinTechnologyFact'

module.exports = function({ app, joinTechnologyFact }) {
    if (joinTechnologyFact) {
        app.get('/api/joinTechnologyFact', function(req, res) {
            res.json(joinTechnologyFact)
            console.log('Данные отправлены на /api/joinTechnologyFact')
        })
    }
}

/*
module.exports = function({ app, joinTechnologyFact }) {
    if (joinTechnologyFact) {
	    Object.entries(joinTechnologyFact).forEach(procedure => {
	    	Object.entries(procedure[1]).forEach(type => {
	    		if (!+type[0]) return
		        app.get(`/api/joinTechnologyFact/${procedure[0]}/${type[0]}`, function(req, res) {
		            res.json(type[1])
		        })
	    	})
	    })
    }
}
*/