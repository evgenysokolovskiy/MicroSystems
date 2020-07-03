import React, { PureComponent } from 'react'
import clonedeep from 'lodash.clonedeep'
import { Layout, Menu } from 'antd'
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
import { LoadingOutlined } from '@ant-design/icons'

export default class DiameterComponent extends PureComponent {
    handleClick = e => {
        this.props.handleClickEquipment(e.key)
    }

    render() {
        const { source, prop, equipment, CustomizedAxisTick } = this.props

        let d
        if (equipment === 'Сводная') {
            d = source ? clonedeep(Object.values(source)) : null
        } else {
            d = source && source[equipment] ? clonedeep([source[equipment]]) : null
        }

        const data = d && d.filter(item => item !== null)

        let total = []
        data &&
            data.forEach((item, i) => {
                item &&
                    item.forEach(val => {
                        const fact = +val['fact']

                        if (item[0]['technology'][0]) {
                            const min = +val['technology'][0]
                            const max = +val['technology'][1]
                            if (fact >= min && fact <= max) {
                                val[`trueFact${i}`] = fact
                            } else {
                                val[`falseFact${i}`] = fact
                            }
                        } else {
                            if (prop === 't вспышки, не менее град С') {
                                if (fact > +val['technology']) {
                                    val[`trueFact${i}`] = fact
                                } else {
                                    val[`falseFact${i}`] = fact
                                }
                            } else {
                                if (fact > +val['technology']) {
                                    val[`falseFact${i}`] = fact
                                } else {
                                    val[`trueFact${i}`] = fact
                                }
                            }
                        }

                        val[`fact${i}`] = fact
                        total = [...total, val]
                    })
            })

        // Группировать объекты по дате. Свойства объекта - дата
        const obj = {}
        total.forEach(item => {
            const fact =
                obj[item['date']] && obj[item['date']]['fact']
                    ? [...obj[item['date']]['fact'], item['fact']]
                    : [item['fact']]

            obj[item['date']] = { ...obj[item['date']], ...item, fact }
        })

        // Отсортировать массив по увеличению даты
        const arr = clonedeep(Object.values(obj)).sort(
            (a, b) => new Date(a['msDate']) - new Date(b['msDate'])
        )

        // * КОМПОНЕНТЫ

        // Меню (оборудование)
        let items = []
        source &&
            clonedeep(Object.keys(source)).forEach(item => {
                items = [
                    ...items,
                    <Menu.Item key={item}>
                        <span>{item}</span>
                    </Menu.Item>
                ]
            })

        const MenuComponent = (
            <div className="laboratoryMenu">
                <Menu
                    mode="inline"
                    theme="light"
                    selectedKeys={[equipment]}
                    onClick={this.handleClick}
                >
                    <Menu.Item key="Сводная">
                        <span>Сводная</span>
                    </Menu.Item>
                    {items}
                </Menu>
            </div>
        )

        // Создать все возможные варианты для точек и линий
        // Отрисовать при совпадении с данными
        // Фактические компоненты
        let factComponents = [],
            scattersTrue = [],
            scattersFalse = [],
            lines = []
        data &&
            data.forEach((item, i) => {
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

                factComponents = [...lines, ...scattersTrue, ...scattersFalse]
            })

        // Компоненты технология
        const technologyComponent =
            data &&
            data[0] &&
            data[0][0] &&
            data[0][0]['technology'] &&
            data[0][0]['technology'][0] ? (
                <Area
                    type="monotone"
                    dataKey="technology"
                    stroke="#000"
                    fill="lightblue"
                    isAnimationActive={false}
                />
            ) : (
                <Line
                    type="linear"
                    dataKey="technology"
                    stroke="#000"
                    strokeWidth={1.5}
                    dot={false}
                    isAnimationActive={false}
                />
            )

        return (
            <Layout style={{ background: '#fff' }} className="ant-layout-has-sider">
                {MenuComponent}
                <ResponsiveContainer width="100%" height="auto" aspect={2.7 / 0.9}>
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

                        {technologyComponent ? (
                            technologyComponent
                        ) : (
                            <LoadingOutlined className="circleRed" />
                        )}

                        {factComponents ? (
                            factComponents
                        ) : (
                            <LoadingOutlined className="circleRed" />
                        )}
                    </ComposedChart>
                </ResponsiveContainer>
            </Layout>
        )
    }
}
