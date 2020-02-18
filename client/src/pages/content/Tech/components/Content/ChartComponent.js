import React, { PureComponent } from 'react'
import { Row, Col, Table, Collapse } from 'antd'
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
    Text,
    BarChart,
    Bar,
    LabelList
} from 'recharts'
import { data0, data1, data2, data3, data4 } from '../../data'

const { Panel } = Collapse

const d1 = data0.map(item => {
    if (item['fact'] > item['norm'][0] && item.fact < item['norm'][1]) {
        item['trueFact'] = item['fact']
    } else {
        item['falseFact'] = item['fact']
    }
    return item
})

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
        title: 'Мин',
        dataIndex: 'min',
        key: 'min'
    },
    {
        title: 'Макс',
        dataIndex: 'max',
        key: 'max'
    },
    {
        title: 'Факт',
        dataIndex: 'fact',
        key: 'fact'
    }
]

const CustomizedAxisTick = props => {
    const { x, y, payload } = props

    return (
        <g transform={`translate(${x}, ${y})`}>
            <text dy={16} textAnchor="middle" fill="#666">
                {payload.value}
            </text>
        </g>
    )
}

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
        const { width } = this.state
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

        let maxChart2
        let maxChart3
        let maxChart4
        let maxChart5
        data1.forEach(item => {
            if (item['date'] === date) {
                maxChart2 = item['inconstancy']
                maxChart3 = item['dimension']
            }
        })

        data3.forEach(item => {
            if (item['date'] === date) {
                maxChart4 = item['pressure']
                maxChart5 = item['speed']
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
            },
            {
                key: '4',
                title: 'Давление, атм',
                date,
                min: null,
                max: maxChart4,
                fact: null
            },
            {
                key: '3',
                title: 'Скорость, об/мин',
                date,
                min: null,
                max: maxChart5,
                fact: null
            }
        ]

        return (
            <>
                <Collapse defaultActiveKey={['diameter']}>
                    <Panel header="Таблица" key="table">
                        <Table
                            columns={columns}
                            dataSource={d}
                            bordered
                            pagination={false}
                            size="small"
                        />
                    </Panel>

                    <Panel header="Диаметр, мм" key="diameter">
                        <ResponsiveContainer width="100%" aspect={2.7 / 1.0}>
                            <ComposedChart data={d1} syncId="anyId" onClick={this.handleClick}>
                                <XAxis dataKey="date" tick={<CustomizedAxisTick />} />
                                <YAxis
                                    type="number"
                                    domain={['dataMin', 'dataMax']}
                                    scale="linear"
                                />
                                <Area
                                    dataKey="norm"
                                    name="Норматив (min/max)"
                                    stroke="#222"
                                    type="linear"
                                />
                                <CartesianGrid stroke="#000" strokeWidth={0.2} />
                                <Tooltip content={this.getData} />

                                {/*<ReferenceLine x={date} stroke="rgba(230,200,215,0.2)" strokeWidth={60} />*/}
                                <ReferenceLine x={date} stroke="red" />
                                <Scatter
                                    dataKey="trueFact"
                                    name="Факт (норма)"
                                    stroke="lightgreen"
                                    strokeWidth={1}
                                    fill="lightgreen"
                                >
                                    <LabelList dataKey="trueFact" position="top" />
                                </Scatter>
                                <Scatter
                                    dataKey="falseFact"
                                    name="Факт (не норма)"
                                    stroke="lightcoral"
                                    strokeWidth={1}
                                    fill="lightcoral"
                                >
                                    <LabelList dataKey="falseFact" position="top" />
                                </Scatter>
                            </ComposedChart>
                        </ResponsiveContainer>
                    </Panel>

                    <Panel
                        header="Непостоянство, мкм - Размерность, мкм"
                        key="inconstancyDimension"
                    >
                        <ResponsiveContainer width="100%" aspect={2.7 / 1.0}>
                            <LineChart
                                data={data1}
                                syncId="anyId"
                                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                                onClick={this.handleClick}
                            >
                                <CartesianGrid stroke="#000" strokeWidth={0.2} />
                                <XAxis dataKey="date" tick={<CustomizedAxisTick />} />
                                <YAxis
                                    type="number"
                                    domain={['dataMin', 'dataMax']}
                                    scale="linear"
                                />
                                <Tooltip content={this.getData} />
                                {/*<ReferenceLine x={date} stroke="rgba(230,200,215,0.2)" strokeWidth={60} />*/}
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
                    </Panel>

                    <Panel header="Давление, атм - Скорость, об/мин" key="pressureSpeed">
                        <ResponsiveContainer width="100%" aspect={2.7 / 1.0}>
                            <BarChart data={data3} syncId="anyId">
                                <CartesianGrid stroke="#000" strokeWidth={0.2} />
                                <XAxis dataKey="date" tick={<CustomizedAxisTick />} />
                                <YAxis
                                    type="number"
                                    domain={['dataMin', 'dataMax']}
                                    scale="linear"
                                />
                                <Legend />
                                <Bar dataKey="pressure" stackId="a" fill="#8884d8" name="Давление">
                                    <LabelList dataKey="pressure" position="middle" />
                                </Bar>
                                <Bar dataKey="speed" stackId="a" fill="#82ca9d" name="Скорость">
                                    <LabelList dataKey="speed" position="top" />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </Panel>
                </Collapse>
            </>
        )
    }
}
