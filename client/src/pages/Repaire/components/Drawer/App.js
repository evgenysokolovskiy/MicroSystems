import React from 'react'
import { Drawer } from 'antd'
import { InfoEquipment } from './InfoEquipment'

export const App = props => {
    const { data, period, visible, handleClickCloseDrawer } = props

    return (
        <div>
            <Drawer
                width={'50vw'}
                placement="right"
                closable={false}
                onClose={handleClickCloseDrawer}
                visible={visible}
            >
                <InfoEquipment data={data} period={period} visible={visible} />
            </Drawer>
        </div>
    )
}
