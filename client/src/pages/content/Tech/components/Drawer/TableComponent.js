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
        const { data, onGetData } = this.props
        const {
            minDiameter,
            maxDiameter,
            inconstancy,
            dimension,
            pressure,
            speed,
            factDiameter,
            factInconstancy,
            factDimension,
            factPressure,
            factSpeed
        } = data

        // Диаметр
        const differenceDiameter = +(factDiameter >= maxDiameter
            ? factDiameter - maxDiameter
            : factDiameter <= minDiameter
            ? factDiameter - minDiameter
            : 0
        ).toFixed(3)
        /*
        const diff = maxDiameter - minDiameter
        const percentDiameter = differenceDiameter / diff
        */
        // Непостоянство
        const differenceInconstancy = factInconstancy ? factInconstancy - inconstancy : 0
        // Разноразмерность
        const differenceDimension = factDimension ? factDimension - dimension : 0
        // Давление
        const differencePressure = factPressure ? factPressure - pressure : 0
        // Скорость
        const differenceSpeed = factSpeed ? factSpeed - speed : 0

        onGetData({
            // Диаметр
            //diff,
            differenceDiameter,
            // Непостоянство
            differenceInconstancy,
            // Разноразмерность
            differenceDimension,
            // Давление
            differencePressure,
            // Скорость
            differenceSpeed
        })

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
                fact: factInconstancy
            },
            {
                key: '3',
                title: 'Разноразмерность по диаметру, мкм',
                min: null,
                max: dimension,
                fact: factDimension
            },
            {
                key: '4',
                title: 'Давление, атм',
                min: null,
                max: pressure,
                fact: factPressure
            },
            {
                key: '3',
                title: 'Скорость, об/мин',
                min: null,
                max: speed,
                fact: factSpeed
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
            </>
        )
    }
}

/*

                <Pagination
                    defaultPageSize={1}
                    defaultCurrent={1}
                    total={21}
                    style={{ marginTop: '20px', textAlign: 'right' }}
                    onChange={this.onChange}
                />
*/
