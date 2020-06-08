import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import clonedeep from 'lodash.clonedeep'
import App from '../components/Content/App'

// fetch
import { fetchLabPercentMiddleware } from '../../../../api/middlewares/fetchLabPercentMiddleware'
import { fetchLabAmountMiddleware } from '../../../../api/middlewares/fetchLabAmountMiddleware'
import { fetchLabSourceMiddleware } from '../../../../api/middlewares/fetchLabSourceMiddleware'
// actions
import { changeLabTargetMenu } from '../../../../store/laboratory/actions/labTargetMenuAction'
import { changeParam } from '../../../../store/laboratory/actions/labParamAction'
import { changeProp } from '../../../../store/laboratory/actions/labPropAction'
// URLs
import { laboratoryPercent, laboratoryAmount, laboratorySource } from '../../../../api/urls/data'

export class Content extends PureComponent {
    state = {
        isLoadedPercent: false,
        isLoadedAmount: false,
        isLoadedSource: false
    }

    // Событие по меню (выбора процедуры)
    handleClickMenu = item => {
        const {
            fetchLabPercentMiddleware,
            fetchLabSourceMiddleware,
            changeLabTargetMenu
        } = this.props
        fetchLabPercentMiddleware(laboratoryPercent, this)
        fetchLabSourceMiddleware(laboratorySource, this)
        changeLabTargetMenu(item)

        // Перевести в false состояние для новых загрузок
        this.setState({
            isLoadedPercent: false,
            isLoadedAmount: false,
            isLoadedSource: false
        })
    }

    handleClickAmount = e => {
        const { labAmount, fetchLabAmountMiddleware, fetchLabPercentMiddleware } = this.props
        if (e === 'amount') fetchLabAmountMiddleware(laboratoryAmount, this)
        if (e === 'percent') fetchLabPercentMiddleware(laboratoryPercent, this)

        // Перевести в false состояние для новых загрузок
        this.setState({
            isLoadedPercent: false,
            isLoadedAmount: false
        })
    }

    handleClickParam = item => {
        this.props.changeParam(item)
    }

    handleClickProp = item => {
        this.props.changeProp(item)
    }

    render() {
        const {
            labPercent: percent,
            labAmount: amount,
            labSource: source,
            labTargetMenu: menu,
            labParam: param,
            labProp: prop
        } = this.props
        const { isLoadedPercent, isLoadedAmount, isLoadedSource } = this.state

        return (
            <App
                menu={menu}
                param={param}
                prop={prop}
                percent={percent}
                amount={amount}
                source={source}
                isLoadedPercent={isLoadedPercent}
                isLoadedAmount={isLoadedAmount}
                isLoadedSource={isLoadedSource}
                handleClickMenu={this.handleClickMenu}
                handleClickAmount={this.handleClickAmount}
                handleClickParam={this.handleClickParam}
                handleClickProp={this.handleClickProp}
            />
        )
    }
}

function mapStateToProps(store) {
    return {
        ...store.labPercentReducer,
        ...store.labAmountReducer,
        ...store.labSourceReducer,
        ...store.labTargetMenuReducer,
        ...store.labParamReducer,
        ...store.labPropReducer
    }
}

const mapDispatchToProps = {
    fetchLabPercentMiddleware,
    fetchLabAmountMiddleware,
    fetchLabSourceMiddleware,
    changeLabTargetMenu,
    changeParam,
    changeProp
}

export default connect(mapStateToProps, mapDispatchToProps)(Content)
