import React, { lazy } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchJoinTechnologyFactMiddleware } from '../api/middlewares/fetchJoinTechnologyFactMiddleware'
import { fetchQualityProductionMiddleware } from '../api/middlewares/fetchQualityProductionMiddleware'
import { fetchIntervalMiddleware } from '../api/middlewares/fetchIntervalMiddleware'
import { fetchMtimeMiddleware } from '../api/middlewares/fetchMtimeMiddleware'
// Antd
import { Layout } from 'antd'
import { HomeOutlined } from '@ant-design/icons'
// Utils
const Modal = lazy(() => import('./utils/Modal/App'))
const Footer = lazy(() => import('./utils/Footer/App'))
// Content
const Content = lazy(() => import('./content/Tech/App'))

export class App extends React.Component {
    componentDidMount() {
        const {
            fetchJoinTechnologyFactMiddleware,
            fetchQualityProductionMiddleware,
            fetchIntervalMiddleware,
            fetchMtimeMiddleware
        } = this.props

        fetchJoinTechnologyFactMiddleware()
        fetchQualityProductionMiddleware()
        fetchIntervalMiddleware()
        fetchMtimeMiddleware()
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
    fetchJoinTechnologyFactMiddleware,
    fetchQualityProductionMiddleware,
    fetchIntervalMiddleware,
    fetchMtimeMiddleware
}

export default connect(null, mapDispatchToProps)(App)
