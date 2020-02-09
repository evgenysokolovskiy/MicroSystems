import React from 'react'
// Antd
import { Table } from 'antd'

export default function(props) {
    const { check } = props

    let columns = check['columns']
    let dataSource = check['dataSource']

    const addColumns = columns.map(item => {
        if (item.title === 'Дата проверки') {
            const dataIndex = item['dataIndex']
            item['sorter'] = (a, b) => a[dataIndex] - b[dataIndex]
            item['sortDirections'] = ['descend', 'ascend']
        }

        if (item.title === 'Цеховой номер') {
            const dataIndex = item['dataIndex']
            item['sorter'] = (a, b) => a[dataIndex] - b[dataIndex]
            item['sortDirections'] = ['descend', 'ascend']
        }

        if (item.title === 'Работает/ не работает') {
            const dataIndex = item['dataIndex']
            item['filters'] = [
                {
                    text: '+',
                    value: '+'
                }
            ]
            item['onFilter'] = (value, record) => record[dataIndex].indexOf(value) === 0
        }

        if (item.title === 'Течи масла (СОЖ)') {
            const dataIndex = item['dataIndex']

            const filter = {
                render(text) {
                    return {
                        props: {
                            className: text === '+' ? 'color' : ''
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
                onFilter: (value, record) => record[dataIndex].indexOf(value) === 0
            }

            item = { ...item, ...filter }
        }

        return item
    })

    if (check) {
    }

    return (
        <>
            <Table columns={addColumns} dataSource={dataSource} bordered />
        </>
    )
}
