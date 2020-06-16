import React, { PureComponent } from 'react'
import { Icon } from 'antd'
import {
    ResponsiveContainer,
    ComposedChart,
    Area,
    Scatter,
    Line,
    LabelList,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from 'recharts'

export default class DiameterComponent extends PureComponent {
    render() {
        const { source, CustomizedAxisTick } = this.props

        const obj = {}
        source.forEach(item => {
            const fact =
                obj[item['date']] && obj[item['date']]['fact']
                    ? [...obj[item['date']]['fact'], item['fact']]
                    : [item['fact']]

            const technology = item['technology']
            const date = item['date']
            obj[item['date']] = { date, technology, fact }
        })

        const arr = Object.values(obj)

        arr.forEach(item => {
            const min = +item['technology'][0]
            const max = +item['technology'][1]

            item['fact'].forEach((fact, i) => {
                item[`fact${i}`] = fact

                if (fact >= min && fact <= max) {
                    item[`trueFact${i}`] = fact
                } else {
                    item[`falseFact${i}`] = fact
                }
            })
            return item
        })

        let maxLenFact = 0
        arr.forEach(item => {
            if (item['fact'].length > maxLenFact) maxLenFact = item['fact'].length
            return maxLenFact
        })

        let components = [],
            scattersTrue = [],
            scattersFalse = [],
            lines = []
        arr.forEach(item => {
            const min = +item['technology'][0]
            const max = +item['technology'][1]

            for (let i = 0; i < item['fact'].length - 1; i++) {
                lines = [
                    ...lines,
                    <Line
                        type="linear"
                        key={`fact${i}`}
                        dataKey={`fact${i}`}
                        stroke={'#444'}
                        strokeWidth={0.5}
                        connectNulls={true}
                        isAnimationActive={false}
                    />
                ]

                scattersTrue = [
                    ...scattersTrue,
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
                ]

                scattersFalse = [
                    ...scattersFalse,
                    <Scatter
                        dataKey={`falseFact${i}`}
                        key={`falseFact${i}`}
                        stroke="lightcoral"
                        strokeWidth={1}
                        fill="lightcoral"
                        isAnimationActive={false}
                    >
                        <LabelList dataKey={`falseFact${i}`} position="bottom" />
                    </Scatter>
                ]

                components = [...lines, ...scattersTrue, ...scattersFalse]
            }
        })

        return (
            <ResponsiveContainer width="100%" height="auto" aspect={2.7 / 1.0}>
                <ComposedChart
                    data={arr}
                    margin={{
                        top: 0,
                        right: 20,
                        left: 10,
                        bottom: 40
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="date"
                        tick={<CustomizedAxisTick />}
                        allowDuplicatedCategory={false}
                    />
                    <YAxis
                        type="number"
                        domain={['dataMin', 'dataMax']}
                        scale="linear"
                        fill="#000"
                        fontSize={12}
                    />
                    <Area
                        type="monotone"
                        dataKey="technology"
                        stroke="lightblue"
                        fill="lightblue"
                        isAnimationActive={false}
                    />
                    {components ? (
                        components
                    ) : (
                        <Icon
                            type="loading"
                            className="loading"
                            style={{ fontSize: '20px', color: 'red' }}
                        />
                    )}
                </ComposedChart>
            </ResponsiveContainer>
        )
    }
}
