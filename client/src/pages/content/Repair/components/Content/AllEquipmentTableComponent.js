import React, { PureComponent } from 'react'
// Antd
import { Table, Tabs, Tag } from 'antd'

const { TabPane } = Tabs

export default class AllEquipmentTableComponent extends PureComponent {
    state = {
        filteredInfo: null,
        sortedInfo: null
    }

    componentDidUpdate(prevProps) {
        if (prevProps.targetMenu !== this.props.targetMenu) {
            this.clearFilters()
        }
    }

    onChange = (pagination, filters, sorter) => {
        console.log('params', pagination, filters, sorter)
        this.setState({
            filteredInfo: filters
        })
    }

    clearFilters = () => {
        this.setState({ filteredInfo: null })
    }

    render() {
        const { data, handleClickRow, handleClickOpenDrawer } = this.props
        let { filteredInfo } = this.state

        filteredInfo = filteredInfo || {}

        const mod = {}
        const per = {}
        const ps = {}
        data['all'].forEach((item) => {
            mod[[item['model']]] = true
            per[[item['period']]] = true
            ps[[item['ps']]] = true
        })
        const models = Object.keys(mod)
        const periods = Object.keys(per)
        const pss = Object.keys(ps)
        const modelsObj = models.map((item) => {
            return {
                text: item,
                value: item
            }
        })
        const periodsObj = periods.map((item) => {
            return {
                text: item,
                value: item
            }
        })
        const pssObj = pss.map((item) => {
            return {
                text: item,
                value: item
            }
        })

        let column = [
            {
                title: '№ п/п',
                dataIndex: 'idx',
                width: 60,
                fixed: 'left'
            },
            {
                title: 'Модель',
                dataIndex: 'model',
                width: 150,
                fixed: 'left',
                filters: modelsObj,
                filteredValue: filteredInfo.model || null,
                onFilter: (value, record) => record.model.toString().includes(value),
                sorter: (a, b) => a.model.length - b.model.length,
                sortDirections: ['descend']
            },
            {
                title: 'Цех. №',
                dataIndex: 'num',
                width: 80,
                fixed: 'left',
                sorter: (a, b) => a.num - b.num,
                sortDirections: ['descend', 'ascend']
            },
            {
                title: 'Инв. №',
                dataIndex: 'inn',
                render: (text) => {
                    return {
                        children: text,
                        props: {
                            inn: text
                        }
                    }
                },

                width: 150,
                fixed: 'left',
                sorter: (a, b) => a.inn - b.inn,
                sortDirections: ['descend', 'ascend']
            },
            {
                title: 'Наработка',
                dataIndex: 'mtbf',
                width: 120,
                fixed: 'left',
                sorter: (a, b) => a.mtbf - b.mtbf,
                sortDirections: ['descend', 'ascend']
            },
            {
                title: 'Процент',
                dataIndex: 'percentTimeOfMtbf',
                width: 120,
                fixed: 'left',
                sorter: (a, b) => a.percentTimeOfMtbf - b.percentTimeOfMtbf,
                sortDirections: ['descend', 'ascend']
            },
            {
                title: 'Вид ремонта',
                dataIndex: 'typeOfRepair',
                width: 150,
                fixed: 'left',
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
            },
            {
                title: 'Дата ремонта',
                dataIndex: 'period',
                width: 120,
                fixed: 'left',
                filters: periodsObj,
                filteredValue: filteredInfo.period || null,
                onFilter: (value, record) =>
                    record.period && record.period.toString().includes(value)
            },
            {
                title: 'ПС',
                dataIndex: 'ps',
                width: 80,
                fixed: 'left',
                filters: pssObj,
                filteredValue: filteredInfo.ps || null,
                onFilter: (value, record) => record.ps && record.ps.toString().includes(value),
                sorter: (a, b) => a.ps.match(/[0-9].*/) - b.ps.match(/[0-9].*/),
                sortDirections: ['descend', 'ascend']
            }
        ]

        let table = []

        if (data) {
            // Найти 'dataSource'
            let dataSource = []
            data['all'].forEach((item, i) => {
                const obj = {
                    key: i,
                    idx: ++i,
                    model: item['model'],
                    num: item['num'],
                    inn: item['inn'],
                    mtbf: item['mtbf'],
                    percentTimeOfMtbf: (() =>
                        item['percentTimeOfMtbf'] && item['percentTimeOfMtbf'].toFixed(2))(),
                    typeOfRepair: (() => {
                        let type
                        if (item['typeOfRepair']) {
                            type =
                                item['typeOfRepair'] === 'medium'
                                    ? ['Средний']
                                    : item['typeOfRepair'] === 'nodes'
                                    ? Object.keys(item['nodes'])
                                    : null
                        } else {
                            type = null
                        }
                        return type
                    })(),
                    period: item['period'],
                    ps: (() => item['ps'] && item['ps'])()
                }

                dataSource = [...dataSource, obj]
            })

            // * Построить таблицу на основе column и datasource
            table = (
                <>
                    <Table
                        columns={column}
                        dataSource={dataSource}
                        bordered
                        onChange={this.onChange}
                        pagination={false}
                        scroll={{ x: 'max-content', y: '80vh' }}
                        size="small"
                        // Событие на строке
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: (event) => {
                                    handleClickOpenDrawer()
                                    //console.log(event.currentTarget, rowIndex)
                                    const arr = [...event.currentTarget.children]
                                    arr.forEach(
                                        (item) =>
                                            item.hasAttribute('inn') &&
                                            handleClickRow(item.getAttribute('inn'))
                                    )
                                }
                            }
                        }}
                    />
                </>
            )
        }

        return (
            <>
                <div>{table}</div>
            </>
        )
    }
}
/*
function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra)
}
*/
