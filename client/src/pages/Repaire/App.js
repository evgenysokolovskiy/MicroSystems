import React from 'react'
// Antd
import { Layout } from 'antd'
// Компоненты
import Header from './containers/Header'
import Content from './containers/Content'
import Footer from './containers/Footer'
// Стили
import './styles/index.css'

export default function Repaire() {
    return (
        <Layout>
            <Header />
            <Content />
            <Footer />
        </Layout>
    )
}
