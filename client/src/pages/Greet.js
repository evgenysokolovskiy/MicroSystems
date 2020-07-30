import React, { PureComponent } from 'react'
// Компоненты
import Content from './content/Greet/App'
import Footer from './utils/Footer/App'
// Antd
import { Layout } from 'antd'

export const Greet = () => {
    return (
        <Layout>
            <Content />
            <Footer />
        </Layout>
    )
}
