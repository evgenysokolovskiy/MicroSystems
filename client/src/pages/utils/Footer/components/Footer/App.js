import React from 'react'
// Компоненты
import { CopyrightComponent } from './CopyrightComponent'
// Antd
import { Layout } from 'antd'
const { Footer } = Layout

export const App = () => {
    return (
        <Footer style={{ textAlign: 'center' }}>
            <CopyrightComponent />
        </Footer>
    )
}
