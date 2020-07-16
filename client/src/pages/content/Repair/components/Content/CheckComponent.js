import React from 'react'
// Antd
import { Table } from 'antd'

export default function (props) {
    const { checkForAntd } = props

    let columns = checkForAntd['columns']
    let dataSource = checkForAntd['dataSource']

    // Добавить сортировку, фильтрацию для колонок
    const addColumns = columns.map((item) => {
        item.title === 'Дата проверки' && sorter(item)
        item.title === 'Цеховой номер' && sorter(item)
        if (item.title === 'Работает/ не работает') item = filter(item)
        if (item.title === 'Неиспользуемое оборудование') item = filter(item)
        if (item.title === 'Течи масла (СОЖ)') item = filter(item)

        return item
    })

    return (
        <>
            <Table
                columns={addColumns}
                dataSource={dataSource}
                pagination={false}
                scroll={{ x: '10vw', y: '80vh' }}
                size="small"
                bordered
            />
        </>
    )
}

// Функция сортировки
function sorter(item, dataIndex = item['dataIndex']) {
    item['sorter'] = (a, b) => a[dataIndex] - b[dataIndex]
    item['sortDirections'] = ['descend', 'ascend']
}

// Функция фильтрации
function filter(item, dataIndex = item['dataIndex']) {
    const filter = {
        render(text) {
            return {
                props: {
                    className:
                        text !== '+' ? '' : item['title'] === 'Течи масла (СОЖ)' ? 'false' : 'info'
                },
                children: text === '+' ? ' ' : ''
            }
        },
        filters: [
            {
                text: '+',
                value: '+'
            }
        ],
        onFilter: (value, record) => record[dataIndex] && record[dataIndex].indexOf(value) === 0
    }

    return { ...item, ...filter }
}
