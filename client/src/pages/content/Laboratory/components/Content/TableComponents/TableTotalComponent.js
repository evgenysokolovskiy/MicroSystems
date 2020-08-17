import React, { PureComponent } from 'react'
// Antd
import { Table, PageHeader, Button, Descriptions } from 'antd'
//import { CaretDownOutlined } from '@ant-design/icons'

const columns = [
    {
        title: '№п/п',
        dataIndex: 'index',
        key: 'index'
    },
    {
        title: 'Жидкость',
        dataIndex: 'param',
        key: 'param'
    },
    {
        title: 'Параметр',
        dataIndex: 'prop',
        key: 'prop'
    },
    {
        title: 'Оборудование',
        dataIndex: 'inn',
        key: 'inn'
    },
    {
        title: 'Дата',
        dataIndex: 'lastDate',
        key: 'lastDate'
    },
    {
        title: 'Технология',
        dataIndex: 'technology',
        key: 'technology'
    },
    {
        title: 'Факт',
        dataIndex: 'fact',
        key: 'fact'
    },
    {
        title: 'Отклонение',
        dataIndex: 'result',
        key: 'result'
    },
    {
        title: 'Действие',
        dataIndex: 'comment',
        key: 'comment'
    }
]

export default class TableTotalComponent extends PureComponent {
    state = { dataSource: [] }

    componentDidUpdate(prevProps) {
        if (prevProps.last !== this.props.last) {
            const { last } = this.props
            let dataSource = []
            let count = 1

            last &&
                Object.entries(last).forEach((param) => {
                    Object.entries(param[1]).forEach((prop, i) => {
                        Object.entries(prop[1]).forEach((equip) => {
                            const item = {
                                key: `${param[0]}${prop[0]}${equip[0]}`,
                                index: count,
                                param: param[0],
                                prop: prop[0],
                                inn: equip[0],
                                lastDate: equip[1]['date'],
                                technology: (() => {
                                    let res
                                    const technology = equip[1]['technology']
                                    if (Array.isArray(equip[1]['technology'])) {
                                        res = `[ ${technology[0]} / ${technology[1]} ]`
                                    } else {
                                        res = technology
                                    }
                                    return res
                                })(),
                                fact: equip[1]['fact'],
                                result: (() => {
                                    let res
                                    const fact = +equip[1]['fact']
                                    const technology = equip[1]['technology']
                                    // Если технология массив (минимальное, максимальное значение)
                                    if (Array.isArray(technology)) {
                                        const min = +technology[0]
                                        const max = +technology[1]

                                        if (fact < min) {
                                            res = `-${(min - fact).toFixed(3)}`
                                        }

                                        if (fact > max) {
                                            res = `+${(fact - max).toFixed(3)}`
                                        }
                                    } else if (prop[0] === 't вспышки, не менее град С') {
                                        if (fact < +technology) {
                                            res = `-${(+technology - fact).toFixed(3)}`
                                        }
                                    } else {
                                        if (fact > +technology) {
                                            res = `+${(fact - +technology).toFixed(3)}`
                                        }
                                    }

                                    return res
                                })(),
                                comment: ''
                            }

                            dataSource = [...dataSource, item]
                            count++
                        })
                    })
                })

            this.setState({ dataSource })
        }
    }

    handleClickMenu = (item) => {
        const { handleClickTotalTableMenu } = this.props
        handleClickTotalTableMenu(item)
    }

    handleClickRow = (item) => {
        this.props.handleClickRowTotalTable(item)
    }

    render() {
        const { menu, handleClickOpenDrawer } = this.props
        const { dataSource } = this.state

        let subTitle = ''
        if (menu === 'shp') subTitle = 'ШП'
        if (menu === 'shsp') subTitle = 'ШСП'
        if (menu === 'sog') subTitle = 'СОЖ'

        return (
            <>
                <div className="site-page-header-ghost-wrapper">
                    <PageHeader
                        ghost={false}
                        title="Сводная карта состояния жидкостей: "
                        subTitle={subTitle}
                        extra={[
                            <Button
                                key="shp"
                                type={menu === 'shp' && 'primary'}
                                onClick={() => this.handleClickMenu('shp')}
                            >
                                ШП
                            </Button>,
                            <Button
                                key="shsp"
                                type={menu === 'shsp' && 'primary'}
                                onClick={() => this.handleClickMenu('shsp')}
                            >
                                ШСП
                            </Button>,
                            <Button
                                key="sog"
                                type={menu === 'sog' && 'primary'}
                                onClick={() => this.handleClickMenu('sog')}
                            >
                                СОЖ
                            </Button>
                        ]}
                    >
                        <Descriptions size="small" column={1}>
                            <Descriptions.Item>
                                * Данные с 01.07.2020 (учитывается последняя проверка)
                            </Descriptions.Item>
                        </Descriptions>
                    </PageHeader>
                </div>

                <Table
                    dataSource={dataSource}
                    columns={columns}
                    bordered
                    size="small"
                    pagination={false}
                    scroll={{ x: 'max-content' }}
                    className="labTable"
                    // Событие на строке
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: (event) => {
                                handleClickOpenDrawer()

                                const arr = [...event.currentTarget.children]
                                this.handleClickRow({
                                    param: arr[1]['innerText'],
                                    prop: arr[2]['innerText'],
                                    equipment: arr[3]['innerText']
                                })
                            }
                        }
                    }}
                />
            </>
        )
    }
}
