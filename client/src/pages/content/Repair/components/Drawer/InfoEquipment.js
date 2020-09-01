import React from 'react'
// Antd
import { Table, Tag, Typography } from 'antd'
// Rechart
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from 'recharts'

const { Title, Text } = Typography

const columnsPlan = [
    {
        title: 'Модель',
        dataIndex: 'model',
        key: 'model'
    },
    {
        title: 'Инв.№',
        dataIndex: 'inn',
        key: 'inn'
    },
    {
        title: 'Цех.№',
        dataIndex: 'num',
        key: 'num'
    },
    {
        title: 'Дата',
        dataIndex: 'period',
        key: 'period'
    },
    {
        title: 'Вид ремонта',
        dataIndex: 'typeOfRepair',
        key: 'typeOfRepair',
        render: (typeOfRepair) => (
            <span>
                {typeOfRepair &&
                    typeOfRepair.map((type) => {
                        const color = type === 'Средний' ? 'lightcoral' : 'geekblue'
                        return (
                            <Tag color={color} key={type}>
                                {type.toUpperCase()}
                            </Tag>
                        )
                    })}
            </span>
        )
    }
]

const statisticPlan = [
    {
        title: 'Наработка,час',
        dataIndex: 'mtbf',
        key: 'mtbf'
    },
    {
        title: 'Кол-во простоев',
        dataIndex: 'sumAmount',
        key: 'sumAmount'
    },
    {
        title: 'Время простоев,час',
        dataIndex: 'sumTime',
        key: 'sumTime'
    },
    {
        title: 'Процент',
        dataIndex: 'percentTimeOfMtbf',
        key: 'percentTimeOfMtbf'
    },
    {
        title: 'Последний ремонт',
        dataIndex: 'last',
        key: 'last'
    }
]

export default function (props) {
    const { data, visible } = props

    const {
        model,
        inn,
        num,
        mtbf,
        sumAmount,
        sumTime,
        percentTimeOfMtbf,
        typeOfRepair,
        period,
        nodes,
        comment
    } = data

    const plan = [
        {
            key: '1',
            model,
            inn,
            num,
            period: (() => (period ? period : null))(),
            typeOfRepair: (() => {
                let type
                if (typeOfRepair) {
                    type =
                        typeOfRepair === 'средний'
                            ? ['Средний']
                            : typeOfRepair === 'текущий'
                            ? Object.keys(data['nodes'])
                            : null
                } else {
                    type = null
                }
                return type
            })()
        }
    ]

    const statistic = [
        {
            key: '1',
            mtbf,
            sumAmount,
            sumTime: (() => sumTime && sumTime.toFixed(2))(),
            percentTimeOfMtbf: (() => percentTimeOfMtbf && percentTimeOfMtbf.toFixed(2))()
        }
    ]

    let d = []

    visible &&
        nodes &&
        Object.entries(nodes).forEach((node) => {
            // Дробное значение времени в исходной таблице excel предоставляется с запятой, имеет тип строки
            // Необходимо преобразовать к числу с плавающей точкой
            // Для натуральных чисел преобразование не требуется
            let time
            const nodeTime = node[1]['time']
            typeof nodeTime === 'string' ? (time = +nodeTime.replace(',', '.')) : (time = +nodeTime)

            const obj = {
                name: node[0],
                uv: +node[1]['amount'],
                pv: time
            }
            d = [...d, obj]
        })

    const hasAmountElement = (
        <>
            <Title level={4} style={{ marginTop: '40px' }}>
                Статистические данные:
            </Title>
            <Table
                dataSource={sumAmount && statistic}
                columns={statisticPlan}
                bordered
                size="small"
                pagination={false}
                style={{ marginBottom: '20px' }}
            />

            <Text>Статистика узлов, которым необходим ремонт</Text>
            <ResponsiveContainer width="100%" aspect={2.7 / 1.0}>
                <BarChart
                    data={d}
                    margin={{
                        top: 5,
                        right: 10,
                        left: 10,
                        bottom: 5
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="pv" fill="#8884d8" name="Время остановок" />
                    <Bar dataKey="uv" fill="#82ca9d" name="Количество остановок" />
                </BarChart>
            </ResponsiveContainer>

            <Title level={4} style={{ marginTop: '40px' }}>
                Основание для включения в план:
            </Title>
            <Text>Анализ по аварийным выходам оборудования</Text>
        </>
    )

    const dontHaveAmountElement = (
        <>
            <Title level={4} style={{ marginTop: '40px' }}>
                Статистические данные:
            </Title>
            <Text>Не имеет данных по аварийным остановкам</Text>

            <Title level={4} style={{ marginTop: '40px' }}>
                Основание для включения в план:
            </Title>
            <Text>{comment}</Text>
        </>
    )

    return (
        <>
            <Title level={4}>План ремонтов:</Title>
            <Table
                dataSource={plan}
                columns={columnsPlan}
                bordered
                size="small"
                pagination={false}
            />
            {sumAmount ? hasAmountElement : dontHaveAmountElement}
        </>
    )
}
