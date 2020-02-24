import React from 'react'
import { connect } from 'react-redux'
import { fetchDataMiddleware } from './middlewares/fetchDataMiddleware'
import {
    fetchCheckForGeneralUseMiddleware,
    fetchCheckForAntdMiddleware
} from './middlewares/fetchCheckMiddleware'
import { fetchSchemeMiddleware } from './middlewares/fetchSchemeMiddleware'
import { fetchTechnologyMiddleware } from './middlewares/fetchTechnologyMiddleware'

class Api extends React.Component {
    componentDidMount() {
        this.props.fetchDataMiddleware()
        this.props.fetchCheckForGeneralUseMiddleware()
        this.props.fetchCheckForAntdMiddleware()
        this.props.fetchSchemeMiddleware()
        this.props.fetchTechnologyMiddleware()
    }

    render() {
        return false
    }
}

const matDispatchToProps = {
    fetchDataMiddleware,
    fetchCheckForGeneralUseMiddleware,
    fetchCheckForAntdMiddleware,
    fetchSchemeMiddleware,
    fetchTechnologyMiddleware
}

export default connect(null, matDispatchToProps)(Api)
