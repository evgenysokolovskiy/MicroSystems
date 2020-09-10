import React, { PureComponent } from 'react'
// Antd
import { Table, Button, Tag } from 'antd'
// XLSX
import XLSX from 'xlsx'
import { saveAs } from 'file-saver'

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
        //console.log('params', pagination, filters, sorter)
        this.setState({
            filteredInfo: filters
        })
    }

    clearFilters = () => {
        this.setState({ filteredInfo: null })
    }

    createExcelFileFromTable = () => {
        // Parse html table, create workbook
        const workbook = XLSX.utils.book_new()
        const ws1 = XLSX.utils.table_to_sheet(document.querySelector('.ant-table-container'))
        XLSX.utils.book_append_sheet(workbook, ws1, 'Оборудование')
        //console.log(workbook)

        // Write file xlsx from workbook
        var wopts = { bookType: 'xlsx', bookSST: false, type: 'array' }
        var wbout = XLSX.write(workbook, wopts)
        saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'Оборудование.xlsx')
    }

    render() {
        const { data, handleClickRow, handleClickOpenDrawer } = this.props
        let { filteredInfo, pagination } = this.state

        filteredInfo = filteredInfo || {}

        const mod = {}
        const per = {}
        const ps = {}
        const type = {}
        const completedType = {}
        const completedData = {}

        data['all'].forEach((item) => {
            mod[[item['model']]] = true
            per[[item['period']]] = true
            ps[[item['ps']]] = true
            if (item['typeOfRepair']) type[[item['typeOfRepair']]] = true
            if (item['completed']) {
                if (item['completed']['typeOfRepair'])
                    completedType[item['completed']['typeOfRepair']] = true
                if (item['completed']['endDate'])
                    completedData[item['completed']['endDate'].split('.').reverse()[0]] = true
            }
        })
        const models = Object.keys(mod)
        const periods = Object.keys(per)
        const pss = Object.keys(ps)
        const typeOfRepair = Object.keys(type)
        const completedTypeOfRepair = Object.keys(completedType)
        const completedEndDate = Object.keys(completedData)

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
        const typeOfRepairObj = typeOfRepair.map((item) => {
            return {
                text: item,
                value: item
            }
        })
        const completedTypeOfRepairObj = completedTypeOfRepair.map((item) => {
            return {
                text: item,
                value: item
            }
        })
        const completedEndDateObj = completedEndDate.map((item) => {
            return {
                text: item,
                value: item
            }
        })

        let column = [
            {
                title: '№ п/п',
                dataIndex: 'idx',
                width: 60
            },
            {
                title: 'Модель',
                dataIndex: 'model',
                width: 120,
                filters: modelsObj,
                filteredValue: filteredInfo.model || null,
                onFilter: (value, record) =>
                    record.model && record.model.toString().includes(value),
                sorter: (a, b) => a.model.length - b.model.length,
                sortDirections: ['descend']
            },
            {
                title: 'Цех. №',
                dataIndex: 'num',
                width: 80,
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

                width: 120,
                sorter: (a, b) => a.inn - b.inn,
                sortDirections: ['descend', 'ascend']
            },
            {
                title: 'ПС',
                dataIndex: 'ps',
                width: 80,
                filters: pssObj,
                filteredValue: filteredInfo.ps || null,
                onFilter: (value, record) => record.ps && record.ps.toString().includes(value),
                sorter: (a, b) => a.ps.match(/[0-9].*/) - b.ps.match(/[0-9].*/),
                sortDirections: ['descend', 'ascend']
            },
            {
                title: 'Наработка',
                dataIndex: 'mtbf',
                width: 100,
                sorter: (a, b) => a.mtbf - b.mtbf,
                sortDirections: ['descend', 'ascend']
            },
            {
                title: 'Процент',
                dataIndex: 'percentTimeOfMtbf',
                width: 90,
                sorter: (a, b) => a.percentTimeOfMtbf - b.percentTimeOfMtbf,
                sortDirections: ['descend', 'ascend']
            },
            {
                title: 'Последний выполненный ремонт',
                children: [
                    {
                        title: 'Вид',
                        dataIndex: 'completedTypeOfRepair',
                        width: 100,
                        filters: completedTypeOfRepairObj,
                        filteredValue: filteredInfo.completedTypeOfRepair || null,
                        onFilter: (value, record) =>
                            record.completedTypeOfRepair &&
                            record.completedTypeOfRepair.toString().includes(value)
                    },
                    {
                        title: 'Узлы',
                        dataIndex: 'completedNodes',
                        width: 50
                    },
                    {
                        title: 'Дата',
                        dataIndex: 'completedEndDate',
                        width: 90,
                        filters: completedEndDateObj,
                        filteredValue: filteredInfo.completedEndDate || null,
                        onFilter: (value, record) =>
                            record.completedEndDate &&
                            record.completedEndDate.toString().includes(value)
                    }
                ]
            },
            {
                title: 'План ремонтов',
                children: [
                    {
                        title: 'Вид',
                        dataIndex: 'typeOfRepair',
                        width: 100,
                        filters: typeOfRepairObj,
                        filteredValue: filteredInfo.typeOfRepair || null,
                        onFilter: (value, record) =>
                            record.typeOfRepair && record.typeOfRepair.toString().includes(value)
                        /*
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
                        */
                    },
                    {
                        title: 'Узлы',
                        dataIndex: 'nodes',
                        width: 50
                    },
                    {
                        title: 'Дата',
                        dataIndex: 'period',
                        width: 90,
                        filters: periodsObj,
                        filteredValue: filteredInfo.period || null,
                        onFilter: (value, record) =>
                            record.period && record.period.toString().includes(value)
                    }
                ]
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
                                item['typeOfRepair'] === 'средний'
                                    ? ['средний']
                                    : item['typeOfRepair'] === 'текущий' || item['approvedNodes']
                                    ? ['текущий']
                                    : null
                        } else {
                            type = null
                        }
                        return type
                    })(),
                    nodes: (() => {
                        if (!item['approvedNodes']) return
                        const sortedNodes = item['approvedNodes'].sort((a, b) => +a - +b)
                        const nodes = sortedNodes.map((node) => ` ${node} `)
                        return nodes
                    })(),
                    period: item['period'],
                    ps: (() => item['ps'] && item['ps'])(),
                    completedTypeOfRepair: (() => {
                        let type
                        if (item['completed'] && item['completed']['typeOfRepair']) {
                            type = item['completed']['typeOfRepair']
                        } else {
                            type = null
                        }

                        return type
                    })(),
                    completedNodes: (() => {
                        let nodes
                        if (item['completed'] && item['completed']['nodes']) {
                            nodes = item['completed']['nodes']
                        } else {
                            nodes = null
                        }

                        return nodes
                    })(),
                    completedEndDate: (() => {
                        let date
                        if (item['completed'] && item['completed']['endDate']) {
                            date = item['completed']['endDate']
                        } else {
                            date = null
                        }

                        return date
                    })()
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
                        size="small"
                        onChange={this.onChange}
                        pagination={{
                            defaultPageSize: 20,
                            showSizeChanger: true,
                            pageSizeOptions: ['20', '30', data['allEquipment']]
                        }}
                        scroll={{ x: 'max-content', y: '80vh' }}
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
                <Button onClick={this.clearFilters}>Очистить фильтры</Button>
                <Button onClick={this.createExcelFileFromTable}>Экспорт в Excel</Button>
                <div>{table}</div>
            </>
        )
    }
}
