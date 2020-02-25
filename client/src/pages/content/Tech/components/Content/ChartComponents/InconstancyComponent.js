import React, { PureComponent } from 'react'
import { Table, Collapse } from 'antd'
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ReferenceLine,
    LabelList
} from 'recharts'

export default class InconstancyComponent extends PureComponent {
    render() {
        const {
            date,
            dataInconstancyDimension,
            CustomizedAxisTick,
            handleClick,
            getData
        } = this.props
        return (
            <ResponsiveContainer width="100%" aspect={2.7 / 1.0}>
                <LineChart
                    data={dataInconstancyDimension}
                    syncId="composedChart"
                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                    onClick={handleClick}
                >
                    <CartesianGrid stroke="#000" strokeWidth={0.5} />
                    <XAxis dataKey="date" tick={<CustomizedAxisTick />} />
                    <YAxis type="number" domain={['dataMin', 'dataMax']} scale="linear" />
                    <Tooltip content={getData} />
                    <ReferenceLine x={date} stroke="rgba(230,200,215,0.2)" strokeWidth={60} />
                    <ReferenceLine x={date} stroke="red" />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="inconstancy"
                        stroke="#8884d8"
                        strokeWidth={2}
                        name="Непостоянство"
                    >
                        <LabelList dataKey="inconstancy" position="top" />
                    </Line>
                    <Line
                        type="monotone"
                        dataKey="dimension"
                        stroke="#82ca9d"
                        strokeWidth={2}
                        name="Размерность"
                    >
                        <LabelList dataKey="dimension" position="top" />
                    </Line>
                </LineChart>
            </ResponsiveContainer>
        )
    }
}
