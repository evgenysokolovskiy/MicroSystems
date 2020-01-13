// 1) Схлопнуть данные по инвентарным номерам

const clonedeep = require('lodash.clonedeep')
const INDEXES = require('../constants').INDEXES

module.exports = function(data) {
    const d = clonedeep(data)
    const { spot, model, inn, num, code, amount, time, ps, mtbf } = INDEXES
    const obj = {}

    d.forEach(item => {
        const prev = obj[item[inn]] ? obj[item[inn]].nodes : []
        const nodes = {
            ...prev,
            [item[code]]: {
                time: item[time],
                amount: item[amount]
            }
        }

        obj[item[inn]] = {
            spot: item[spot],
            model: item[model],
            inn: item[inn],
            num: item[num],
            ps: item[ps],
            mtbf: item[mtbf],
            nodes
        }
    })

    /* 
    // dev
    const obj = {}
    for (let i = 1; i < 100; i++) {
        const prev = obj[d[i][inn]] ? obj[d[i][inn]].nodes : []
        const nodes = {
            ...prev,
            [d[i][code]]: {
                time: d[i][time],
                amount: d[i][amount]
            }
        }

        obj[d[i][inn]] = {
            spot: d[i][spot],
            model: d[i][model],
            inn: d[i][inn],
            num: d[i][num],
            ps: d[i][ps],
            mtbf: d[i][mtbf],
            nodes
        }
    }
*/

    // Преобразовать данные в массив объектов
    const values = Object.values(obj)
    const arr = [...values]

    //console.log(arr)
    return arr
}
