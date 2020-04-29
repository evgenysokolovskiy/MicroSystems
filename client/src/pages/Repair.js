import React, { lazy } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchDataMiddleware } from '../api/middlewares/fetchDataMiddleware'
import {
    fetchCheckForGeneralUseMiddleware,
    fetchCheckForAntdMiddleware
} from '../api/middlewares/fetchCheckMiddleware'
import { fetchSchemeMiddleware } from '../api/middlewares/fetchSchemeMiddleware'
// Antd
import { Layout } from 'antd'
import { HomeOutlined } from '@ant-design/icons'
// Utils
const Modal = lazy(() => import('./utils/Modal/App'))
const Footer = lazy(() => import('./utils/Footer/App'))
// Content
const Content = lazy(() => import('./content/Repair/App'))

export class App extends React.Component {
    componentDidMount() {
        const {
            fetchDataMiddleware,
            fetchCheckForGeneralUseMiddleware,
            fetchCheckForAntdMiddleware,
            fetchSchemeMiddleware
        } = this.props

        fetchDataMiddleware()
        fetchCheckForGeneralUseMiddleware()
        fetchCheckForAntdMiddleware()
        fetchSchemeMiddleware()
    }

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

const mapDispatchToProps = {
    fetchDataMiddleware,
    fetchCheckForGeneralUseMiddleware,
    fetchCheckForAntdMiddleware,
    fetchSchemeMiddleware
}

export default connect(null, mapDispatchToProps)(App)
