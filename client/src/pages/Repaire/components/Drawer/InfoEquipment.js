import React from 'react'
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from 'recharts'

export const InfoEquipment = props => {
    const { data, visible } = props
    let d = []

    visible &&
        Object.entries(data['nodes']).forEach(node => {
            // Дробное значение времени в исходной таблице excel предоставляется с запятой, имеет тип строки
            // Необходимо преобразовать к числу с плавающей точкой
            // Для натуральных чисел преобразование не требуется
            let time
            const nodeTime = node[1]['time']
            typeof nodeTime === 'string' ? (time = +nodeTime.replace(',', '.')) : (time = +nodeTime)

            const obj = {
                name: node[0],
                uv: +node[1]['amount'],
                pv: time
            }
            d = [...d, obj]
        })

    return (
        <ResponsiveContainer width="90%" aspect={4.0 / 3.0}>
            <BarChart
                data={d}
                margin={{
                    top: 5,
                    right: 10,
                    left: 10,
                    bottom: 5
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#8884d8" name="Время остановок" />
                <Bar dataKey="uv" fill="#82ca9d" name="Количество остановок" />
            </BarChart>
        </ResponsiveContainer>
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
