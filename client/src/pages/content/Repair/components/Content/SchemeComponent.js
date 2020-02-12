import React from 'react'
// Antd
import { Table } from 'antd'

export default function(props) {
    const { scheme } = props

    let columns = scheme['columns']
    let dataSource = scheme['dataSource']

    return (
        <>
            <Table
                columns={columns}
                dataSource={dataSource}
                pagination={false}
                size="small"
                scroll={{ x: 'max-content' }}
                bordered
            />
        </>
    )
}
