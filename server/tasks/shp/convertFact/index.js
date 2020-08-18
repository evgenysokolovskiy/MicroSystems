// Преобразовать фактические данные

module.exports.convertFact = function ({ fact }) {
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

module.exports.convertData = function ({ data, INDEXES, mtime, period }) {
    let arr = []
    // Преобразовать объект в массив
    const indexes = [...Object.entries(INDEXES)]

    data.forEach((item) => {
        // Фильтрация: нет даты и если дата раньше установленной даты
        if (!item[0]) return
        if (
            new Date(getDateFromText(item[0]).split('.').reverse().join('.')).getTime() <
            mtime - period
        )
            return

        const obj = {}
        indexes.forEach((i) => {
            const indexDate = i[0] === 'date' ? i[1] : null
            obj[i[0]] =
                typeof item[indexDate] === 'number' ? getDateFromText(item[indexDate]) : item[i[1]]
        })
        arr = [...arr, obj]
    })

    const batchLoadingTimeArr = arr.map((item) => {
        item['batchLoadingTime'] = ExcelDateToJSDate(item['batchLoadingTime'])
        return item
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

// Преобразовать время (в виде дробного числа из excel) в формат 13:00
function ExcelDateToJSDate(serial) {
    const fractional_day = serial - Math.floor(serial) + 0.0000001
    let total_seconds = Math.floor(86400 * fractional_day)
    const seconds = total_seconds % 60
    total_seconds -= seconds
    const hours = Math.floor(total_seconds / (60 * 60))
    const minutes = Math.floor(total_seconds / 60) % 60
    return `${hours}:${minutes}`
}

function convertDataFinal(data) {
    const obj = {}
    data &&
        Object.values(data).forEach((item) => {
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
