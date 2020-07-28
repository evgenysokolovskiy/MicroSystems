import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { fetchDataMiddleware } from '../api/middlewares/fetchDataMiddleware'
import {
    fetchCheckForGeneralUseMiddleware,
    fetchCheckForAntdMiddleware
} from '../api/middlewares/fetchCheckMiddleware'
import { fetchSchemeMiddleware } from '../api/middlewares/fetchSchemeMiddleware'
// Components
import Modal from './utils/Modal/App'
import Header from './utils/Header/App'
import Footer from './utils/Footer/App'
import Content from './content/Repair/App'
// Antd
import { Layout } from 'antd'

export class Repair extends PureComponent {
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
                <Header />
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

export default connect(null, mapDispatchToProps)(Repair)
