import React from 'react'
// Antd
import { Table, Tabs } from 'antd'
import { data, columns } from '../../config'
const { TabPane } = Tabs

export const TableComponent = props => {
    const { data } = props

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
        Object.keys(data['50']['nodes']).forEach(node => {
            allNodes[node] = ''
            const obj = {
                title: node,
                dataIndex: node,
                render(text) {
                    return {
                        props: {
                            className: text === ' ' ? 'color' : ''
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
                            console.log(event.currentTarget, rowIndex)
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
        data['50']['data'].forEach((period, index) => {
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
                        scroll={{ x: '10vw', y: '60vh' }}
                        size="small"
                        // Событие на строке
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: event => {
                                    console.log(event.currentTarget, rowIndex)
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

        data['50']['period'].forEach(
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
            <Tabs defaultActiveKey="1" type="card">
                {tabsWithTables}
            </Tabs>
        </>
    )
}

function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra)
}

/*


{
    
    50: {
        data: [
            [
                {
                    spot: 50,
                    model: '1kjkm',
                    inn: 123456789,
                    num: 123456,
                    ps: "",
                    mtbf: 12345,
                    nodes: {
                        1.02: {
                            time: '6,25',
                            amount: 17,
                            oneRepairTime: 0.12345,
                            percentOfAllNodes: 0.12,
                            repairComplexityNode: 10.8
                        },
                        1.03: {...},
                        2.1: {...}
                    },
                    sumAmount: 373,
                    sumTime: 100.42,
                    sumOneRepairTimeMechanic: 2.9964509025450203
                    sumOneRepairTimeElectric: 1.0087518207282913
                    lengthNodesMechanic: 9
                    lengthNodesElectric: 4
                    typeOfRepair: "medium"
                    mechanicRepairComplexity: 49
                    electricRepairComplexity: 51
                }
            ],
            [...],
            [...]
        ],
        allEquipment: 427
        filteredEquipment: 180
        middleCount: 92
        nodesCount: 88
        nodes: {1.03: {…}, 2.1: {…}, 1.1: {…}, 2.12: {…}, 1.08: {…}, …}
        sumAmountAllNodes: 2350
        sumTimeAllNodes: 583.1800000000002
        sumMechanicRepairComplexity: 4565.4
        sumElectricRepairComplexity: 7253.599999999998
        inPlanningPeriodMechanicRepairComplexity: 380.45,
        period: (12) ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Ию"]
    }
}



*/
