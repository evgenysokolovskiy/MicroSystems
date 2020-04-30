import React, { lazy } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
// Antd
import { Layout } from 'antd'
import { HomeOutlined } from '@ant-design/icons'
// Utils
const Modal = lazy(() => import('./utils/Modal/App'))
const Footer = lazy(() => import('./utils/Footer/App'))
// Content
const Content = lazy(() => import('./content/Tech/App'))

export class App extends React.Component {
    render() {
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
                        <HomeOutlined style={{ fontSize: '16px', textAlign: 'right' }} />
                    </Link>
                </div>
                <Content />
                <Footer />
            </Layout>
        )
    }
}

const mapDispatchToProps = {}

export default connect(null, mapDispatchToProps)(App)
