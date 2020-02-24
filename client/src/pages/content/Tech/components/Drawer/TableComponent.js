import React, { PureComponent } from 'react'
import { Table, Pagination, InputNumber } from 'antd'

const columns = [
    {
        title: 'ТЕХНОЛОГИЯ',
        dataIndex: 'technology',
        children: [
            {
                title: 'График',
                dataIndex: 'title'
            },
            {
                title: 'Мин',
                dataIndex: 'min',
                render(text) {
                    return {
                        props: {
                            className: text && text !== 0 ? 'false' : text === 0 ? 'true' : ''
                        },
                        children: text
                    }
                }
            },
            {
                title: 'Макс',
                dataIndex: 'max'
            }
        ]
    },
    {
        title: 'ФАКТ',
        dataIndex: 'fact'
    },
    {
        title: 'РАСХОЖДЕНИЕ',
        dataIndex: 'difference'
    }
]

export default class TableComponent extends PureComponent {
    onChange = page => {
        this.props.changeTechTargetTimeStamp(+page)
    }

    onInput = value => {
        console.log(value)
    }
    // <InputNumber min={1} max={10} defaultValue={3} onChange={onInput}

    render() {
        const { techTargetTimeStamp: date, technology, fact, onGetData } = this.props
        const { minDiameter, maxDiameter, inconstancy, dimension, pressure, speed } = technology

        const { factDiameter } = fact

        let differenceDiameter = +(factDiameter >= maxDiameter
            ? factDiameter - maxDiameter
            : factDiameter <= minDiameter
            ? factDiameter - minDiameter
            : 0
        ).toFixed(3)

        const diff = maxDiameter - minDiameter
        const percentDiameter = differenceDiameter / diff

        onGetData({ diff, percentDiameter })

        const dataSource = [
            {
                key: '1',
                title: 'Предельный диаметр, мм',
                min: minDiameter,
                max: maxDiameter,
                fact: factDiameter,
                difference: differenceDiameter
            },
            {
                key: '2',
                title: 'Непостоянство единичного диаметра, мкм',
                min: null,
                max: inconstancy,
                fact: null
            },
            {
                key: '3',
                title: 'Размерность по диаметру, мкм',
                min: null,
                max: dimension,
                fact: null
            },
            {
                key: '4',
                title: 'Давление, атм',
                min: null,
                max: pressure,
                fact: null
            },
            {
                key: '3',
                title: 'Скорость, об/мин',
                min: null,
                max: speed,
                fact: null
            }
        ]

        return (
            <>
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    bordered
                    pagination={false}
                    size="small"
                />

                <Pagination
                    defaultPageSize={1}
                    defaultCurrent={+date}
                    total={21}
                    style={{ marginTop: '20px', textAlign: 'right' }}
                    onChange={this.onChange}
                />
            </>
        )
    }
}
