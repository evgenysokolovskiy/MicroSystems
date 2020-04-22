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
import { fetchMtimeMiddleware } from './middlewares/fetchMtimeMiddleware'

class Api extends React.Component {
    componentDidMount() {
        const {
            fetchDataMiddleware,
            fetchCheckForGeneralUseMiddleware,
            fetchCheckForAntdMiddleware,
            fetchSchemeMiddleware,
            fetchJoinTechnologyFactMiddleware,
            fetchQualityProductionMiddleware,
            fetchIntervalMiddleware,
            fetchMtimeMiddleware
        } = this.props

        fetchDataMiddleware()
        fetchCheckForGeneralUseMiddleware()
        fetchCheckForAntdMiddleware()
        fetchSchemeMiddleware()
        fetchJoinTechnologyFactMiddleware()
        fetchQualityProductionMiddleware()
        fetchIntervalMiddleware()
        fetchMtimeMiddleware()
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
    fetchIntervalMiddleware,
    fetchMtimeMiddleware
}

export default connect(null, matDispatchToProps)(Api)
