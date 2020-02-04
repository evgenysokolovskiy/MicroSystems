import React from 'react'
// Antd
import { Table, Tag, Typography } from 'antd'
// Rechart
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell,
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
        title: 'План',
        dataIndex: 'period',
        key: 'period'
    },
    {
        title: 'Вид ремонта',
        dataIndex: 'typeOfRepair',
        key: 'typeOfRepair',
        render: typeOfRepair => (
            <span>
                {typeOfRepair &&
                    typeOfRepair.map(type => {
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
        title: 'Последний ремонт',
        dataIndex: 'last',
        key: 'last'
    }
]

export default function(props) {
    const { data, period, visible } = props
    const {
        model,
        inn,
        num,
        mtbf,
        sumAmount,
        sumTime,
        typeOfRepair,
        mechanicRepairComplexity,
        electricRepairComplexity
    } = data

    const plan = [
        {
            key: '1',
            model,
            inn,
            num,
            period,
            typeOfRepair: (() =>
                typeOfRepair === 'medium'
                    ? ['Средний']
                    : typeOfRepair === 'nodes'
                    ? Object.keys(data['nodes'])
                    : null)()
        }
    ]

    const statistic = [
        {
            key: '1',
            mtbf,
            sumAmount,
            sumTime
        }
    ]

    let d = []

    visible &&
        Object.entries(data['nodes']).forEach(node => {
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
            <Title level={4} style={{ marginTop: '40px' }}>
                Статистические данные:
            </Title>
            <Table
                dataSource={statistic}
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
        </>
    )
}
