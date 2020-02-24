import React, { Suspense, lazy } from 'react'
// Antd
import { Layout } from 'antd'
// Utils
const Header = lazy(() => import('./utils/Header/App'))
const Footer = lazy(() => import('./utils/Footer/App'))
// Content
const Content = lazy(() => import('./content/Tech/App'))

export default function App() {
    return (
        <Layout>
            <Header />
            <Content />
            <Footer />
        </Layout>
    )
}