// 2) Разделить оборудование по производствам

const clonedeep = require('lodash.clonedeep')
const collapseDataByInn = require(appRoot +
    '/server/tasks/primaryDataProcessing/_1-collapseDataByInn')

module.exports = function (data) {
    // Данные схлопнуты по инвентарным номерам
    // Представляют вид массива объектов
    const d = clonedeep(collapseDataByInn(data))
    // Получить объект, где ключи - это номера производств
    // Значение - объект, включающий массив объектов оборудования и изначальное их количество
    let obj = {}
    d.forEach((item) => {
        const prev = obj[item.spot] ? obj[item.spot] : []
        obj[item.spot] = [...prev, item]
    })

    let newObj = {}
    Object.keys(obj).forEach((item) => {
        newObj[item] = {
            data: obj[item],
            allEquipment: obj[item].length
        }
    })

    //console.log(newObj)
    return newObj
}
