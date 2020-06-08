import React, { PureComponent } from 'react'
// Antd
import { Table } from 'antd'

const { Column, ColumnGroup } = Table

export default class TableAmountComponent extends PureComponent {
    render() {
        const { amount } = this.props

        let dataSource = []
        Object.keys(amount).forEach((param, i) => {
            const count = ++i

            const item = {
                key: count,
                fabric: 'СПиТК',
                name: param,
                inhibitorTrue: (() =>
                    amount[param]['Ингибитор, %'] && amount[param]['Ингибитор, %']['true'])(),
                inhibitorFalse: (() =>
                    amount[param]['Ингибитор, %'] && amount[param]['Ингибитор, %']['false'])(),
                viscosityTrue: (() =>
                    amount[param]['Вязкость, мм2/сек'] &&
                    amount[param]['Вязкость, мм2/сек']['true'])(),
                viscosityFalse: (() =>
                    amount[param]['Вязкость, мм2/сек'] &&
                    amount[param]['Вязкость, мм2/сек']['false'])(),
                h2oTrue: (() => amount[param]['H2O, %'] && amount[param]['H2O, %']['true'])(),
                h2oFalse: (() => amount[param]['H2O, %'] && amount[param]['H2O, %']['false'])(),
                mechanicalAdmixtureTrue: (() =>
                    amount[param]['Механические примеси, %'] &&
                    amount[param]['Механические примеси, %']['true'])(),
                mechanicalAdmixtureFalse: (() =>
                    amount[param]['Механические примеси, %'] &&
                    amount[param]['Механические примеси, %']['false'])(),
                metalInclusionsTrue: (() =>
                    amount[param]['Металлические включения'] &&
                    amount[param]['Металлические включения']['true'])(),
                metalInclusionsFalse: (() =>
                    amount[param]['Металлические включения'] &&
                    amount[param]['Металлические включения']['false'])(),
                flashPointTrue: (() =>
                    amount[param]['t вспышки, не менее град С'] &&
                    amount[param]['t вспышки, не менее град С']['true'])(),
                flashPointFalse: (() =>
                    amount[param]['t вспышки, не менее град С'] &&
                    amount[param]['t вспышки, не менее град С']['false'])(),
                acidNumberTrue: (() =>
                    amount[param]['Кислотное число, мг.кон'] &&
                    amount[param]['Кислотное число, мг.кон']['true'])(),
                acidNumberFalse: (() =>
                    amount[param]['Кислотное число, мг.кон'] &&
                    amount[param]['Кислотное число, мг.кон']['false'])()
            }
            dataSource = [...dataSource, item]
        })

        return (
            <>
                <h4 style={{ paddingTop: 20, paddingLeft: 20 }}>
                    Журнал регистрации анализов нефтепродуктов СПиТК
                </h4>
                <Table
                    dataSource={dataSource}
                    bordered
                    size="small"
                    pagination={false}
                    scroll={{ x: 'max-content' }}
                    className="labTable"
                >
                    <Column
                        title="Пр-во"
                        dataIndex="fabric"
                        key="fabric"
                        width={80}
                        align="center"
                    />
                    <Column
                        title="Наименование"
                        dataIndex="name"
                        key="name"
                        width={200}
                        align="center"
                    />

                    <ColumnGroup title="Контролируемые параметры">
                        <ColumnGroup title="Ингибитор, %">
                            <Column
                                title="+"
                                dataIndex="inhibitorTrue"
                                key="inhibitorTrue"
                                width={30}
                                align="center"
                            />
                            <Column
                                title="-"
                                dataIndex="inhibitorFalse"
                                key="inhibitorFalse"
                                width={30}
                                align="center"
                            />
                        </ColumnGroup>

                        <ColumnGroup title="Вязкость, мм2/сек">
                            <Column
                                title="+"
                                dataIndex="viscosityTrue"
                                key="viscosityTrue"
                                width={30}
                                align="center"
                            />
                            <Column
                                title="-"
                                dataIndex="viscosityFalse"
                                key="viscosityFalse"
                                width={30}
                                align="center"
                            />
                        </ColumnGroup>

                        <ColumnGroup title="H2O, %">
                            <Column
                                title="+"
                                dataIndex="h2oTrue"
                                key="h2oTrue"
                                width={30}
                                align="center"
                            />
                            <Column
                                title="-"
                                dataIndex="h2oFalse"
                                key="h2oFalse"
                                width={30}
                                align="center"
                            />
                        </ColumnGroup>

                        <ColumnGroup title="Механ. примеси, %">
                            <Column
                                title="+"
                                dataIndex="mechanicalAdmixtureTrue"
                                key="mechanicalAdmixtureTrue"
                                width={30}
                                align="center"
                            />
                            <Column
                                title="-"
                                dataIndex="mechanicalAdmixtureFalse"
                                key="mechanicalAdmixtureFalse"
                                width={30}
                                align="center"
                            />
                        </ColumnGroup>

                        <ColumnGroup title="Мет.включения">
                            <Column
                                title="+"
                                dataIndex="metalInclusionsTrue"
                                key="metalInclusionsTrue"
                                width={30}
                                align="center"
                            />
                            <Column
                                title="-"
                                dataIndex="metalInclusionsFalse"
                                key="metalInclusionsFalse"
                                width={30}
                                align="center"
                            />
                        </ColumnGroup>

                        <ColumnGroup title="t всп,не менее С">
                            <Column
                                title="+"
                                dataIndex="flashPointTrue"
                                key="flashPointTrue"
                                width={30}
                                align="center"
                            />
                            <Column
                                title="-"
                                dataIndex="flashPointFalse"
                                key="flashPointFalse"
                                width={30}
                                align="center"
                            />
                        </ColumnGroup>

                        <ColumnGroup title="Кислот.число, мг.кон">
                            <Column
                                title="+"
                                dataIndex="acidNumberTrue"
                                key="acidNumberTrue"
                                width={30}
                                align="center"
                            />
                            <Column
                                title="-"
                                dataIndex="acidNumberFalse"
                                key="acidNumberFalse"
                                width={30}
                                align="center"
                            />
                        </ColumnGroup>
                    </ColumnGroup>
                </Table>
            </>
        )
    }
}
