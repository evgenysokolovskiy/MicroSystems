// Преобразовать исходные данные для построения таблицы в ANTD Design на клиенте

module.exports = function (data) {
    let columns = []
    let dataSource = []
    data.forEach((item) => {
        item.forEach((arr, i) => {
            if (!arr.length) return

            let obj = { key: i }
            arr.forEach((text, y) => {
                if (i === 0) {
                    const converted = converString(text)
                    columns = [
                        ...columns,
                        {
                            title: text,
                            dataIndex: converted,
                            key: converted
                        }
                    ]
                } else {
                    obj[columns[y]['dataIndex']] =
                        typeof text === 'number' ? getDateFromText(text) : text
                }
            })

            dataSource = [...dataSource, obj]
        })
    })

    dataSource.splice(0, 1) // Удалить первый пустой объект в массиве
    return { columns, dataSource }
}

function converString(str) {
    const text = [...str]
    return text.reduce((accumulator, current) => {
        return accumulator + String(current.charCodeAt())
    }, 0)
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
    // split str
    return `${day}.${month}.${year}`
}
