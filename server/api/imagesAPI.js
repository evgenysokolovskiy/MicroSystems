const fs = require('fs')

const image1 = appRoot + '/files/images/image1.jpg'
const image2 = appRoot + '/files/images/image2.jpg'
const image3 = appRoot + '/files/images/image3.jpg'

const images = [image1, image2, image3]

module.exports = function (app) {
    images.forEach((item) => {
        app.get(`/api/${item.split('/').reverse()[0]}`, (req, res) => {
            fs.createReadStream(item).pipe(res)
        })
    })
}
