import React, { PureComponent } from 'react'
import {
    ResponsiveContainer,
    ComposedChart,
    Area,
    Line,
    Scatter,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ReferenceLine,
    LabelList
} from 'recharts'

export default class DiameterComponent extends PureComponent {
    render() {
        const { date, diameter, CustomizedAxisTick, handleClick, getData } = this.props
        return (
            <ResponsiveContainer width="100%" aspect={2.7 / 1.0}>
                <ComposedChart
                    data={diameter}
                    syncId="composedChart"
                    margin={{
                        top: 0,
                        right: 20,
                        left: 10,
                        bottom: 40
                    }}
                    onClick={handleClick}
                >
                    <XAxis dataKey="date" tick={<CustomizedAxisTick />} />
                    <YAxis
                        type="number"
                        domain={['dataMin', 'dataMax']}
                        scale="linear"
                        fill="#000"
                        fontSize={12}
                    />
                    <Area dataKey="norm" name="Норматив (min/max)" stroke="#222" type="linear" />
                    <CartesianGrid stroke="#000" strokeWidth={0.5} />
                    <Tooltip content={getData} />

                    <ReferenceLine x={date} stroke="rgba(230,200,215,0.2)" strokeWidth={60} />
                    <ReferenceLine x={date} stroke="red" />
                    <Line
                        type="linear"
                        dataKey="fact"
                        stroke="lightcoral"
                        strokeWidth={2}
                        connectNulls={true}
                    />
                    <Scatter
                        dataKey="trueFact"
                        name="Факт (норма)"
                        stroke="lightgreen"
                        strokeWidth={2}
                        fill="lightgreen"
                    >
                        <LabelList dataKey="trueFact" position="top" />
                    </Scatter>
                    <Scatter
                        dataKey="falseFact"
                        name="Факт (не норма)"
                        stroke="lightcoral"
                        strokeWidth={2}
                        fill="lightcoral"
                    >
                        <LabelList dataKey="falseFact" position="top" />
                    </Scatter>
                </ComposedChart>
            </ResponsiveContainer>
        )
    }
}
