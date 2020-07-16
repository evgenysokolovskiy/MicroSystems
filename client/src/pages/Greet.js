import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
// Components
import Content from './content/Greet/App'
import Footer from './utils/Footer/App'
// Antd
import { Layout } from 'antd'

export class Greet extends PureComponent {
    render() {
        return (
            <Layout>
                <Content />
                <Footer />
            </Layout>
        )
    }
}

const mapDispatchToProps = {}

export default connect(null, mapDispatchToProps)(Greet)
