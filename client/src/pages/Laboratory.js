import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
// Components
import Modal from './utils/Modal/App'
import Footer from './utils/Footer/App'
import Content from './content/Laboratory/App'
// Antd
import { Layout } from 'antd'
import { HomeOutlined } from '@ant-design/icons'

export class Laboratory extends PureComponent {
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

export default connect(null, mapDispatchToProps)(Laboratory)
