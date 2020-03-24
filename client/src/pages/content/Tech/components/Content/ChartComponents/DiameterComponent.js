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

const color = 'lightcoral'

export default class DiameterComponent extends PureComponent {
    render() {
        const {
            date,
            card,
            diameter,
            len,
            nameTotalTab,
            CustomizedAxisTick,
            handleClick,
            getData
        } = this.props

        let total = [],
            lines = [],
            scattersTrue = [],
            scattersFalse = []

        // Технология
        const technology = (
            <Area dataKey="norm" name="Норматив (min/max)" stroke="#222" type="linear" />
        )

        // Отображение текущего графика
        const current = [
            <Line
                type="linear"
                dataKey="fact"
                stroke="lightcoral"
                strokeWidth={2}
                connectNulls={true}
            />,
            <Scatter
                dataKey="trueFact"
                name="Факт (норма)"
                stroke="lightgreen"
                strokeWidth={2}
                fill="lightgreen"
            >
                <LabelList dataKey="trueFact" position="bottom" />
            </Scatter>,
            <Scatter
                dataKey="falseFact"
                name="Факт (не норма)"
                stroke="lightcoral"
                strokeWidth={2}
                fill="lightcoral"
            >
                <LabelList dataKey="falseFact" position="bottom" />
            </Scatter>
        ]

        // Отображение всех графиков
        for (let i = 0; i < len - 1; i++) {
            const line = (
                <Line
                    type="linear"
                    dataKey={`fact${i}`}
                    stroke={color}
                    strokeWidth={2}
                    connectNulls={true}
                />
            )
            const scatterTrue = (
                <Scatter
                    dataKey={`trueFact${i}`}
                    stroke="lightgreen"
                    strokeWidth={2}
                    fill="lightgreen"
                >
                    <LabelList dataKey={`trueFact${i}`} position="bottom" />
                </Scatter>
            )
            const scatterFalse = (
                <Scatter
                    dataKey={`falseFact${i}`}
                    stroke="lightcoral"
                    strokeWidth={2}
                    fill="lightcoral"
                >
                    <LabelList dataKey={`falseFact${i}`} position="bottom" />
                </Scatter>
            )
            lines = [...lines, line]
            scattersTrue = [...scattersTrue, scatterTrue]
            scattersFalse = [...scattersFalse, scatterFalse]

            total = [...lines, ...scattersTrue, scattersFalse]
        }

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
                    {technology}
                    {card === nameTotalTab ? total : current}
                    <XAxis dataKey="date" tick={<CustomizedAxisTick />} />
                    <YAxis
                        type="number"
                        domain={['dataMin', 'dataMax']}
                        scale="linear"
                        fill="#000"
                        fontSize={12}
                    />
                    {/*<CartesianGrid stroke="#000" strokeWidth={0.5} />*/}
                    <Tooltip content={getData} />
                    <ReferenceLine x={date} stroke="rgba(230,200,215,0.2)" strokeWidth={60} />
                    <ReferenceLine x={date} stroke="red" />
                </ComposedChart>
            </ResponsiveContainer>
        )
    }
}
