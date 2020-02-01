import React from 'react'
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts'


const data = [
  {
    name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
]


export const InfoEquipment = props => {
    const { data } = props

    console.log(data)



    return (
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#8884d8" />
        <Bar dataKey="uv" fill="#82ca9d" />
      </BarChart>
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