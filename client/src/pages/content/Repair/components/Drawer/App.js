import React, { Suspense, lazy } from 'react'
import { Drawer } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

const InfoEquipment = lazy(() => import('./InfoEquipment'))

export const App = (props) => {
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
                            <LoadingOutlined
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
