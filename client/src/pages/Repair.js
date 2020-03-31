import React, { lazy } from 'react'
import { Link } from 'react-router-dom'
// Antd
import { Layout, Icon } from 'antd'
// Utils
const Modal = lazy(() => import('./utils/Modal/App'))
const Footer = lazy(() => import('./utils/Footer/App'))
// Content
const Content = lazy(() => import('./content/Repair/App'))

export default function App() {
    return (
        <Layout>
            <Modal />
            <div
                style={{
                    minHeight: '3vh',
                    paddingRight: '20px',
                    color: '#222',
                    display: 'flex',
                    flexFlow: 'row wrap',
                    justifyContent: 'flex-end',
                    alignItems: 'center'
                }}
            >
                <Link to="/">
                    <Icon type="home" style={{ fontSize: '16px', textAlign: 'right' }} />
                </Link>
            </div>
            <Content />
            <Footer />
        </Layout>
    )
}
