import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
// Компоненты
import { App } from '../components/Content/App'
// * FETCH
import {
    fetchDataMiddleware,
    fetchSchemeMiddleware,
    fetchCheckForGeneralUseMiddleware,
    fetchCheckForAntdMiddleware
} from '../../../../api/middlewares/repaire/'
// * ACTION
import { changeTargetMenu } from '../../../../store/repair/actions/repaireMenuAction'
import { changeTargetInn } from '../../../../store/repair/actions/repaireInnAction'
import { changeDrawerVisible } from '../../../../store/repair/actions/repaireDrawerAction'

class Content extends PureComponent {
    componentDidMount() {
        const {
            fetchDataMiddleware,
            fetchCheckForGeneralUseMiddleware,
            fetchCheckForAntdMiddleware,
            fetchSchemeMiddleware
        } = this.props

        fetchDataMiddleware()
        fetchCheckForGeneralUseMiddleware()
        fetchCheckForAntdMiddleware()
        fetchSchemeMiddleware()
    }

    handleClickMenu = (item) => {
        this.props.changeTargetMenu(item)
    }
    handleClickRow = (item) => this.props.changeTargetInn(item)
    handleClickOpenDrawer = (item) => this.props.changeDrawerVisible(true)

    render() {
        const { data, checkForGeneralUse, checkForAntd, scheme, targetMenu } = this.props
        // check
        let c
        targetMenu &&
            targetMenu.match(/check/) &&
            Object.values(checkForAntd).forEach((item) => {
                if (String(Object.keys(item)) === String(targetMenu.match(/[0-9]+/)[0])) {
                    c = item[targetMenu.match(/[0-9]+/)[0]]
                }
            })

        // scheme
        let s
        targetMenu &&
            targetMenu.match(/scheme/) &&
            Object.values(scheme).forEach((item) => {
                if (String(Object.keys(item)) === String(targetMenu.match(/[0-9]+/)[0])) {
                    s = item[targetMenu.match(/[0-9]+/)[0]]
                }
            })

        return (
            <App
                plan={
                    targetMenu &&
                    targetMenu.match(/plan/) &&
                    data &&
                    data[targetMenu.match(/[0-9]+/)[0]]
                }
                equipment={
                    targetMenu &&
                    targetMenu.match(/equipment/) &&
                    data[targetMenu.match(/[0-9]+/)[0]]
                }
                checkForGeneralUse={
                    targetMenu &&
                    targetMenu.match(/scheme/) &&
                    checkForGeneralUse[targetMenu.match(/[0-9]+/)[0]]
                }
                checkForAntd={c}
                scheme={s}
                targetMenu={targetMenu}
                handleClickMenu={this.handleClickMenu}
                handleClickRow={this.handleClickRow}
                handleClickOpenDrawer={this.handleClickOpenDrawer}
            />
        )
    }
}

function mapStateToProps(store) {
    return {
        ...store.fetchReducer,
        ...store.fetchCheckForGeneralUseReducer,
        ...store.fetchCheckForAntdReducer,
        ...store.fetchSchemeReducer,
        ...store.targetMenuReducer
    }
}

const mapDispatchToProps = {
    fetchDataMiddleware,
    fetchCheckForGeneralUseMiddleware,
    fetchCheckForAntdMiddleware,
    fetchSchemeMiddleware,
    changeTargetMenu,
    changeTargetInn,
    changeDrawerVisible
}
export default connect(mapStateToProps, mapDispatchToProps)(Content)
