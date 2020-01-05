import React from 'react'
// Компоненты
import { BreadcrumbComponent } from './BreadcrumbComponent'
import { MenuComponent } from './MenuComponent'
import { TableComponent } from './TableComponent'
// Antd
import { Layout } from 'antd'
const { Content } = Layout

export const App = () => {
    return (
        <Content style={{ padding: '0 50px' }}>
            <BreadcrumbComponent />
            <Layout style={{ padding: '24px 0', background: '#fff' }}>
                <MenuComponent />
                <Content style={{ padding: '0 24px', minHeight: 280 }}>
                    <TableComponent />
                </Content>
            </Layout>
        </Content>
    )
}
