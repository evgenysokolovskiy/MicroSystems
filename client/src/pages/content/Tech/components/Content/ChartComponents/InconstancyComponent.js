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

export default class InconstancyComponent extends PureComponent {
    render() {
        const {
            date,
            inconstancyDimension,
            card,
            len,
            nameTotalTab,
            CustomizedAxisTick,
            handleClick,
            getData
        } = this.props

        let total = [],
            linesInconstancy = [],
            scattersInconstancyTrue = [],
            scattersInconstancyFalse = [],
            linesDimension = [],
            scattersDimensionTrue = [],
            scattersDimensionFalse = []

        // Технология
        const technology = [
            <Line
                type="monotone"
                dataKey="inconstancy"
                stroke="#8884d8"
                strokeWidth={2}
                name="Непостоянство"
            >
                {/*<LabelList dataKey="inconstancy" position="top" />*/}
            </Line>,
            <Line
                type="monotone"
                dataKey="dimension"
                stroke="#82ca9d"
                strokeWidth={2}
                name="Разноразмерность"
            >
                {/*<LabelList dataKey="dimension" position="top" />*/}
            </Line>
        ]

        // Отображение текущего графика
        const current = [
            <Line
                type="linear"
                dataKey="factInconstancy"
                legendType="none"
                stroke="lightcoral"
                strokeWidth={2}
                connectNulls={true}
            />,
            <Scatter
                dataKey="factInconstancyTrue"
                name="Факт (норма)"
                stroke="#8884d8"
                strokeWidth={2}
                fill="lightgreen"
            >
                <LabelList dataKey="factInconstancyTrue" position="top" />
            </Scatter>,
            <Scatter
                dataKey="factInconstancyFalse"
                name="Факт (не норма)"
                stroke="#8884d8"
                strokeWidth={2}
                fill="lightcoral"
            >
                <LabelList dataKey="factInconstancyFalse" position="top" />
            </Scatter>,
            <Line
                type="linear"
                dataKey="factDimension"
                legendType="none"
                stroke="lightcoral"
                strokeWidth={2}
                connectNulls={true}
            />,
            <Scatter
                dataKey="factDimensionTrue"
                legendType="none"
                stroke="#82ca9d"
                strokeWidth={2}
                fill="lightgreen"
            >
                <LabelList dataKey="factDimensionTrue" position="top" />
            </Scatter>,
            <Scatter
                dataKey="factDimensionFalse"
                legendType="none"
                stroke="#82ca9d"
                strokeWidth={2}
                fill="lightcoral"
            >
                <LabelList dataKey="factDimensionFalse" position="top" />
            </Scatter>
        ]

        // Отображение всех графиков
        for (let i = 0; i < len - 1; i++) {
            const lineInconstancy = (
                <Line
                    type="linear"
                    dataKey={`factInconstancy${i}`}
                    legendType="none"
                    stroke="lightcoral"
                    strokeWidth={2}
                    connectNulls={true}
                />
            )
            const scatterInconstancyTrue = (
                <Scatter
                    dataKey={`factInconstancyTrue${i}`}
                    legendType="none"
                    stroke="#8884d8"
                    strokeWidth={2}
                    fill="lightgreen"
                >
                    <LabelList dataKey={`factInconstancyTrue${i}`} position="bottom" />
                </Scatter>
            )
            const scatterInconstancyFalse = (
                <Scatter
                    dataKey={`factInconstancyFalse${i}`}
                    legendType="none"
                    stroke="#8884d8"
                    strokeWidth={2}
                    fill="lightcoral"
                >
                    <LabelList dataKey={`factInconstancyFalse${i}`} position="bottom" />
                </Scatter>
            )
            linesInconstancy = [...linesInconstancy, lineInconstancy]
            scattersInconstancyTrue = [...scattersInconstancyTrue, scatterInconstancyTrue]
            scattersInconstancyFalse = [...scattersInconstancyFalse, scatterInconstancyFalse]

            const lineDimension = (
                <Line
                    type="linear"
                    dataKey={`factDimension${i}`}
                    legendType="none"
                    stroke="lightcoral"
                    strokeWidth={2}
                    connectNulls={true}
                />
            )
            const scatterDimensionTrue = (
                <Scatter
                    dataKey={`factDimensionTrue${i}`}
                    legendType="none"
                    stroke="#82ca9d"
                    strokeWidth={2}
                    fill="lightgreen"
                >
                    <LabelList dataKey={`factDimensionTrue${i}`} position="bottom" />
                </Scatter>
            )
            const scatterDimensionFalse = (
                <Scatter
                    dataKey={`factDimensionFalse${i}`}
                    legendType="none"
                    stroke="#82ca9d"
                    strokeWidth={2}
                    fill="lightcoral"
                >
                    <LabelList dataKey={`factDimensionFalse${i}`} position="bottom" />
                </Scatter>
            )
            linesDimension = [...linesDimension, lineDimension]
            scattersDimensionTrue = [...scattersDimensionTrue, scatterDimensionTrue]
            scattersDimensionFalse = [...scattersDimensionFalse, scatterDimensionFalse]

            total = [
                ...linesDimension,
                ...scattersInconstancyTrue,
                scatterInconstancyFalse,
                ...linesDimension,
                scattersDimensionTrue,
                ...scattersDimensionFalse
            ]
        }

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
                    <Legend wrapperStyle={{ paddingTop: '60px' }} />
                </ComposedChart>
            </ResponsiveContainer>
        )
    }
}
