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
        const { date, dataPressureSpeed, CustomizedAxisTick } = this.props
        return (
            <ResponsiveContainer width="100%" aspect={2.7 / 1.0}>
                <BarChart 
                    data={dataPressureSpeed} 
                    syncId="composedChart"
                    margin={{
                        top: 0, right: 20, left: 10, bottom: 40,
                    }}
                    >
                    <CartesianGrid stroke="#000" strokeWidth={0.5} />
                    <XAxis dataKey="date" tick={<CustomizedAxisTick />} />
                    <YAxis type="number" domain={['dataMin', 'dataMax']} scale="linear" fill="#000" fontSize={12} />
                    <Legend wrapperStyle={{ paddingTop: '60px' }} />
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
