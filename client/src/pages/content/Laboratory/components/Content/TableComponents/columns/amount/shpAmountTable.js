import React from 'react'
// Antd
import { Table } from 'antd'
import { CaretDownOutlined } from '@ant-design/icons'
const { Column, ColumnGroup } = Table

export default function({
    amount,
    param,
    prop,
    rowTotal,
    columnTotal,
    handleChangeProp,
    handleChangeParam
}) {
    let dataSource = []
    Object.keys(amount).forEach((param, i) => {
        const count = ++i

        const item = {
            key: count,
            fabric: '',
            name: param,
            inhibitorTrue: (() =>
                amount[param]['Ингибитор, %'] && amount[param]['Ингибитор, %']['true'])(),
            inhibitorFalse: (() =>
                amount[param]['Ингибитор, %'] && amount[param]['Ингибитор, %']['false'])(),
            viscosityTrue: (() =>
                amount[param]['Вязкость, мм2/сек'] && amount[param]['Вязкость, мм2/сек']['true'])(),
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
                amount[param]['Кислотное число, мг.кон']['false'])(),
            rowTotal: (() => rowTotal[param] && rowTotal[param]['all'])(),
            rowTotalTrue: (() => rowTotal[param] && rowTotal[param]['true'])(),
            rowTotalFalse: (() => rowTotal[param] && rowTotal[param]['false'])()
        }
        dataSource = [...dataSource, item]
    })

    let t = 0,
        f = 0
    Object.values(rowTotal).forEach(item => {
        t += item['true']
        f += item['false']
    })

    const total = {
        key: 1000,
        fabric: '',
        name: 'ИТОГО',
        inhibitorTrue: (() =>
            columnTotal['Ингибитор, %'] && columnTotal['Ингибитор, %']['percentTrue'])(),
        inhibitorFalse: (() =>
            columnTotal['Ингибитор, %'] && columnTotal['Ингибитор, %']['false'])(),
        viscosityTrue: (() =>
            columnTotal['Вязкость, мм2/сек'] && columnTotal['Вязкость, мм2/сек']['true'])(),
        viscosityFalse: (() =>
            columnTotal['Вязкость, мм2/сек'] && columnTotal['Вязкость, мм2/сек']['false'])(),
        h2oTrue: (() => columnTotal['H2O, %'] && columnTotal['H2O, %']['true'])(),
        h2oFalse: (() => columnTotal['H2O, %'] && columnTotal['H2O, %']['false'])(),
        mechanicalAdmixtureTrue: (() =>
            columnTotal['Механические примеси, %'] &&
            columnTotal['Механические примеси, %']['true'])(),
        mechanicalAdmixtureFalse: (() =>
            columnTotal['Механические примеси, %'] &&
            columnTotal['Механические примеси, %']['false'])(),
        metalInclusionsTrue: (() =>
            columnTotal['Металлические включения'] &&
            columnTotal['Металлические включения']['true'])(),
        metalInclusionsFalse: (() =>
            columnTotal['Металлические включения'] &&
            columnTotal['Металлические включения']['false'])(),
        flashPointTrue: (() =>
            columnTotal['t вспышки, не менее град С'] &&
            columnTotal['t вспышки, не менее град С']['true'])(),
        flashPointFalse: (() =>
            columnTotal['t вспышки, не менее град С'] &&
            columnTotal['t вспышки, не менее град С']['false'])(),
        acidNumberTrue: (() =>
            columnTotal['Кислотное число, мг.кон'] &&
            columnTotal['Кислотное число, мг.кон']['true'])(),
        acidNumberFalse: (() =>
            columnTotal['Кислотное число, мг.кон'] &&
            columnTotal['Кислотное число, мг.кон']['false'])(),
        rowTotalTrue: t,
        rowTotalFalse: f,
        rowTotal: t + f
    }

    dataSource = [...dataSource, total]

    const table = (
        <Table
            dataSource={dataSource}
            bordered
            size="small"
            pagination={false}
            scroll={{ x: 'max-content' }}
            className="labTable"
            rowClassName={(record, index) => record['name'] === param && 'selected'}
            onRow={(record, rowIndex) => {
                return {
                    onClick: event => {
                        handleChangeParam(record)
                    }
                }
            }}
        >
            {/*<Column title="Пр-во" dataIndex="fabric" key="fabric" width={80} align="center" />*/}
            <Column title="Наименование" dataIndex="name" key="name" width={200} align="center" />
            <ColumnGroup title="Контролируемые параметры">
                <ColumnGroup
                    title={
                        amount[param] && Object.keys(amount[param]).includes('Ингибитор, %') ? (
                            <span>
                                <CaretDownOutlined
                                    style={{
                                        fontSize: '16px',
                                        color: '#000',
                                        cursor: 'pointer'
                                    }}
                                />{' '}
                                Ингибитор, %
                            </span>
                        ) : (
                            'Ингибитор, %'
                        )
                    }
                    name="Ингибитор, %"
                    onHeaderCell={column => {
                        return {
                            onClick: () => {
                                handleChangeProp(column)
                            }
                        }
                    }}
                >
                    <Column
                        title="+"
                        dataIndex="inhibitorTrue"
                        key="inhibitorTrue"
                        width={30}
                        align="center"
                        className={prop === 'Ингибитор, %' ? 'true' : null}
                    />
                    <Column
                        title="-"
                        dataIndex="inhibitorFalse"
                        key="inhibitorFalse"
                        width={30}
                        align="center"
                        className={prop === 'Ингибитор, %' ? 'false' : null}
                    />
                </ColumnGroup>

                <ColumnGroup
                    title={
                        amount[param] &&
                        Object.keys(amount[param]).includes('Вязкость, мм2/сек') ? (
                            <span>
                                <CaretDownOutlined
                                    style={{
                                        fontSize: '16px',
                                        color: '#000',
                                        cursor: 'pointer'
                                    }}
                                />{' '}
                                Вязкость, мм2/сек
                            </span>
                        ) : (
                            'Вязкость, мм2/сек'
                        )
                    }
                    name="Вязкость, мм2/сек"
                    onHeaderCell={column => {
                        return {
                            onClick: () => {
                                handleChangeProp(column)
                            }
                        }
                    }}
                >
                    <Column
                        title="+"
                        dataIndex="viscosityTrue"
                        key="viscosityTrue"
                        width={30}
                        align="center"
                        className={prop === 'Вязкость, мм2/сек' ? 'true' : null}
                    />
                    <Column
                        title="-"
                        dataIndex="viscosityFalse"
                        key="viscosityFalse"
                        width={30}
                        align="center"
                        className={prop === 'Вязкость, мм2/сек' ? 'false' : null}
                    />
                </ColumnGroup>

                <ColumnGroup
                    title={
                        amount[param] && Object.keys(amount[param]).includes('H2O, %') ? (
                            <span>
                                <CaretDownOutlined
                                    style={{
                                        fontSize: '16px',
                                        color: '#000',
                                        cursor: 'pointer'
                                    }}
                                />{' '}
                                H2O, %
                            </span>
                        ) : (
                            'H2O, %'
                        )
                    }
                    name="H2O, %"
                    onHeaderCell={column => {
                        return {
                            onClick: () => {
                                handleChangeProp(column)
                            }
                        }
                    }}
                >
                    <Column
                        title="+"
                        dataIndex="h2oTrue"
                        key="h2oTrue"
                        width={30}
                        align="center"
                        className={prop === 'H2O, %' ? 'true' : null}
                    />
                    <Column
                        title="-"
                        dataIndex="h2oFalse"
                        key="h2oFalse"
                        width={30}
                        align="center"
                        className={prop === 'H2O, %' ? 'false' : null}
                    />
                </ColumnGroup>

                <ColumnGroup
                    title={
                        amount[param] &&
                        Object.keys(amount[param]).includes('Механические примеси, %') ? (
                            <span>
                                <CaretDownOutlined
                                    style={{
                                        fontSize: '16px',
                                        color: '#000',
                                        cursor: 'pointer'
                                    }}
                                />{' '}
                                Механ. примеси, %
                            </span>
                        ) : (
                            'Механ. примеси, %'
                        )
                    }
                    name="Механические примеси, %"
                    onHeaderCell={column => {
                        return {
                            onClick: () => {
                                handleChangeProp(column)
                            }
                        }
                    }}
                >
                    <Column
                        title="+"
                        dataIndex="mechanicalAdmixtureTrue"
                        key="mechanicalAdmixtureTrue"
                        width={30}
                        align="center"
                        className={prop === 'Механические примеси, %' ? 'true' : null}
                    />
                    <Column
                        title="-"
                        dataIndex="mechanicalAdmixtureFalse"
                        key="mechanicalAdmixtureFalse"
                        width={30}
                        align="center"
                        className={prop === 'Механические примеси, %' ? 'false' : null}
                    />
                </ColumnGroup>

                <ColumnGroup
                    title={
                        amount[param] &&
                        Object.keys(amount[param]).includes('Металлические включения') ? (
                            <span>
                                <CaretDownOutlined
                                    style={{
                                        fontSize: '16px',
                                        color: '#000',
                                        cursor: 'pointer'
                                    }}
                                />{' '}
                                Мет.включения
                            </span>
                        ) : (
                            'Мет.включения'
                        )
                    }
                    name="Металлические включения"
                    onHeaderCell={column => {
                        return {
                            onClick: () => {
                                handleChangeProp(column)
                            }
                        }
                    }}
                >
                    <Column
                        title="+"
                        dataIndex="metalInclusionsTrue"
                        key="metalInclusionsTrue"
                        width={30}
                        align="center"
                        className={prop === 'Металлические включения' ? 'true' : null}
                    />
                    <Column
                        title="-"
                        dataIndex="metalInclusionsFalse"
                        key="metalInclusionsFalse"
                        width={30}
                        align="center"
                        className={prop === 'Металлические включения' ? 'false' : null}
                    />
                </ColumnGroup>

                <ColumnGroup
                    title={
                        amount[param] &&
                        Object.keys(amount[param]).includes('t вспышки, не менее град С') ? (
                            <span>
                                <CaretDownOutlined
                                    style={{
                                        fontSize: '16px',
                                        color: '#000',
                                        cursor: 'pointer'
                                    }}
                                />{' '}
                                t всп,не менее С
                            </span>
                        ) : (
                            't всп,не менее С'
                        )
                    }
                    name="t вспышки, не менее град С"
                    onHeaderCell={column => {
                        return {
                            onClick: () => {
                                handleChangeProp(column)
                            }
                        }
                    }}
                >
                    <Column
                        title="+"
                        dataIndex="flashPointTrue"
                        key="flashPointTrue"
                        width={30}
                        align="center"
                        className={prop === 't вспышки, не менее град С' ? 'true' : null}
                    />
                    <Column
                        title="-"
                        dataIndex="flashPointFalse"
                        key="flashPointFalse"
                        width={30}
                        align="center"
                        className={prop === 't вспышки, не менее град С' ? 'false' : null}
                    />
                </ColumnGroup>

                <ColumnGroup
                    title={
                        amount[param] &&
                        Object.keys(amount[param]).includes('Кислотное число, мг.кон') ? (
                            <span>
                                <CaretDownOutlined
                                    style={{
                                        fontSize: '16px',
                                        color: '#000',
                                        cursor: 'pointer'
                                    }}
                                />{' '}
                                Кислот.число, мг.кон
                            </span>
                        ) : (
                            'Кислот.число, мг.кон'
                        )
                    }
                    name="Кислотное число, мг.кон"
                    onHeaderCell={column => {
                        return {
                            onClick: () => {
                                handleChangeProp(column)
                            }
                        }
                    }}
                >
                    <Column
                        title="+"
                        dataIndex="acidNumberTrue"
                        key="acidNumberTrue"
                        width={30}
                        align="center"
                        className={prop === 'Кислотное число, мг.кон' ? 'true' : null}
                    />
                    <Column
                        title="-"
                        dataIndex="acidNumberFalse"
                        key="acidNumberFalse"
                        width={30}
                        align="center"
                        className={prop === 'Кислотное число, мг.кон' ? 'false' : null}
                    />
                </ColumnGroup>
            </ColumnGroup>

            <ColumnGroup title="ИТОГО">
                <Column
                    title="+"
                    dataIndex="rowTotalTrue"
                    key="rowTotalTrue"
                    className="true"
                    width={30}
                    align="center"
                />
                <Column
                    title="-"
                    dataIndex="rowTotalFalse"
                    key="rowTotalFalse"
                    className="false"
                    width={30}
                    align="center"
                />
                <Column
                    title="&#8721;"
                    dataIndex="rowTotal"
                    key="rowTotal"
                    width={30}
                    align="center"
                />
            </ColumnGroup>
        </Table>
    )

    return table
}
