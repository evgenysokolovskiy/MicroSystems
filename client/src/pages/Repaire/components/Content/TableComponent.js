import React from 'react'
// Antd
import { Table } from 'antd'
import { data, columns } from '../../config'

function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra)
}

export const TableComponent = props => {
    const { data } = props

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

    let nodes = []
    let allNodes = {}
    if (data) {
        Object.keys(data['63']['nodes']).forEach(node => {
            allNodes[node] = ''
            const obj = {
                title: node,
                dataIndex: node,
                width: 65,
                filters: [
                    {
                        text: `Имеет неисправность ${node}`,
                        value: '+'
                    },
                    {
                        text: 'Нет данной неисправности',
                        value: ' '
                    }
                ],
                onFilter: (value, record) => record[node].indexOf(value) === 0
            }

            nodes = [...nodes, obj]
        })
    }

    column = [...column, ...nodes]

    let d = []
    if (data) {
        data['63']['data'][11].forEach((item, i) => {
            let obj = {
                key: i,
                idx: ++i,
                model: item['model'],
                num: item['num'],
                inn: item['inn'],
                typeOfRepair: (() => (item['typeOfRepair'] === 'medium' ? 'средний' : 'текущий'))(),
                ...allNodes
            }

            Object.keys(item['nodes']).forEach(node => {
                obj[node] = '+'
            })

            d = [...d, obj]
        })
    }

    //if (data) console.log(Object.keys(data['50']['nodes']), nodes)
    //console.log(d)

    return (
        <Table
            columns={column}
            dataSource={d}
            onChange={onChange}
            pagination={{ pageSize: 10 }}
            scroll={{ x: 1300 }}
            size="small"
        />
    )
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
