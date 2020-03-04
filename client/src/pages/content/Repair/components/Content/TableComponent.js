import React from 'react'
// Antd
import { Table, Tabs, Icon, Spin } from 'antd'

const { TabPane } = Tabs

export default function(props) {
    const { data, handleClickRow, handleClickOpenDrawer } = props
    // Найти 'column'
    // Исходный вид
    let column = [
        {
            title: '№ п/п',
            dataIndex: 'idx',
            width: 60,
            fixed: 'left'
        },
        {
            title: 'Модель',
            dataIndex: 'model',
            width: 150,
            fixed: 'left',
            onFilter: (value, record) => record.model.indexOf(value) === 0,
            sorter: (a, b) => a.model.length - b.model.length,
            sortDirections: ['descend']
        },
        {
            title: 'Цех. №',
            dataIndex: 'num',
            width: 80,
            fixed: 'left',
            sorter: (a, b) => a.num - b.num,
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Инв. №',
            dataIndex: 'inn',
            render: text => {
                return {
                    children: text,
                    props: {
                        inn: text
                    }
                }
            },

            width: 90,
            fixed: 'left',
            sorter: (a, b) => a.inn - b.inn,
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Вид',
            dataIndex: 'typeOfRepair',
            width: 90,
            fixed: 'left',
            sorter: (a, b) => a.typeOfRepair - b.typeOfRepair,
            sortDirections: ['descend', 'ascend']
        }
    ]

    // Добавить узлы
    let nodes = []
    let allNodes = {}
    if (data) {
        Object.keys(data['nodes']).forEach(node => {
            allNodes[node] = ''
            const obj = {
                title: node,
                dataIndex: node,
                render(text) {
                    return {
                        props: {
                            className: text === ' ' ? 'false' : ''
                        },
                        children: text
                    }
                },
                width: 65,
                filters: [
                    {
                        text: `Имеет неисправность ${node}`,
                        value: ' '
                    },
                    {
                        text: 'Нет данной неисправности',
                        value: ''
                    }
                ],
                // Фильтровать данные
                onFilter: (value, record) => record[node].indexOf(value) === 0,
                // Событие на ячейке
                onCell: (record, rowIndex) => {
                    return {
                        onClick: event => {
                            //console.log(event.currentTarget, rowIndex)
                        }, // click row
                        onDoubleClick: event => {}, // double click row
                        onContextMenu: event => {}, // right button click row
                        onMouseEnter: event => {}, // mouse enter row
                        onMouseLeave: event => {} // mouse leave row
                    }
                }
            }

            nodes = [...nodes, obj]
        })
    }

    column = [...column, ...nodes]

    let tabsWithTables = [] // Компонент для рендеринга

    if (data) {
        // Для каждого периода времени строится своя таблица
        // Далее соотносится с Tabs
        let tables = []
        data['data'].forEach(period => {
            // Найти 'dataSource'
            let dataSource = []
            period.forEach((item, i) => {
                const obj = {
                    key: i,
                    idx: ++i,
                    model: item['model'],
                    num: item['num'],
                    inn: item['inn'],
                    typeOfRepair: (() =>
                        item['typeOfRepair'] === 'medium' ? 'средний' : 'текущий')(),
                    ...allNodes
                }

                Object.keys(item['nodes']).forEach(node => {
                    obj[node] = ' '
                })

                dataSource = [...dataSource, obj]
            })

            // * Построить таблицу на основе column и datasource
            const table = (
                <>
                    <Table
                        columns={column}
                        dataSource={dataSource}
                        bordered
                        onChange={onChange}
                        pagination={false}
                        scroll={{ x: 'max-content', y: '80vh' }}
                        size="small"
                        // Событие на строке
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: event => {
                                    handleClickOpenDrawer()
                                    //console.log(event.currentTarget, rowIndex)
                                    const arr = [...event.currentTarget.children]
                                    arr.forEach(
                                        item =>
                                            item.hasAttribute('inn') &&
                                            handleClickRow(item.getAttribute('inn'))
                                    )
                                }, // click row
                                onDoubleClick: event => {}, // double click row
                                onContextMenu: event => {}, // right button click row
                                onMouseEnter: event => {}, // mouse enter row
                                onMouseLeave: event => {} // mouse leave row
                            }
                        }}
                    />
                </>
            )
            tables = [...tables, table]
        })

        data['period'].forEach(
            (item, i) =>
                (tabsWithTables = [
                    ...tabsWithTables,
                    <TabPane tab={item} key={i}>
                        {tables[i]}
                    </TabPane>
                ])
        )

        tabsWithTables = [...tabsWithTables]
    }

    return (
        <>
            <div>
                <Tabs defaultActiveKey="2" type="card">
                    {tabsWithTables}
                </Tabs>
            </div>
        </>
    )
}

function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra)
}
