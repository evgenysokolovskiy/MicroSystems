import React, { PureComponent } from 'react'
import { Table } from 'antd'
import { dataDiameter, dataInconstancyDimension, datapPessureSpeed } from '../../data'

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

export default class TableComponent extends PureComponent {
    render() {
        const { techTargetTimeStamp: date } = this.props
        const {
            minDiameter,
            maxDiameter,
            inconstancy,
            dimension,
            pressure,
            speed
        } = this.props.technology

        const { factDiameter } = this.props.fact

        const dataSource = [
            {
                key: '1',
                title: 'Предельный диаметр, мм',
                date,
                min: minDiameter,
                max: maxDiameter,
                fact: factDiameter
            },
            {
                key: '2',
                title: 'Непостоянство единичного диаметра, мкм',
                date,
                min: null,
                max: inconstancy,
                fact: null
            },
            {
                key: '3',
                title: 'Размерность по диаметру, мкм',
                date,
                min: null,
                max: dimension,
                fact: null
            },
            {
                key: '4',
                title: 'Давление, атм',
                date,
                min: null,
                max: pressure,
                fact: null
            },
            {
                key: '3',
                title: 'Скорость, об/мин',
                date,
                min: null,
                max: speed,
                fact: null
            }
        ]

        return (
            <Table
                columns={columns}
                dataSource={dataSource}
                bordered
                pagination={false}
                size="small"
            />
        )
    }
}
