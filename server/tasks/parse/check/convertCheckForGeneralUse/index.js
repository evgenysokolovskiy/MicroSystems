// Получить данные для общего использования

const num = 'Цеховой номер'

module.exports = function(source, name) {
    let data = {}
    // Индекс цехового номера в массиве
    const indexNum = source[0].indexOf(num)

    for (let i = 1; i < source.length; i++) {
        if (!source[i].length) continue
        const obj = {}
        for (let j = 0; j < source[i].length; j++) {
            if (j !== indexNum) obj[source[0][j]] = source[i][j]
        }

        data[source[i][indexNum]] = obj
    }
    return data
}
