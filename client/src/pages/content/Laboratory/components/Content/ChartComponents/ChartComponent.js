import React, { PureComponent } from 'react'
import { Icon } from 'antd'
import {
    ResponsiveContainer,
    ComposedChart,
    Area,
    Scatter,
    Line,
    LabelList,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from 'recharts'

export default class DiameterComponent extends PureComponent {
    render() {
        const { source, CustomizedAxisTick } = this.props

        const obj = {}
        source.forEach(item => {
            const fact =
                obj[item['date']] && obj[item['date']]['fact']
                    ? [...obj[item['date']]['fact'], item['fact']]
                    : [item['fact']]
            const technology = item['technology']
            const date = item['date']
            obj[item['date']] = { date, technology, fact }
        })

        const arr = Object.values(obj)

        arr.forEach(item => {
            item['fact'].forEach((fact, i) => {
                item[`fact${i}`] = fact
            })
            return item
        })

        let maxLenFact = 0
        arr.forEach(item => {
            if (item['fact'].length > maxLenFact) maxLenFact = item['fact'].length
            return maxLenFact
        })

        let components
        arr.forEach(item => {
            components = []
            for (let i = 0; i < item['fact'] + 1; i++) {
                components = [
                    ...components,
                    <Scatter
                        dataKey={`fact${i}`}
                        key={`fact${i}`}
                        name="Факт"
                        stroke="#444"
                        strokeWidth={1}
                        line
                        fill="#444"
                        isAnimationActive={false}
                    >
                        <LabelList dataKey={`fact${i}`} position="bottom" />
                    </Scatter>
                ]
            }
        })

        return (
            <ResponsiveContainer width="100%" height="auto" aspect={2.7 / 1.0}>
                <ComposedChart
                    data={arr}
                    margin={{
                        top: 0,
                        right: 20,
                        left: 10,
                        bottom: 40
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="date"
                        tick={<CustomizedAxisTick />}
                        allowDuplicatedCategory={false}
                    />
                    <YAxis
                        type="number"
                        domain={['dataMin', 'dataMax']}
                        scale="linear"
                        fill="#000"
                        fontSize={12}
                    />
                    <Area
                        type="monotone"
                        dataKey="technology"
                        stroke="lightblue"
                        fill="lightblue"
                        isAnimationActive={false}
                    />
                    {components ? (
                        components
                    ) : (
                        <Icon
                            type="loading"
                            className="loading"
                            style={{ fontSize: '20px', color: 'red' }}
                        />
                    )}
                </ComposedChart>
            </ResponsiveContainer>
        )
    }
}
