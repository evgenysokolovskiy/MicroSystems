import React from 'react'
import { connect } from 'react-redux'
import { fetchDataMiddleware } from './middlewares/fetchDataMiddleware'
import {
    fetchCheckForGeneralUseMiddleware,
    fetchCheckForAntdMiddleware
} from './middlewares/fetchCheckMiddleware'
import { fetchSchemeMiddleware } from './middlewares/fetchSchemeMiddleware'
import { fetchJoinTechnologyFactMiddleware } from './middlewares/fetchJoinTechnologyFactMiddleware'
import { fetchQualityProductionMiddleware } from './middlewares/fetchQualityProductionMiddleware'
import { fetchIntervalMiddleware } from './middlewares/fetchIntervalMiddleware'

class Api extends React.Component {
    componentDidMount() {
        const {
            fetchDataMiddleware,
            fetchCheckForGeneralUseMiddleware,
            fetchCheckForAntdMiddleware,
            fetchSchemeMiddleware,
            fetchJoinTechnologyFactMiddleware,
            fetchQualityProductionMiddleware,
            fetchIntervalMiddleware
        } = this.props

        fetchDataMiddleware()
        fetchCheckForGeneralUseMiddleware()
        fetchCheckForAntdMiddleware()
        fetchSchemeMiddleware()
        fetchJoinTechnologyFactMiddleware()
        fetchQualityProductionMiddleware()
        fetchIntervalMiddleware()
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
    fetchJoinTechnologyFactMiddleware,
    fetchQualityProductionMiddleware,
    fetchIntervalMiddleware
}

export default connect(null, matDispatchToProps)(Api)
