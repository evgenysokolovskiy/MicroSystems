const clonedeep = require('lodash.clonedeep')

module.exports = function(s) {
    const source = clonedeep(s)
    let obj = {}

    Object.entries(source).forEach(param => {
        obj = {...obj, [param[0]]: {}}

        Object.entries(param[1]).forEach(prop => {
            obj[param[0]] = {
                ...obj[param[0]],
                [prop[0]]: {}
            }

            Object.entries(prop[1]).forEach(equip => {
                obj[param[0]][prop[0]][equip[0]] = equip[1].reverse()[0]
            })
        })
    })

    return obj
}
