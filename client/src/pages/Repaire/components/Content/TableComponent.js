import React from 'react'
// Antd
import { Table } from 'antd'
import { data, columns } from '../../config'

function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra)
}

export const TableComponent = props => {
    const { data } = props
    console.log(data)
    return <Table columns={columns} /*dataSource={data}*/ onChange={onChange} />
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
