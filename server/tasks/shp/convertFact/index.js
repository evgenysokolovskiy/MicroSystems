// Преобразовать фактические данные

module.exports.convertFact = function({ fact }) {
    const { running, grinding, rough, clean, final } = fact

    const obj = {
        running: (() => convertDataFinal(running))(),
        grinding: (() => convertDataFinal(grinding))(),
        rough: (() => convertDataFinal(rough))(),
        clean: (() => convertDataFinal(clean))(),
        final: (() => convertDataFinal(final))()
    }
    return obj
}

module.exports.convertData = function(data, INDEXES) {
    let arr = []
    // Преобразовать объект в массив
    const indexes = [...Object.entries(INDEXES)]
    data.forEach(item => {
        if (!item[0]) return
        const obj = {}
        indexes.forEach(i => {
            const indexDate = i[0] === 'date' ? i[1] : null
            obj[i[0]] =
                typeof item[indexDate] === 'number' ? getDateFromText(item[indexDate]) : item[i[1]]
        })
        arr = [...arr, obj]
    })
    return arr
}

function getDateFromText(text) {
    // JSON -> UTC
    const d = new Date(1899, 12, text)
    // DD.MM.YYYY
    const yyyymmdd = `${d.getUTCDate()}.${d.getUTCMonth() + 1}.${d.getUTCFullYear()}`
    // add 0 (разбить массив на строки)
    const arr = yyyymmdd.split('.')
    // get str (добавить 0)
    const day = arr[0].padStart(2, '0')
    const month = arr[1].padStart(2, '0')
    const year = arr[2]

    return `${day}.${month}.${year}`
}

function convertDataFinal(data) {
    const obj = {}
    data &&
        Object.values(data).forEach(item => {
            if (obj[item['type']]) {
                obj[item['type']] = [...obj[item['type']], item]
            } else {
                obj[item['type']] = [item]
            }
        })
    return obj
}

/*
function converUTCDateToLocalDate(date) {
    let newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000)
    let offset = date.getTimezoneOffset() / 60
    let hours = date.getHours()
    newDate.setHours(hours - offset)
    return newDate
}
*/
