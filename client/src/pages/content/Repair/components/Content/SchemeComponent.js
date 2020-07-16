import React from 'react'
// Antd
import { Table } from 'antd'
const OIL_LEAK = 'Течи масла (СОЖ)'

export default function (props) {
    const { scheme, checkForGeneralUse } = props

    let columns = scheme['columns']
    let dataSource = scheme['dataSource']

    let hasOilLeak = []
    checkForGeneralUse &&
        Object.entries(checkForGeneralUse).forEach((item) => {
            if (item[1][OIL_LEAK] === '+') hasOilLeak = [...hasOilLeak, item[0]]
        })

    const coloredColumns = columns.map((item) => {
        const coloredCell = {
            render(text) {
                return {
                    props: {
                        className: hasOilLeak.some((num) => String(num) === String(text))
                            ? 'false'
                            : ''
                    },
                    children: text
                }
            }
        }

        return { ...item, ...coloredCell }
    })

    return (
        <>
            <Table
                columns={coloredColumns}
                dataSource={dataSource}
                pagination={false}
                size="small"
                scroll={{ x: 'max-content' }}
                bordered
            />
        </>
    )
}
