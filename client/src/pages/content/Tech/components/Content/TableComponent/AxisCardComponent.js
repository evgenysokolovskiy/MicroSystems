import React, { PureComponent } from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, ReferenceLine } from 'recharts'

const data = [
    { name: 'a', foo: [-10, 10] },
    { name: 'b', foo: [-4, 8] },
    { name: 'c', foo: [0, 9] },
    { name: 'd', foo: [2, 15] }
]

export default class AxisCardComponent extends PureComponent {
    render() {
        return (
            <ResponsiveContainer width="100%" aspect={10.0 / 1.0}>
                <BarChart data={data} layout="vertical">
                    <XAxis type="number" />
                    <YAxis type="category" />
                    <Bar background label dataKey="foo" fill="#8884d8" />
                    <ReferenceLine x={0} stroke="rgba(230,200,215,0.2)" strokeWidth={60} />
                    <ReferenceLine x={0} stroke="red" />
                </BarChart>
            </ResponsiveContainer>
        )
    }
}
