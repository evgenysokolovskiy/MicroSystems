import React, { PureComponent } from 'react'
// Antd
import { Table } from 'antd'
//import { CaretDownOutlined } from '@ant-design/icons'
const { Column, ColumnGroup } = Table

const dataSource = [
  {
    key: '1',
    inn: 'Mike',
    lastDate: 32,
    result: '10 Downing Street',
    comment: 'льльлщшогргрГРГРШьльл'
  },
  {
    key: '2',
    inn: 'Mike',
    lastDate: 32,
    result: '10 Downing Street',
    comment: 'льльлщшогргрГРГРШьльл'
  },
  {
    key: '3',
    inn: 'Mike',
    lastDate: 32,
    result: '10 Downing Street',
    comment: 'льльлщшогргрГРГРШьльл'
  }
];

const columns = [
  {
    title: '№п/п',
    dataIndex: 'index',
    key: 'index',
  },
  {
    title: 'Жидкость',
    dataIndex: 'param',
    key: 'param',
  },
  {
    title: 'Параметр',
    dataIndex: 'prop',
    key: 'prop',
  },
  {
    title: 'Оборудование',
    dataIndex: 'inn',
    key: 'inn',
  },
  {
    title: 'Последняя дата проверки',
    dataIndex: 'lastDate',
    key: 'lastDate',
  },
  {
    title: 'Результат проверки',
    dataIndex: 'result',
    key: 'result',
  },
  {
    title: 'Комментарии',
    dataIndex: 'comment',
    key: 'comment',
  }
];


export default class TableTotalComponent extends PureComponent {
    state = {
        dataSourceShp: [],
        columnsShp: []
    }

    componentDidUpdate(prevProps) {
        if (prevProps.lastShp !== this.props.lastShp) {
            const { lastShp } = this.props

            let data = []
            let count = 1
            Object.entries(lastShp).forEach(param => {
                Object.entries(param[1]).forEach((prop, i) => {
                    Object.entries(prop[1]).forEach(equip => {
                        const item = {
                            key: `${param[0]}${prop[0]}${equip[0]}`,
                            index: count,
                            param: param[0],
                            prop: prop[0],
                            inn: equip[0],
                            lastDate: equip[1]['date'],
                            result: `${equip[1]['fact']}/${equip[1]['technology']}`,
                            comment: ''
                        }

                        data = [...data, item]
                        count++
                    })
                })
            })

            this.setState({
                dataSourceShp: data
            })
        }    
    }

    render() {
        const { dataSourceShp } = this.state

        return (
            <>
                <h4 style={{ paddingTop: 20, paddingLeft: 20 }}>
                    Шариковое производство
                </h4>
                <Table 
                    dataSource={dataSourceShp} 
                    columns={columns} 
                    bordered
                    size="small"
                    pagination={false}
                    scroll={{ x: 'max-content' }}
                    className="labTable"
                />
            </>
        )
    }
}
