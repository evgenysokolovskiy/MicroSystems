import React from 'react'
import { connect } from 'react-redux'
import { fetchDataMiddleware } from './middlewares/fetchDataMiddleware'
import {
    fetchCheckForGeneralUseMiddleware,
    fetchCheckForAntdMiddleware
} from './middlewares/fetchCheckMiddleware'
import { fetchSchemeMiddleware } from './middlewares/fetchSchemeMiddleware'
import { fetchJoinTechnologyFactMiddleware } from './middlewares/fetchJoinTechnologyFactMiddleware'

class Api extends React.Component {
    componentDidMount() {
        this.props.fetchDataMiddleware()
        this.props.fetchCheckForGeneralUseMiddleware()
        this.props.fetchCheckForAntdMiddleware()
        this.props.fetchSchemeMiddleware()
        this.props.fetchJoinTechnologyFactMiddleware()
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
    fetchJoinTechnologyFactMiddleware
}

export default connect(null, matDispatchToProps)(Api)
