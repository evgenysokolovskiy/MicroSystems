import React from 'react'
import { Drawer } from 'antd'
import ChartComponent from '../Content/ChartComponent'

export const App = props => {
    const { visible, handleClickCloseDrawer } = props

    return (
        <div>
            <Drawer
                width={'50vw'}
                title="Basic Drawer"
                placement="right"
                closable={false}
                onClose={handleClickCloseDrawer}
                visible={visible}
            >
                <ChartComponent />
            </Drawer>
        </div>
    )
}
