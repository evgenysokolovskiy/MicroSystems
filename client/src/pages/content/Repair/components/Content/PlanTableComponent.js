import React, { PureComponent } from 'react'
// Antd
import { Table, Tabs } from 'antd'

const { TabPane } = Tabs
const monthIndexes = {
    январь: 0,
    февраль: 1,
    март: 2,
    апрель: 3,
    май: 4,
    июнь: 5,
    июль: 6,
    август: 7,
    сентябрь: 8,
    октябрь: 9,
    ноябрь: 10,
    декабрь: 11
}

export default class PlanTableComponent extends PureComponent {
    state = {
        menu: Object.keys(this.props.data['approved'])[0]
    }

    onChangeTab = (activeKey) => {
        this.setState({ menu: activeKey })
    }

    onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra)
    }

    render() {
        const { data, handleClickRow, handleClickOpenDrawer } = this.props
        // Найти 'column'
        // Исходный вид
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
                onFilter: (value, record) => record.model.indexOf(value) === 0,
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
                width: 150,
                render: (text) => {
                    return {
                        children: text,
                        props: {
                            inn: text
                        }
                    }
                },
                fixed: 'left',
                sorter: (a, b) => a.inn - b.inn,
                sortDirections: ['descend', 'ascend']
            },
            {
                title: 'Вид',
                dataIndex: 'typeOfRepair',
                width: 90,
                fixed: 'left',
                sorter: (a, b) => a.typeOfRepair - b.typeOfRepair,
                sortDirections: ['descend', 'ascend']
            }
        ]

        // Получить массив с наименованиями узлов для оборудования в соответствующий период времени
        const obj = {}
        data['approved'][this.state.menu].forEach((item) => {
            Object.keys(item['nodes']).forEach((node) => {
                obj[node] = true
            })
        })
        const arr = [...Object.keys(obj)]
        const sortedArr = arr.sort((a, b) => +a - +b)

        // Добавить узлы
        let nodes = []
        let allNodes = {}
        if (data) {
            sortedArr.forEach((node) => {
                allNodes[node] = ''
                const obj = {
                    title: node,
                    dataIndex: node,
                    render(text) {
                        return {
                            props: {
                                className: text === ' ' ? 'false' : ''
                            },
                            children: text
                        }
                    },
                    width: 65,
                    filters: [
                        {
                            text: `Имеет неисправность ${node}`,
                            value: ' '
                        },
                        {
                            text: 'Нет данной неисправности',
                            value: ''
                        }
                    ],
                    // Фильтровать данные
                    onFilter: (value, record) => record[node].indexOf(value) === 0,
                    // Событие на ячейке
                    onCell: (record, rowIndex) => {
                        return {
                            onClick: (event) => {
                                //console.log(event.currentTarget, rowIndex)
                            }
                        }
                    }
                }

                nodes = [...nodes, obj]
            })
        }

        column = [...column, ...nodes]

        let tabsWithTables = [] // Компонент для рендеринга

        if (data) {
            // Отсортировать по дате (чтобы tab ыстроились в порядке возрастания даты)
            const sortedDateObj = Object.fromEntries(
                Object.entries(data['approved']).sort((a, b) => {
                    return (
                        new Date(2020, monthIndexes[a[0].split(' ')[0]]).getTime() -
                        new Date(2020, monthIndexes[b[0].split(' ')[0]]).getTime()
                    )
                })
            )

            // Для каждого периода времени строится своя таблица
            // Далее соотносится с Tabs
            let tables = []
            Object.values(sortedDateObj).forEach((period) => {
                // Найти 'dataSource'
                let dataSource = []
                period.forEach((item, i) => {
                    const obj = {
                        key: i,
                        idx: ++i,
                        model: item['model'],
                        num: item['num'],
                        inn: item['inn'],
                        typeOfRepair: item['typeOfRepair'],
                        ...allNodes
                    }

                    item['nodes'] &&
                        Object.keys(item['nodes']).forEach((node) => {
                            obj[node] = ' '
                        })

                    dataSource = [...dataSource, obj]
                })

                // * Построить таблицу на основе column и datasource
                const table = (
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
                tables = [...tables, table]
            })

            Object.keys(sortedDateObj).forEach(
                (item, i) =>
                    (tabsWithTables = [
                        ...tabsWithTables,
                        <TabPane tab={item} key={item}>
                            {tables[i]}
                        </TabPane>
                    ])
            )

            tabsWithTables = [...tabsWithTables]
        }

        return (
            <>
                <div>
                    <Tabs defaultActiveKey="0" type="card" onChange={this.onChangeTab}>
                        {tabsWithTables}
                    </Tabs>
                </div>
            </>
        )
    }
}
