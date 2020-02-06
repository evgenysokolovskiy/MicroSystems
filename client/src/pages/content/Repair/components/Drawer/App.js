import React, { Suspense, lazy } from 'react'
import { Drawer, Icon } from 'antd'

const InfoEquipment = lazy(() => import('./InfoEquipment'))

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
                {visible && (
                    <Suspense
                        fallback={
                            <Icon
                                type="loading"
                                className="loading"
                                style={{ fontSize: '20px', color: 'red' }}
                            />
                        }
                    >
                        <InfoEquipment data={data} period={period} visible={visible} />
                    </Suspense>
                )}
            </Drawer>
        </div>
    )
}
