import React, { Suspense, lazy } from 'react'
// Компоненты
import { BreadcrumbComponent } from './BreadcrumbComponent'
import MenuComponent from './MenuComponent'
// Antd
import { Layout, Icon } from 'antd'

const { Content } = Layout
const TableComponent = lazy(() => import('./TableComponent'))
const CheckComponent = lazy(() => import('./CheckComponent'))

export const App = props => {
    const {
        data,
        check,
        targetMenu,
        handleClickMenu,
        handleClickRow,
        handleClickOpenDrawer
    } = props

    return (
        <Content style={{ padding: '0 10px' }}>
            <BreadcrumbComponent />
            <Layout
                style={{ /*padding: '24px 0',*/ background: '#fff' }}
                className="ant-layout-has-sider"
            >
                <MenuComponent handleClickMenu={handleClickMenu} />
                <Content style={{ /*padding: '0 24px',*/ minHeight: 280 }}>
                    {targetMenu && targetMenu.match(/plan/) && data && (
                        <Suspense
                            fallback={
                                <Icon
                                    type="loading"
                                    className="loading"
                                    style={{ fontSize: '20px', color: 'red' }}
                                />
                            }
                        >
                            <TableComponent
                                data={data}
                                targetMenu={targetMenu}
                                handleClickRow={handleClickRow}
                                handleClickOpenDrawer={handleClickOpenDrawer}
                                className={'table'}
                            />
                        </Suspense>
                    )}

                    {targetMenu && targetMenu.match(/check/) && check && (
                        <Suspense
                            fallback={
                                <Icon
                                    type="loading"
                                    className="loading"
                                    style={{ fontSize: '20px', color: 'red' }}
                                />
                            }
                        >
                            <CheckComponent check={check} />
                        </Suspense>
                    )}
                </Content>
            </Layout>
        </Content>
    )
}
