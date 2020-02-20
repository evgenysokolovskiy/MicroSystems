import React, { PureComponent } from 'react'
import { Table, Collapse } from 'antd'
import {
    ResponsiveContainer,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend,
    BarChart,
    Bar,
    LabelList
} from 'recharts'

export default class ChartComponent extends PureComponent {
    render() {
        const { date, datapPessureSpeed, CustomizedAxisTick } = this.props
        return (
            <ResponsiveContainer width="100%" aspect={2.7 / 1.0}>
                <BarChart data={datapPessureSpeed} syncId="composedChart">
                    <CartesianGrid stroke="#000" strokeWidth={0.2} />
                    <XAxis dataKey="date" tick={<CustomizedAxisTick />} />
                    <YAxis type="number" domain={['dataMin', 'dataMax']} scale="linear" />
                    <Legend />
                    <Bar dataKey="pressure" stackId="a" fill="#8884d8" name="Давление">
                        <LabelList dataKey="pressure" position="middle" />
                    </Bar>
                    <Bar dataKey="speed" stackId="a" fill="#82ca9d" name="Скорость">
                        <LabelList dataKey="speed" position="top" />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        )
    }
}
