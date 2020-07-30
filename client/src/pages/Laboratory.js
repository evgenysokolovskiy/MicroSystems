import React from 'react'
// Компоненты
import Modal from './utils/Modal/App'
import Header from './utils/Header/App'
import Footer from './utils/Footer/App'
import Content from './content/Laboratory/App'
// Antd
import { Layout } from 'antd'

export const Laboratory = () => {
    return (
        <Layout>
            <Modal />
            <Header />
            <Content />
            <Footer />
        </Layout>
    )
}
