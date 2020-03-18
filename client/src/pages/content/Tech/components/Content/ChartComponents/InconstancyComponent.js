import React, { PureComponent } from 'react'
import { Table, Collapse } from 'antd'
import {
    ResponsiveContainer,
    ComposedChart,
    LineChart,
    Line,
    Scatter,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ReferenceLine,
    LabelList
} from 'recharts'

const renderLabel = function(entry) {
    return entry.name
}
export default class InconstancyComponent extends PureComponent {
    render() {
        const { date, inconstancyDimension, CustomizedAxisTick, handleClick, getData } = this.props

        return (
            <ResponsiveContainer width="100%" aspect={2.7 / 1.0}>
                <ComposedChart
                    data={inconstancyDimension}
                    syncId="composedChart"
                    margin={{
                        top: 0,
                        right: 20,
                        left: 10,
                        bottom: 40
                    }}
                    onClick={handleClick}
                >
                    <CartesianGrid stroke="#000" strokeWidth={0.5} />
                    <XAxis dataKey="date" tick={<CustomizedAxisTick />} />
                    <YAxis
                        type="number"
                        domain={['dataMin', 'dataMax']}
                        scale="linear"
                        fill="#000"
                        fontSize={12}
                    />
                    <Tooltip content={getData} />
                    <ReferenceLine x={date} stroke="rgba(230,200,215,0.2)" strokeWidth={60} />
                    <ReferenceLine x={date} stroke="red" />
                    <Legend wrapperStyle={{ paddingTop: '60px' }} />
                    <Line
                        type="monotone"
                        dataKey="inconstancy"
                        stroke="#8884d8"
                        strokeWidth={2}
                        name="Непостоянство"
                    >
                        {/*<LabelList dataKey="inconstancy" position="top" />*/}
                    </Line>
                    <Line
                        type="monotone"
                        dataKey="dimension"
                        stroke="#82ca9d"
                        strokeWidth={2}
                        name="Разноразмерность"
                    >
                        {/*<LabelList dataKey="dimension" position="top" />*/}
                    </Line>

                    <Line
                        type="linear"
                        dataKey="factInconstancy"
                        legendType="none"
                        stroke="#8884d8"
                        strokeWidth={2}
                        strokeDasharray="15 15"
                        connectNulls={true}
                    />

                    <Scatter
                        dataKey="factInconstancyTrue"
                        name="Факт (норма)"
                        stroke="lightgreen"
                        strokeWidth={2}
                        fill="lightgreen"
                    >
                        <LabelList dataKey="factInconstancyTrue" position="top" />
                    </Scatter>
                    <Scatter
                        dataKey="factInconstancyFalse"
                        name="Факт (не норма)"
                        stroke="lightcoral"
                        strokeWidth={2}
                        fill="lightcoral"
                    >
                        <LabelList dataKey="factInconstancyFalse" position="top" />
                    </Scatter>

                    <Line
                        type="linear"
                        dataKey="factDimension"
                        legendType="none"
                        stroke="#82ca9d"
                        strokeWidth={2}
                        strokeDasharray="15 15"
                        connectNulls={true}
                    />
                    <Scatter
                        dataKey="factDimensionTrue"
                        legendType="none"
                        stroke="lightgreen"
                        strokeWidth={2}
                        fill="lightgreen"
                    >
                        <LabelList dataKey="factDimensionTrue" position="top" />
                    </Scatter>
                    <Scatter
                        dataKey="factDimensionFalse"
                        legendType="none"
                        stroke="lightcoral"
                        strokeWidth={2}
                        fill="lightcoral"
                    >
                        <LabelList dataKey="factDimensionFalse" position="top" />
                    </Scatter>
                </ComposedChart>
            </ResponsiveContainer>
        )
    }
}
