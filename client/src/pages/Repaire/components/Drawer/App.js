import React from 'react'
import { Drawer } from 'antd'
import { InfoEquipment } from './InfoEquipment'

export const App = props => {
    const { data, visible, handleClickCloseDrawer } = props

    return (
        <div>
            <Drawer
                width={'50vw'}
                title="Info Equipment"
                placement="right"
                closable={false}
                onClose={handleClickCloseDrawer}
                visible={visible}
            >
                <InfoEquipment data={data} />
            </Drawer>
        </div>
    )
}
