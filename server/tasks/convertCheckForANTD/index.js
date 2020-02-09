// Преобразовать исходные данные для построения таблицы в ANTD Design на клиенте

module.exports = function(data) {
    let columns = []
    let dataSource = []
    data.forEach(item => {
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
                    obj[columns[y]['dataIndex']] = text
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
