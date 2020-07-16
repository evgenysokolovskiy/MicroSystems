import React, { Suspense, lazy } from 'react'
// Компоненты
import MenuComponent from './MenuComponent'
// Antd
import { Layout } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import componentLoader from '../../../componentLoader'

const { Content } = Layout
const TableComponent = lazy(() => componentLoader(() => import('./TableComponent')))
const CheckComponent = lazy(() => componentLoader(() => import('./CheckComponent')))
const SchemeComponent = lazy(() => componentLoader(() => import('./SchemeComponent')))

export const App = (props) => {
    const {
        data,
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
                <Content style={{ minHeight: '92vh' }}>
                    {targetMenu && targetMenu.match(/plan/) && data && (
                        <Suspense fallback={<LoadingOutlined className="loading" />}>
                            <TableComponent
                                data={data}
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
