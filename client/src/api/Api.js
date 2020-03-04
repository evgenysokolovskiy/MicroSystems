import React from 'react'
import { connect } from 'react-redux'
import { fetchDataMiddleware } from './middlewares/fetchDataMiddleware'
import {
    fetchCheckForGeneralUseMiddleware,
    fetchCheckForAntdMiddleware
} from './middlewares/fetchCheckMiddleware'
import { fetchSchemeMiddleware } from './middlewares/fetchSchemeMiddleware'
import { fetchTechnologyMiddleware } from './middlewares/fetchTechnologyMiddleware'
import { fetchShpFactMiddleware } from './middlewares/fetchShpFactMiddleware'

class Api extends React.Component {
    componentDidMount() {
        this.props.fetchDataMiddleware()
        this.props.fetchCheckForGeneralUseMiddleware()
        this.props.fetchCheckForAntdMiddleware()
        this.props.fetchSchemeMiddleware()
        this.props.fetchTechnologyMiddleware()
        this.props.fetchShpFactMiddleware()
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
    fetchTechnologyMiddleware,
    fetchShpFactMiddleware
}

export default connect(null, matDispatchToProps)(Api)
