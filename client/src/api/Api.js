import React from 'react'
import { connect } from 'react-redux'
import { fetchDataMiddleware } from './middlewares/fetchDataMiddleware'

class Api extends React.Component {
    componentDidMount() {
        this.props.fetchDataMiddleware()
    }

    render() {
        return false
    }
}

const matDispatchToProps = {
    fetchDataMiddleware
}

export default connect(null, matDispatchToProps)(Api)
