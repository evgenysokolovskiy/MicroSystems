import React from 'react'
import { connect } from 'react-redux'
import { App } from '../components/Content/App'
import { changeTargetMenu } from '../../../../store/actions/targetMenuAction'
import { changeTargetInn } from '../../../../store/actions/targetInnAction'
import { changeDrawerVisible } from '../../../../store/actions/drawerAction'

export class Content extends React.Component {
    handleClickMenu = item => {
        this.props.changeTargetMenu(item)
    }
    handleClickRow = item => this.props.changeTargetInn(item)
    handleClickOpenDrawer = item => this.props.changeDrawerVisible(true)

    render() {
        const { data, check, scheme, targetMenu, targetInn } = this.props
        let c
        targetMenu &&
            targetMenu.match(/check/) &&
            Object.values(check).forEach(item => {
                if (String(Object.keys(item)) === String(targetMenu.match(/[0-9]+/)[0])) {
                    c = item[targetMenu.match(/[0-9]+/)[0]]
                }
            })

        return (
            <>
                <App
                    data={
                        targetMenu &&
                        targetMenu.match(/plan/) &&
                        data[targetMenu.match(/[0-9]+/)[0]]
                    }
                    check={c}
                    scheme={scheme[0]['50']}
                    targetMenu={targetMenu}
                    handleClickMenu={this.handleClickMenu}
                    handleClickRow={this.handleClickRow}
                    handleClickOpenDrawer={this.handleClickOpenDrawer}
                />
            </>
        )
    }
}

function mapStateToProps(store) {
    return {
        ...store.fetchReducer,
        ...store.fetchCheckReducer,
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
