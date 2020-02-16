import React, { PureComponent } from 'react'
import { Row, Col, Table } from 'antd'

import {
    ResponsiveContainer,
    ComposedChart,
    AreaChart,
    Area,
    LineChart,
    Line,
    Scatter,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ReferenceLine,
    ReferenceArea,
    Brush,
    Text
} from 'recharts'
import { scaleLog } from 'd3-scale'
const scale = scaleLog().base(Math.E)
const data0 = [
    {
        date: '0',
        norm: [17.71, 17.73],
        fact: 17.65
    },
    {
        date: '3',
        norm: [17.627, 17.644],
        fact: 17.635
    },
    {
        date: '7',
        norm: [17.584, 17.598],
        fact: 17.72
    },
    {
        date: '10',
        norm: [17.551, 17.561],
        fact: 17.7
    },
    {
        date: '14',
        norm: [17.498, 17.505],
        fact: 17.5
    }
]

const d1 = data0.map(item => {
    if (item['fact'] > item['norm'][0] && item.fact < item['norm'][1]) {
        item['trueFact'] = item['fact']
    } else {
        item['falseFact'] = item['fact']
    }
    return item
})

const data1 = [
    {
        date: '0',
        norm: 20.0
    },
    {
        date: '3',
        norm: 15.8
    },
    {
        date: '7',
        norm: 11.5
    },
    {
        date: '10',
        norm: 7.3
    },
    {
        date: '14',
        norm: 3.0
    }
]

const data2 = [
    {
        date: '0',
        norm: 20.0
    },
    {
        date: '3',
        norm: 16.3
    },
    {
        date: '7',
        norm: 12.5
    },
    {
        date: '10',
        norm: 8.8
    },
    {
        date: '14',
        norm: 5.0
    }
]

const columns = [
    {
        title: 'График',
        dataIndex: 'title',
        key: 'title'
    },
    {
        title: 'Дата',
        dataIndex: 'date',
        key: 'date'
    },
    {
        title: 'Минимум',
        dataIndex: 'min',
        key: 'min'
    },
    {
        title: 'Максимум',
        dataIndex: 'max',
        key: 'max'
    },
    {
        title: 'Факт',
        dataIndex: 'fact',
        key: 'fact'
    }
]

export default class ChartComponent extends PureComponent {
    state = {
        date: '',
        target: {
            date: ''
        }
    }

    // Получить текущие показатели по наведении мыши
    getData = data => {
        if (typeof data.payload[0] !== 'undefined') {
            // График №1
            const { date } = data.payload[0].payload
            this.setState({ date })
        }
    }

    handleClick = () => {
        const { date } = this.state
        this.setState({
            target: { date }
        })
    }

    render() {
        const { date } = this.state.target

        // chart1
        let minChart1, maxChart1, factChart1, bool
        d1.forEach(item => {
            if (item['date'] === date) {
                minChart1 = item['norm'][0]
                maxChart1 = item['norm'][1]
                factChart1 = item['fact']
            }
            bool = item['trueFact'] ? true : false
        })

        // chart2
        let maxChart2
        data1.forEach(item => {
            if (item['date'] === date) {
                maxChart2 = item['norm']
            }
        })

        // chart3
        let maxChart3
        data2.forEach(item => {
            if (item['date'] === date) {
                maxChart3 = item['norm']
            }
        })

        const d = [
            {
                key: '1',
                title: 'Предельный диаметр, мм',
                date,
                min: minChart1,
                max: maxChart1,
                fact: factChart1
            },
            {
                key: '2',
                title: 'Непостоянство единичного диаметра, мкм',
                date,
                min: null,
                max: maxChart2,
                fact: null
            },
            {
                key: '3',
                title: 'Размерность по диаметру, мкм',
                date,
                min: null,
                max: maxChart3,
                fact: null
            }
        ]

        return (
            <>
                <div>
                    <h4 style={{ textAlign: 'left', marginLeft: '76px' }}>
                        Предельный диаметр, мм
                    </h4>
                    <ComposedChart
                        width={600}
                        height={200}
                        data={d1}
                        syncId="anyId"
                        margin={{ top: 0, right: 20, left: 20, bottom: 5 }}
                        onClick={this.handleClick}
                    >
                        <XAxis
                            dataKey="date"
                            tick={{ fontSize: 10 }}
                            label={{
                                value: 'Время прохождения партии, час',
                                offset: 0,
                                position: 'insideBottom'
                            }}
                        />
                        <YAxis
                            type="number"
                            domain={[17.5, 17.72]}
                            scale="linear"
                            tick={{ fontSize: 10 }}
                            label={
                                <Text x={0} y={0} dx={20} dy={150} offset={0} angle={-90}>
                                    Диаметр, мм
                                </Text>
                            }
                        />
                        <Area dataKey="norm" name="Норматив (min/max)" stroke="#222" fill="#ccc" />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip content={this.getData} />
                        <Legend />
                        {/*<ReferenceLine x={date} stroke="rgba(230,200,215,0.2)" strokeWidth={60} />*/}
                        <ReferenceLine x={date} stroke="red" />
                        <Scatter
                            dataKey="trueFact"
                            name="Факт (норма)"
                            stroke="#222"
                            fill="lightgreen"
                        />
                        <Scatter
                            dataKey="falseFact"
                            name="Факт (не норма)"
                            stroke="#222"
                            fill="lightcoral"
                        />
                    </ComposedChart>

                    <h4 style={{ textAlign: 'left', marginLeft: '76px', marginTop: '40px' }}>
                        Непостоянство единичного диаметра, мкм
                    </h4>
                    <LineChart
                        width={600}
                        height={200}
                        data={data1}
                        syncId="anyId"
                        margin={{ top: 0, right: 20, left: 20, bottom: 5 }}
                        onClick={this.handleClick}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="date"
                            tick={{ fontSize: 10 }}
                            label={{
                                value: 'Время прохождения партии, час',
                                offset: 0,
                                position: 'insideBottom'
                            }}
                        />
                        <YAxis
                            tick={{ fontSize: 10 }}
                            label={
                                <Text x={0} y={0} dx={20} dy={150} offset={0} angle={-90}>
                                    Непостоянство, мкм
                                </Text>
                            }
                        />
                        <Tooltip content={this.getData} />
                        {/*<ReferenceLine x={date} stroke="rgba(230,200,215,0.2)" strokeWidth={60} />*/}
                        <ReferenceLine x={date} stroke="red" />
                        <Line type="monotone" dataKey="norm" stroke="#222" />
                    </LineChart>

                    <h4 style={{ textAlign: 'left', marginLeft: '76px', marginTop: '40px' }}>
                        Размерность по диаметру, мкм
                    </h4>
                    <LineChart
                        width={600}
                        height={200}
                        data={data2}
                        syncId="anyId"
                        margin={{ top: 0, right: 20, left: 20, bottom: 5 }}
                        onClick={this.handleClick}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                        <YAxis
                            tick={{ fontSize: 10 }}
                            label={
                                <Text x={0} y={0} dx={20} dy={150} offset={0} angle={-90}>
                                    Размерность, мкм
                                </Text>
                            }
                        />
                        <Tooltip content={this.getData} />
                        {/*<ReferenceLine x={date} stroke="rgba(230,200,215,0.2)" strokeWidth={60} />*/}
                        <ReferenceLine x={date} stroke="red" />
                        <Line type="monotone" dataKey="norm" stroke="#222" />
                        <Brush />
                    </LineChart>
                </div>
                <div>
                    <h4>Таблица №1. Сводные данные за выбранный момент времени</h4>
                    <Table
                        columns={columns}
                        dataSource={d}
                        bordered
                        pagination={false}
                        size="small"
                    />
                </div>
            </>
        )
    }
}
