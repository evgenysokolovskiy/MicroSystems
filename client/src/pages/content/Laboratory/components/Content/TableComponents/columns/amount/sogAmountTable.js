import React, { PureComponent } from 'react'
// Antd
import { Table } from 'antd'
import { CaretDownOutlined } from '@ant-design/icons'
const { Column, ColumnGroup } = Table

export default function({ amount, param, prop, handleChangeProp, handleChangeParam }) {
    let dataSource = []
    Object.keys(amount).forEach((param, i) => {
        const count = ++i

        const item = {
            key: count,
            fabric: '',
            name: param,
            phTrue: (() => amount[param]['pH, %'] && amount[param]['pH, %']['true'])(),
            phFalse: (() => amount[param]['pH, %'] && amount[param]['pH, %']['false'])(),
            densityTrue: (() =>
                amount[param]['Концентрация, %'] && amount[param]['Концентрация, %']['true'])(),
            densityFalse: (() =>
                amount[param]['Концентрация, %'] && amount[param]['Концентрация, %']['false'])(),
            sodaTrue: (() => amount[param]['Сода, г/л'] && amount[param]['Сода, г/л']['true'])(),
            sodaFalse: (() => amount[param]['Сода, г/л'] && amount[param]['Сода, г/л']['false'])(),
            bicarbonateTrue: (() =>
                amount[param]['Бикарбонат натрия, %'] &&
                amount[param]['Бикарбонат натрия, %']['true'])(),
            bicarbonateFalse: (() =>
                amount[param]['Бикарбонат натрия, %'] &&
                amount[param]['Бикарбонат натрия, %']['false'])(),
            nitriteTrue: (() =>
                amount[param]['Нитрит натрия, %'] && amount[param]['Нитрит натрия, %']['true'])(),
            nitriteFalse: (() =>
                amount[param]['Нитрит натрия, %'] && amount[param]['Нитрит натрия, %']['false'])(),
            degreeTrue: (() =>
                amount[param]['Степень биопоражения'] &&
                amount[param]['Степень биопоражения']['true'])(),
            degreeFalse: (() =>
                amount[param]['Степень биопоражения'] &&
                amount[param]['Степень биопоражения']['false'])(),
            corrosionTrue: (() => amount[param]['Коррозия'] && amount[param]['Коррозия']['true'])(),
            corrosionFalse: (() =>
                amount[param]['Коррозия'] && amount[param]['Коррозия']['false'])(),
            mechanicalAdmixtureTrue: (() =>
                amount[param]['Механические примеси, %'] &&
                amount[param]['Механические примеси, %']['true'])(),
            mechanicalAdmixtureFalse: (() =>
                amount[param]['Механические примеси, %'] &&
                amount[param]['Механические примеси, %']['false'])()
        }
        dataSource = [...dataSource, item]
    })

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
                <ColumnGroup
                    title={
                        amount[param] && Object.keys(amount[param]).includes('pH, %') ? (
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
                        dataIndex="phTrue"
                        key="phTrue"
                        width={30}
                        align="center"
                        className={prop === 'pH, %' ? 'true' : null}
                    />
                    <Column
                        title="-"
                        dataIndex="phFalse"
                        key="phFalse"
                        width={30}
                        align="center"
                        className={prop === 'pH, %' ? 'false' : null}
                    />
                </ColumnGroup>

                <ColumnGroup
                    title={
                        amount[param] && Object.keys(amount[param]).includes('Концентрация, %') ? (
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
                        dataIndex="densityTrue"
                        key="densityTrue"
                        width={30}
                        align="center"
                        className={prop === 'Концентрация, %' ? 'true' : null}
                    />
                    <Column
                        title="-"
                        dataIndex="densityFalse"
                        key="densityFalse"
                        width={30}
                        align="center"
                        className={prop === 'Концентрация, %' ? 'false' : null}
                    />
                </ColumnGroup>

                <ColumnGroup
                    title={
                        amount[param] && Object.keys(amount[param]).includes('Сода, г/л') ? (
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
                        dataIndex="sodaTrue"
                        key="densityTrue"
                        width={30}
                        align="center"
                        className={prop === 'Сода, г/л' ? 'true' : null}
                    />
                    <Column
                        title="-"
                        dataIndex="sodaFalse"
                        key="densityFalse"
                        width={30}
                        align="center"
                        className={prop === 'Сода, г/л' ? 'false' : null}
                    />
                </ColumnGroup>

                <ColumnGroup
                    title={
                        amount[param] &&
                        Object.keys(amount[param]).includes('Бикарбонат натрия, %') ? (
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
                        dataIndex="bicarbonateTrue"
                        key="bicarbonateTrue"
                        width={30}
                        align="center"
                        className={prop === 'Бикарбонат натрия, %' ? 'true' : null}
                    />
                    <Column
                        title="-"
                        dataIndex="bicarbonateFalse"
                        key="bicarbonateFalse"
                        width={30}
                        align="center"
                        className={prop === 'Бикарбонат натрия, %' ? 'false' : null}
                    />
                </ColumnGroup>

                <ColumnGroup
                    title={
                        amount[param] && Object.keys(amount[param]).includes('Нитрит натрия, %') ? (
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
                        dataIndex="nitriteTrue"
                        key="densityTrue"
                        width={30}
                        align="center"
                        className={prop === 'Нитрит натрия, %' ? 'true' : null}
                    />
                    <Column
                        title="-"
                        dataIndex="nitriteFalse"
                        key="densityFalse"
                        width={30}
                        align="center"
                        className={prop === 'Нитрит натрия, %' ? 'false' : null}
                    />
                </ColumnGroup>

                <ColumnGroup
                    title={
                        amount[param] &&
                        Object.keys(amount[param]).includes('Степень биопоражения') ? (
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
                        dataIndex="degreeTrue"
                        key="degreeTrue"
                        width={30}
                        align="center"
                        className={prop === 'Степень биопоражения' ? 'true' : null}
                    />
                    <Column
                        title="-"
                        dataIndex="degreeFalse"
                        key="degreeFalse"
                        width={30}
                        align="center"
                        className={prop === 'Степень биопоражения' ? 'false' : null}
                    />
                </ColumnGroup>

                <ColumnGroup
                    title={
                        amount[param] && Object.keys(amount[param]).includes('Коррозия') ? (
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
                        dataIndex="corrosionTrue"
                        key="corrosionTrue"
                        width={30}
                        align="center"
                        className={prop === 'Коррозия' ? 'true' : null}
                    />
                    <Column
                        title="-"
                        dataIndex="corrosionFalse"
                        key="corrosionFalse"
                        width={30}
                        align="center"
                        className={prop === 'Коррозия' ? 'false' : null}
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
                                Механические примеси, %
                            </span>
                        ) : (
                            'Механические примеси, %'
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
            </ColumnGroup>
        </Table>
    )

    return table
}
