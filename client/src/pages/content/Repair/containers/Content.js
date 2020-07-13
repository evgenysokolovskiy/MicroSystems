import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { App } from '../components/Content/App'
import { changeTargetMenu } from '../../../../store/repair/actions/targetMenuAction'
import { changeTargetInn } from '../../../../store/repair/actions/targetInnAction'
import { changeDrawerVisible } from '../../../../store/repair/actions/drawerAction'

export class Content extends PureComponent {
    handleClickMenu = item => {
        this.props.changeTargetMenu(item)
    }
    handleClickRow = item => this.props.changeTargetInn(item)
    handleClickOpenDrawer = item => this.props.changeDrawerVisible(true)

    render() {
        const { data, checkForGeneralUse, checkForAntd, scheme, targetMenu } = this.props

        // check
        let c
        targetMenu &&
            targetMenu.match(/check/) &&
            Object.values(checkForAntd).forEach(item => {
                if (String(Object.keys(item)) === String(targetMenu.match(/[0-9]+/)[0])) {
                    c = item[targetMenu.match(/[0-9]+/)[0]]
                }
            })

        // scheme
        let s
        targetMenu &&
            targetMenu.match(/scheme/) &&
            Object.values(scheme).forEach(item => {
                if (String(Object.keys(item)) === String(targetMenu.match(/[0-9]+/)[0])) {
                    s = item[targetMenu.match(/[0-9]+/)[0]]
                }
            })

        return (
            <App
                data={targetMenu && targetMenu.match(/plan/) && data[targetMenu.match(/[0-9]+/)[0]]}
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
    changeTargetMenu,
    changeTargetInn,
    changeDrawerVisible
}
export default connect(mapStateToProps, mapDispatchToProps)(Content)
