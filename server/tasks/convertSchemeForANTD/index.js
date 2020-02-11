// Преобразовать исходные данные для построения таблицы в ANTD Design формат

module.exports = function(data) {
    let columns = []
    let dataSource = []

    for (let i = 0; i < data[0].length; i++) {
        columns = [
            ...columns,
            {
                title: i,
                dataIndex: i,
                key: i
            }
        ]

        const obj = { key: i }
        for (let j = 0; j < data[0][i].length; j++) {
            obj[j] = data[0][i][j]
        }

        dataSource = [...dataSource, obj]
    }

    return { columns, dataSource }
}
