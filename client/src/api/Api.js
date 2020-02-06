import React from 'react'
import { connect } from 'react-redux'
import { fetchDataMiddleware } from './middlewares/fetchDataMiddleware'
import { fetchCheckMiddleware } from './middlewares/fetchCheckMiddleware'

class Api extends React.Component {
    componentDidMount() {
        this.props.fetchDataMiddleware()
        this.props.fetchCheckMiddleware()
    }

    render() {
        return false
    }
}

const matDispatchToProps = {
    fetchDataMiddleware,
    fetchCheckMiddleware
}

export default connect(null, matDispatchToProps)(Api)
