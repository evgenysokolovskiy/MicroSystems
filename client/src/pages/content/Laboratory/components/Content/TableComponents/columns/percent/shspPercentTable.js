import React, { PureComponent } from 'react'
// Antd
import { Table } from 'antd'
import { CaretDownOutlined } from '@ant-design/icons'
const { Column, ColumnGroup } = Table

export default function({
    percent,
    param,
    prop,
    rowTotal,
    columnTotal,
    handleChangeProp,
    handleChangeParam
}) {
    let dataSource = []
    Object.keys(percent).forEach((param, i) => {
        const count = ++i
        const item = {
            key: count,
            fabric: 'СПиТК',
            name: param,
            inhibitor: (() => percent[param]['Ингибитор, %'])(),
            viscosity: (() => percent[param]['Вязкость, мм2/сек'])(),
            H2O: (() => (percent[param]['H2O, %'] ? percent[param]['H2O, %'] : ''))(),
            mechanicalAdmixture: (() => percent[param]['Механические примеси, %'])(),
            metalInclusions: (() => percent[param]['Металлические включения'])(),
            flashPoint: (() => percent[param]['t вспышки, не менее град С'])(),
            acidNumber: (() => percent[param]['Кислотное число, мг.кон'])(),
            rowTotal: (() => rowTotal[param] && rowTotal[param]['percentTrue'])()
        }
        dataSource = [...dataSource, item]
    })

    let t = 0,
        f = 0
    Object.values(rowTotal).forEach(item => {
        t += item['true']
        f += item['false']
    })

    const p = ((t / (t + f)) * 100).toFixed()

    const total = {
        key: 1000,
        fabric: 'ИТОГО',
        name: '',
        inhibitor: (() =>
            columnTotal['Ингибитор, %'] && columnTotal['Ингибитор, %']['percentTrue'])(),
        viscosity: (() =>
            columnTotal['Вязкость, мм2/сек'] && columnTotal['Вязкость, мм2/сек']['percentTrue'])(),
        H2O: (() => columnTotal['H2O, %'] && columnTotal['H2O, %']['percentTrue'])(),
        mechanicalAdmixture: (() =>
            columnTotal['Механические примеси, %'] &&
            columnTotal['Механические примеси, %']['percentTrue'])(),
        metalInclusions: (() =>
            columnTotal['Металлические включения'] &&
            columnTotal['Металлические включения']['percentTrue'])(),
        flashPoint: (() =>
            columnTotal['t вспышки, не менее град С'] &&
            columnTotal['t вспышки, не менее град С']['percentTrue'])(),
        acidNumber: (() =>
            columnTotal['Кислотное число, мг.кон'] &&
            columnTotal['Кислотное число, мг.кон']['percentTrue'])(),
        rowTotal: p
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
            <Column title="Пр-во" dataIndex="fabric" key="fabric" width={80} align="center" />

            <Column title="Наименование" dataIndex="name" key="name" width={200} align="center" />
            <ColumnGroup title="Контролируемые параметры">
                <Column
                    title={
                        percent[param] && Object.keys(percent[param]).includes('Ингибитор, %') ? (
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
                    dataIndex="inhibitor"
                    key="inhibitor"
                    width={50}
                    align="center"
                    className={prop === 'Ингибитор, %' ? 'selected' : null}
                    onHeaderCell={column => {
                        return {
                            onClick: () => {
                                handleChangeProp(column)
                            }
                        }
                    }}
                />
                <Column
                    title={
                        percent[param] &&
                        Object.keys(percent[param]).includes('Вязкость, мм2/сек') ? (
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
                    dataIndex="viscosity"
                    key="viscosity"
                    width={50}
                    align="center"
                    className={prop === 'Вязкость, мм2/сек' ? 'selected' : null}
                    onHeaderCell={column => {
                        return {
                            onClick: () => {
                                handleChangeProp(column)
                            }
                        }
                    }}
                />
                <Column
                    title={
                        percent[param] && Object.keys(percent[param]).includes('H2O, %') ? (
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
                    dataIndex="H2O"
                    key="H2O"
                    width={50}
                    align="center"
                    className={prop === 'H2O, %' ? 'selected' : null}
                    onHeaderCell={column => {
                        return {
                            onClick: () => {
                                handleChangeProp(column)
                            }
                        }
                    }}
                />
                <Column
                    title={
                        percent[param] &&
                        Object.keys(percent[param]).includes('Механические примеси, %') ? (
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
                    dataIndex="mechanicalAdmixture"
                    key="mechanicalAdmixture"
                    width={50}
                    align="center"
                    className={prop === 'Механические примеси, %' ? 'selected' : null}
                    onHeaderCell={column => {
                        return {
                            onClick: () => {
                                handleChangeProp(column)
                            }
                        }
                    }}
                />
                <Column
                    title={
                        percent[param] &&
                        Object.keys(percent[param]).includes('Металлические включения') ? (
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
                    dataIndex="metalInclusions"
                    key="metalInclusions"
                    width={50}
                    align="center"
                    className={prop === 'Металлические включения' ? 'selected' : null}
                    onHeaderCell={column => {
                        return {
                            onClick: () => {
                                handleChangeProp(column)
                            }
                        }
                    }}
                />
                <Column
                    title={
                        percent[param] &&
                        Object.keys(percent[param]).includes('t вспышки, не менее град С') ? (
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
                    dataIndex="flashPoint"
                    key="flashPoint"
                    width={50}
                    align="center"
                    className={prop === 't вспышки, не менее град С' ? 'selected' : null}
                    onHeaderCell={column => {
                        return {
                            onClick: () => {
                                handleChangeProp(column)
                            }
                        }
                    }}
                />
                <Column
                    title={
                        percent[param] &&
                        Object.keys(percent[param]).includes('Кислотное число, мг.кон') ? (
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
                    dataIndex="acidNumber"
                    key="acidNumber"
                    width={50}
                    align="center"
                    className={prop === 'Кислотное число, мг.кон' ? 'selected' : null}
                    onHeaderCell={column => {
                        return {
                            onClick: () => {
                                handleChangeProp(column)
                            }
                        }
                    }}
                />
            </ColumnGroup>
            <Column title="ИТОГО" dataIndex="rowTotal" key="rowTotal" width={80} align="center" />
        </Table>
    )

    return table
}
