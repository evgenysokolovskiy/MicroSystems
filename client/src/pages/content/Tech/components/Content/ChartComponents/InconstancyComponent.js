import React, { PureComponent } from 'react'
import {
    ResponsiveContainer,
    ComposedChart,
    Line,
    Scatter,
    XAxis,
    YAxis,
    //CartesianGrid,
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
                key="inconstancy"
                stroke="#8884d8"
                strokeWidth={1}
                name="Непостоянство"
                isAnimationActive={false}
            >
                {/*<LabelList dataKey="inconstancy" position="top" />*/}
            </Line>,
            <Line
                type="monotone"
                dataKey="dimension"
                key="dimension"
                stroke="#82ca9d"
                strokeWidth={1}
                name="Разноразмерность"
                isAnimationActive={false}
            >
                {/*<LabelList dataKey="dimension" position="top" />*/}
            </Line>
        ]

        // Отображение текущего графика
        const current = [
            <Line
                type="linear"
                dataKey="factInconstancy"
                key="factInconstancy"
                legendType="none"
                stroke="#444"
                strokeWidth={1}
                connectNulls={true}
            />,
            <Scatter
                dataKey="factInconstancyTrue"
                key="factInconstancyTrue"
                name="Факт (норма)"
                stroke="#8884d8"
                strokeWidth={1}
                fill="lightgreen"
                isAnimationActive={false}
            >
                <LabelList dataKey="factInconstancyTrue" position="top" />
            </Scatter>,
            <Scatter
                dataKey="factInconstancyFalse"
                key="factInconstancyFalse"
                name="Факт (не норма)"
                stroke="#8884d8"
                strokeWidth={1}
                fill="lightcoral"
                isAnimationActive={false}
            >
                <LabelList dataKey="factInconstancyFalse" position="top" />
            </Scatter>,
            <Line
                type="linear"
                dataKey="factDimension"
                key="factDimension"
                legendType="none"
                stroke="#444"
                strokeWidth={1}
                connectNulls={true}
                isAnimationActive={false}
            />,
            <Scatter
                dataKey="factDimensionTrue"
                key="factDimensionTrue"
                legendType="none"
                stroke="#82ca9d"
                strokeWidth={1}
                fill="lightgreen"
                isAnimationActive={false}
            >
                <LabelList dataKey="factDimensionTrue" position="top" />
            </Scatter>,
            <Scatter
                dataKey="factDimensionFalse"
                key="factDimensionFalse"
                legendType="none"
                stroke="#82ca9d"
                strokeWidth={1}
                fill="lightcoral"
                isAnimationActive={false}
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
                    key={`factInconstancy${i}`}
                    legendType="none"
                    stroke="#444"
                    strokeWidth={1}
                    connectNulls={true}
                    isAnimationActive={false}
                />
            )
            const scatterInconstancyTrue = (
                <Scatter
                    dataKey={`factInconstancyTrue${i}`}
                    key={`factInconstancyTrue${i}`}
                    legendType="none"
                    stroke="#8884d8"
                    strokeWidth={1}
                    fill="lightgreen"
                    isAnimationActive={false}
                >
                    <LabelList dataKey={`factInconstancyTrue${i}`} position="bottom" />
                </Scatter>
            )
            const scatterInconstancyFalse = (
                <Scatter
                    dataKey={`factInconstancyFalse${i}`}
                    key={`factInconstancyFalse${i}`}
                    legendType="none"
                    stroke="#8884d8"
                    strokeWidth={1}
                    fill="lightcoral"
                    isAnimationActive={false}
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
                    key={`factDimension${i}`}
                    legendType="none"
                    stroke="#444"
                    strokeWidth={1}
                    connectNulls={true}
                    isAnimationActive={false}
                />
            )
            const scatterDimensionTrue = (
                <Scatter
                    dataKey={`factDimensionTrue${i}`}
                    key={`factDimensionTrue${i}`}
                    legendType="none"
                    stroke="#82ca9d"
                    strokeWidth={1}
                    fill="lightgreen"
                    isAnimationActive={false}
                >
                    <LabelList dataKey={`factDimensionTrue${i}`} position="bottom" />
                </Scatter>
            )
            const scatterDimensionFalse = (
                <Scatter
                    dataKey={`factDimensionFalse${i}`}
                    key={`factDimensionFalse${i}`}
                    legendType="none"
                    stroke="#82ca9d"
                    strokeWidth={1}
                    fill="lightcoral"
                    isAnimationActive={false}
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
