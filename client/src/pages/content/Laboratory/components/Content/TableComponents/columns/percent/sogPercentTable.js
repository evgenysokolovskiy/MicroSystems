import React from 'react'
import { CaretDownOutlined } from '@ant-design/icons'
// Antd
import { Table } from 'antd'

const { Column, ColumnGroup } = Table
export default function ({
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
            fabric: '',
            name: param,
            ph: (() => percent[param]['pH, %'])(),
            density: (() => percent[param]['Концентрация, %'])(),
            soda: (() => (percent[param]['Сода, г/л'] ? percent[param]['H2O, %'] : ''))(),
            bicarbonate: (() => percent[param]['Бикарбонат натрия, %'])(),
            nitrite: (() => percent[param]['Нитрит натрия, %'])(),
            degree: (() => percent[param]['Степень биопоражения'])(),
            corrosion: (() => percent[param]['Коррозия'])(),
            mechanicalAdmixture: (() => percent[param]['Механические примеси, %'])(),
            soap: (() => percent[param]['Мыло, г/л'])(),
            rowTotal: (() => rowTotal[param] && rowTotal[param]['percentTrue'])()
        }
        dataSource = [...dataSource, item]
    })

    let t = 0,
        f = 0
    Object.values(rowTotal).forEach((item) => {
        t += item['true']
        f += item['false']
    })

    const p = ((t / (t + f)) * 100).toFixed()

    const total = {
        key: 1000,
        fabric: '',
        name: 'ИТОГО',
        ph: (() => columnTotal['pH, %'] && columnTotal['pH, %']['percentTrue'])(),
        density: (() =>
            columnTotal['Концентрация, %'] && columnTotal['Концентрация, %']['percentTrue'])(),
        soda: (() => columnTotal['Сода, г/л'] && columnTotal['Сода, г/л']['percentTrue'])(),
        bicarbonate: (() =>
            columnTotal['Бикарбонат натрия, %'] &&
            columnTotal['Бикарбонат натрия, %']['percentTrue'])(),
        nitrite: (() =>
            columnTotal['Нитрит натрия, %'] && columnTotal['Нитрит натрия, %']['percentTrue'])(),
        degree: (() =>
            columnTotal['Степень биопоражения'] &&
            columnTotal['Степень биопоражения']['percentTrue'])(),
        corrosion: (() => columnTotal['Коррозия'] && columnTotal['Коррозия']['percentTrue'])(),
        mechanicalAdmixture: (() =>
            columnTotal['Механические примеси, %'] &&
            columnTotal['Механические примеси, %']['percentTrue'])(),
        soap: (() => columnTotal['Мыло, г/л'] && columnTotal['Мыло, г/л']['percentTrue'])(),
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
                    onClick: (event) => {
                        handleChangeParam(record)
                    }
                }
            }}
        >
            {/*<Column title="Пр-во" dataIndex="fabric" key="fabric" width={80} align="center" />*/}

            <Column title="Наименование" dataIndex="name" key="name" width={200} align="center" />
            <ColumnGroup title="Контролируемые параметры">
                <Column
                    title={
                        percent[param] && Object.keys(percent[param]).includes('pH, %') ? (
                            <span>
                                <CaretDownOutlined
                                    style={{
                                        fontSize: '16px',
                                        color: '#000',
                                        cursor: 'pointer'
                                    }}
                                />{' '}
                                pH, %
                            </span>
                        ) : (
                            'pH, %'
                        )
                    }
                    name="pH, %"
                    dataIndex="ph"
                    key="ph"
                    width={50}
                    align="center"
                    className={prop === 'pH, %' ? 'selected' : null}
                    onHeaderCell={(column) => {
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
                        Object.keys(percent[param]).includes('Концентрация, %') ? (
                            <span>
                                <CaretDownOutlined
                                    style={{
                                        fontSize: '16px',
                                        color: '#000',
                                        cursor: 'pointer'
                                    }}
                                />{' '}
                                Концентрация, %
                            </span>
                        ) : (
                            'Концентрация, %'
                        )
                    }
                    name="Концентрация, %"
                    dataIndex="density"
                    key="density"
                    width={50}
                    align="center"
                    className={prop === 'Концентрация, %' ? 'selected' : null}
                    onHeaderCell={(column) => {
                        return {
                            onClick: () => {
                                handleChangeProp(column)
                            }
                        }
                    }}
                />
                <Column
                    title={
                        percent[param] && Object.keys(percent[param]).includes('Сода, г/л') ? (
                            <span>
                                <CaretDownOutlined
                                    style={{
                                        fontSize: '16px',
                                        color: '#000',
                                        cursor: 'pointer'
                                    }}
                                />{' '}
                                Сода, г/л
                            </span>
                        ) : (
                            'Сода, г/л'
                        )
                    }
                    name="Сода, г/л"
                    dataIndex="soda"
                    key="soda"
                    width={50}
                    align="center"
                    className={prop === 'Сода, г/л' ? 'selected' : null}
                    onHeaderCell={(column) => {
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
                        Object.keys(percent[param]).includes('Бикарбонат натрия, %') ? (
                            <span>
                                <CaretDownOutlined
                                    style={{
                                        fontSize: '16px',
                                        color: '#000',
                                        cursor: 'pointer'
                                    }}
                                />{' '}
                                Бикарбонат натрия, %
                            </span>
                        ) : (
                            'Бикарбонат натрия, %'
                        )
                    }
                    name="Бикарбонат натрия, %"
                    dataIndex="bicarbonate"
                    key="bicarbonate"
                    width={50}
                    align="center"
                    className={prop === 'Бикарбонат натрия, %' ? 'selected' : null}
                    onHeaderCell={(column) => {
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
                        Object.keys(percent[param]).includes('Нитрит натрия, %') ? (
                            <span>
                                <CaretDownOutlined
                                    style={{
                                        fontSize: '16px',
                                        color: '#000',
                                        cursor: 'pointer'
                                    }}
                                />{' '}
                                Нитрит натрия, %
                            </span>
                        ) : (
                            'Нитрит натрия, %'
                        )
                    }
                    name="Нитрит натрия, %"
                    dataIndex="nitrite"
                    key="nitrite"
                    width={50}
                    align="center"
                    className={prop === 'Нитрит натрия, %' ? 'selected' : null}
                    onHeaderCell={(column) => {
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
                        Object.keys(percent[param]).includes('Степень биопоражения') ? (
                            <span>
                                <CaretDownOutlined
                                    style={{
                                        fontSize: '16px',
                                        color: '#000',
                                        cursor: 'pointer'
                                    }}
                                />{' '}
                                Степень биопоражения
                            </span>
                        ) : (
                            'Степень биопоражения'
                        )
                    }
                    name="Степень биопоражения"
                    dataIndex="degree"
                    key="degree"
                    width={50}
                    align="center"
                    className={prop === 'Степень биопоражения' ? 'selected' : null}
                    onHeaderCell={(column) => {
                        return {
                            onClick: () => {
                                handleChangeProp(column)
                            }
                        }
                    }}
                />
                <Column
                    title={
                        percent[param] && Object.keys(percent[param]).includes('Коррозия') ? (
                            <span>
                                <CaretDownOutlined
                                    style={{
                                        fontSize: '16px',
                                        color: '#000',
                                        cursor: 'pointer'
                                    }}
                                />{' '}
                                Коррозия
                            </span>
                        ) : (
                            'Коррозия'
                        )
                    }
                    name="Коррозия"
                    dataIndex="corrosion"
                    key="corrosion"
                    width={50}
                    align="center"
                    className={prop === 'Коррозия' ? 'selected' : null}
                    onHeaderCell={(column) => {
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
                    onHeaderCell={(column) => {
                        return {
                            onClick: () => {
                                handleChangeProp(column)
                            }
                        }
                    }}
                />
                <Column
                    title={
                        percent[param] && Object.keys(percent[param]).includes('Мыло, г/л') ? (
                            <span>
                                <CaretDownOutlined
                                    style={{
                                        fontSize: '16px',
                                        color: '#000',
                                        cursor: 'pointer'
                                    }}
                                />{' '}
                                Мыло, г/л
                            </span>
                        ) : (
                            'Мыло, г/л'
                        )
                    }
                    name="Мыло, г/л"
                    dataIndex="soap"
                    key="soap"
                    width={50}
                    align="center"
                    className={prop === 'Мыло, г/л' ? 'selected' : null}
                    onHeaderCell={(column) => {
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
