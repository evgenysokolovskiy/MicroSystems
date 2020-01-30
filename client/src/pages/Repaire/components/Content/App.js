import React from 'react'
// Компоненты
import { BreadcrumbComponent } from './BreadcrumbComponent'
import { MenuComponent } from './MenuComponent'
import { TableComponent } from './TableComponent'
import ChartComponent from './ChartComponent'
// Antd
import { Layout } from 'antd'

const { Content } = Layout

export const App = props => {
    const { data } = props
    return (
        <Content style={{ padding: '0 10px' }}>
            <BreadcrumbComponent />
            <Layout style={{ /*padding: '24px 0',*/ background: '#fff' }}>
                <MenuComponent />
                <Content style={{ /*padding: '0 24px',*/ minHeight: 280 }}>
                    <TableComponent data={data} className={'table'} />
                    {/*<ChartComponent />*/}
                </Content>
            </Layout>
        </Content>
    )
}
