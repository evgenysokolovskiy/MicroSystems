import React, { PureComponent } from 'react'
import clonedeep from 'lodash.clonedeep'
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

        let total = []
        Object.values(source).forEach((item, i) => {
            if (item[0]['technology'][0]) {
                item.forEach(val => {
                    const min = +val['technology'][0]
                    const max = +val['technology'][1]
                    const fact = +val['fact']

                    if (fact >= min && fact <= max) {
                        val[`trueFact${i}`] = fact
                    } else {
                        val[`falseFact${i}`] = fact
                    }
                    val[`fact${i}`] = fact

                    total = [...total, val]          
                })
            } else {
                item.forEach(val => {
                    const fact = +val['fact']
                    
                    if (fact > +val['technology']) {
                        val[`falseFact${i}`] = fact
                    } else {
                        val[`trueFact${i}`] = fact
                    }
                    val[`fact${i}`] = fact

                    total = [...total, val] 
                })                 
            }
        })

        // Группировать объекты по дате. Свойства объекта - дата
        const obj = {}
        total.forEach(item => {
            const fact =
                obj[item['date']] && obj[item['date']]['fact']
                    ? [...obj[item['date']]['fact'], item['fact']]
                    : [item['fact']]

            obj[item['date']] = {...obj[item['date']], ...item, fact}
        })

        // Отсортировать массив по увеличению даты
        const arr = clonedeep(Object.values(obj)).sort((a, b) => new Date(a['msDate']) - new Date(b['msDate']))

        // Создать все возможные варианты для точек и линий
        // Отрисовать при совпадении с данными
        let components = [], scattersTrue = [], scattersFalse = [], lines = []
        Object.values(source).forEach((item, i) => {
            lines = [...lines,
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

            scattersTrue = [...scattersTrue, 
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

            scattersFalse = [...scattersFalse, 
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
                        scale="sqrt"
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
