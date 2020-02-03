import React from 'react'
import { connect } from 'react-redux'
import { App } from '../components/Content/App'
import { changeTargetMenu } from '../../../store/actions/targetMenuAction'
import { changeTargetInn } from '../../../store/actions/targetInnAction'
import { changeDrawerVisible } from '../../../store/actions/drawerAction'
import { changeStateLoading } from '../../../store/actions/loadingAction'

export class Content extends React.Component {
    handleClickMenu = item => {
        this.props.changeTargetMenu(item)
        this.props.changeStateLoading(true)
    }
    handleClickRow = item => this.props.changeTargetInn(item)
    handleClickOpenDrawer = () => this.props.changeDrawerVisible(true)

    render() {
        const { data, targetMenu, targetInn, loading } = this.props
        return (
            <>
                <App
                    data={
                        targetMenu &&
                        targetMenu.match(/plan/) &&
                        data[targetMenu.match(/[0-9]+/)[0]]
                    }
                    loading={loading}
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
        ...store.targetMenuReducer,
        ...store.loadingReducer
    }
}

const mapDispatchToProps = {
    changeTargetMenu,
    changeStateLoading,
    changeTargetInn,
    changeDrawerVisible
}
export default connect(mapStateToProps, mapDispatchToProps)(Content)
