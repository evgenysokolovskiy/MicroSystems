import React, { PureComponent } from 'react'
import { Table, Pagination } from 'antd'
import { dataDiameter, dataInconstancyDimension, datapPessureSpeed } from '../../data'

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
                dataIndex: 'min'
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
        dataIndex: 'difference',
        render(text) {
            return {
                props: {
                    className: text && text !== 0 ? 'false' : text === 0 ? 'true' : ''
                },
                children: text
            }
        }
    }
]

export default class TableComponent extends PureComponent {
    onChange = page => {
        this.props.changeTechTargetTimeStamp(+page)
    }

    render() {
        const { techTargetTimeStamp: date, onGetData } = this.props
        const {
            minDiameter,
            maxDiameter,
            inconstancy,
            dimension,
            pressure,
            speed
        } = this.props.technology

        const { factDiameter } = this.props.fact

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
