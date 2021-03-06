import React from 'react'
// Antd
import { Layout } from 'antd'
// Компоненты
import Content from './containers/Content'
import Drawer from './containers/Drawer'
// Стили
import './styles/index.css'

export default function App() {
    return (
        <Layout>
            <Content />
            <Drawer />
        </Layout>
    )
}
