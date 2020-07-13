import React from 'react'
// Components
import Header from './utils/Header/App'
import Footer from './utils/Footer/App'
import Content from './content/Greet/App'
// Antd
import { Layout } from 'antd'

export default function App() {
    return (
        <Layout>
            <Header />
            <Content />
            <Footer />
        </Layout>
    )
}
