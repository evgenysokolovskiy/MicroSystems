import React, { PureComponent } from 'react'
import {
    ResponsiveContainer,
    ComposedChart,
    Area,
    Line,
    Scatter,
    XAxis,
    YAxis,
    //CartesianGrid,
    Tooltip,
    ReferenceLine,
    LabelList
} from 'recharts'

import { Icon } from 'antd'
const color = 'lightcoral'

export default class DiameterComponent extends PureComponent {
    render() {
        const {
            card,
            nameTotalTab,
            len,
            date,
            diameter,
            handleClick,
            CustomizedAxisTick,
            getData
        } = this.props
        let component = [],
            lines = [],
            line,
            scattersTrue = [],
            scattersFalse = [],
            scatterTrue,
            scatterFalse

        if (card === nameTotalTab) {
            for (let i = 0; i < len - 1; i++) {
                line = (
                    <Line
                        type="linear"
                        key={`fact${i}`}
                        dataKey={`fact${i}`}
                        stroke={'#444'}
                        strokeWidth={1}
                        connectNulls={true}
                        isAnimationActive={false}
                    />
                )
                scatterTrue = (
                    <Scatter
                        dataKey={`trueFact${i}`}
                        key={`trueFact${i}`}
                        stroke="lightgreen"
                        strokeWidth={1}
                        fill="lightgreen"
                        isAnimationActive={false}
                    >
                        <LabelList dataKey={`trueFact${i}`} position="bottom" />
                    </Scatter>
                )
                scatterFalse = (
                    <Scatter
                        dataKey={`falseFact${i}`}
                        key={`falseFact${i}`}
                        stroke="lightcoral"
                        strokeWidth={1}
                        line
                        fill="lightcoral"
                        isAnimationActive={false}
                    >
                        <LabelList dataKey={`falseFact${i}`} position="bottom" />
                    </Scatter>
                )
                lines = [...lines, line]
                scattersTrue = [...scattersTrue, scatterTrue]
                scattersFalse = [...scattersFalse, scatterFalse]

                component = [...lines, ...scattersTrue, scattersFalse]
            }
        } else {
            component = [
                <Line
                    type="linear"
                    dataKey="fact"
                    key="fact"
                    stroke="#444"
                    strokeWidth={1}
                    connectNulls={true}
                    isAnimationActive={false}
                />,
                <Scatter
                    dataKey="trueFact"
                    key="trueFact"
                    name="Факт (норма)"
                    stroke="lightgreen"
                    strokeWidth={1}
                    fill="lightgreen"
                    isAnimationActive={false}
                >
                    <LabelList dataKey="trueFact" position="bottom" />
                </Scatter>,
                <Scatter
                    dataKey="falseFact"
                    key="falseFact"
                    name="Факт (не норма)"
                    stroke="lightcoral"
                    strokeWidth={1}
                    fill="lightcoral"
                    isAnimationActive={false}
                >
                    <LabelList dataKey="falseFact" position="bottom" />
                </Scatter>
            ]
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
                    const technology = (
                    <Area
                        dataKey="norm"
                        name="Норматив (min/max)"
                        stroke="#222"
                        type="linear"
                        isAnimationActive={false}
                    />
                    )
                    {component ? (
                        component
                    ) : (
                        <Icon
                            type="loading"
                            className="loading"
                            style={{ fontSize: '20px', color: 'red' }}
                        />
                    )}
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
