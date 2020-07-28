import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
// Components
import Modal from './utils/Modal/App'
import Header from './utils/Header/App'
import Footer from './utils/Footer/App'
import Content from './content/Laboratory/App'
// Antd
import { Layout } from 'antd'

export class Laboratory extends PureComponent {
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

const mapDispatchToProps = {}

export default connect(null, mapDispatchToProps)(Laboratory)
