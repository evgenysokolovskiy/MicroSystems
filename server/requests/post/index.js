// Принять POST запросы из форм
const multer = require('multer')

module.exports = function ({ app, parseLaboratoryFact, parseShpFact }) {
    // * Options
    const storage = (path) =>
        multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, path)
            },
            filename: function (req, file, cb) {
                cb(null, file.originalname)
            }
        })

    // * Requests

    // Laboratory (fact)
    const laboratoryFact = multer({ storage: (() => storage(parseLaboratoryFact))() })
    app.post('/laboratory/fact', laboratoryFact.single('file'), function (req, res, next) {
        console.log(req.file)
    })

    // Tech (fact)
    const techFact = multer({ storage: (() => storage(parseShpFact))() })
    app.post('/tech/fact', techFact.single('file'), function (req, res, next) {
        console.log(req.file)
    })
}
