// Преобразовать исходные данные для построения таблицы в ANTD Design формат

module.exports = function (data) {
    let columns = []
    let dataSource = []

    data.forEach((spot, i) => {
        columns = []
        const obj = { key: i }
        spot.forEach((item, j) => {
            obj[j] = item

            columns = [
                ...columns,
                {
                    title: j,
                    dataIndex: j,
                    key: j
                }
            ]
        })

        dataSource = [...dataSource, obj]
    })

    return { columns, dataSource }
}
