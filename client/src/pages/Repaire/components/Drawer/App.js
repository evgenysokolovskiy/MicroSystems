import React from 'react'
import { Drawer } from 'antd'
import { InfoEquipment } from './InfoEquipment'

export const App = props => {
    const { data, visible, handleClickCloseDrawer } = props

    return (
        <div>
            <Drawer
                width={'50vw'}
                title="Информация по оборудованию"
                placement="right"
                closable={false}
                onClose={handleClickCloseDrawer}
                visible={visible}
            >
                <InfoEquipment data={data} visible={visible} />
            </Drawer>
        </div>
    )
}
