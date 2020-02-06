import React from 'react'
// Antd
import { Table } from 'antd'

export default function(props) {
    const { check } = props

    let columns = check['columns']
    let dataSource = check['dataSource']

    if (check) {
    }

    return (
        <>
            <Table columns={columns} dataSource={dataSource} bordered />
        </>
    )
}
