import React, { Suspense, lazy } from 'react'
// Компоненты
import MenuComponent from './MenuComponent'
// Antd
import { Layout } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import componentLoader from '../../../componentLoader'

const { Content } = Layout
const AllEquipmentTableComponent = lazy(() =>
    componentLoader(() => import('./AllEquipmentTableComponent'))
)
const PlanTableComponent = lazy(() => componentLoader(() => import('./PlanTableComponent')))
const CheckComponent = lazy(() => componentLoader(() => import('./CheckComponent')))
const SchemeComponent = lazy(() => componentLoader(() => import('./SchemeComponent')))

export const App = (props) => {
    const {
        plan,
        equipment,
        checkForGeneralUse,
        checkForAntd,
        scheme,
        targetMenu,
        handleClickMenu,
        handleClickRow,
        handleClickOpenDrawer
    } = props

    return (
        <Content style={{ padding: '0 10px' }}>
            <Layout style={{ background: '#fff' }} className="ant-layout-has-sider">
                <MenuComponent handleClickMenu={handleClickMenu} />
                <Content style={{ minHeight: '88vh' }}>
                    {targetMenu && targetMenu.match(/equipment/) && equipment && (
                        <Suspense fallback={<LoadingOutlined className="loading" />}>
                            <AllEquipmentTableComponent
                                data={equipment}
                                targetMenu={targetMenu}
                                handleClickRow={handleClickRow}
                                handleClickOpenDrawer={handleClickOpenDrawer}
                                className={'table'}
                            />
                        </Suspense>
                    )}

                    {targetMenu && targetMenu.match(/plan/) && plan && (
                        <Suspense fallback={<LoadingOutlined className="loading" />}>
                            <PlanTableComponent
                                data={plan}
                                targetMenu={targetMenu}
                                handleClickRow={handleClickRow}
                                handleClickOpenDrawer={handleClickOpenDrawer}
                                className={'table'}
                            />
                        </Suspense>
                    )}

                    {targetMenu && targetMenu.match(/check/) && checkForAntd && (
                        <Suspense fallback={<LoadingOutlined className="loading" />}>
                            <CheckComponent checkForAntd={checkForAntd} />
                        </Suspense>
                    )}

                    {targetMenu && targetMenu.match(/scheme/) && scheme && (
                        <Suspense fallback={<LoadingOutlined className="loading" />}>
                            <SchemeComponent
                                scheme={scheme}
                                checkForGeneralUse={checkForGeneralUse}
                            />
                        </Suspense>
                    )}
                </Content>
            </Layout>
        </Content>
    )
}
