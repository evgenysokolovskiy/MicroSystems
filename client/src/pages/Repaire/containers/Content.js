import React from 'react'
import { connect } from 'react-redux'
import { App } from '../components/Content/App'
import { changeTargetMenu } from '../../../store/actions/targetMenuAction'
import { changeDrawerVisible } from '../../../store/actions/drawerAction'

export class Content extends React.Component {
    getHandleClickMenu = item => this.props.changeTargetMenu(item)
    handleClickOpenDrawer = () => this.props.changeDrawerVisible(true)

    render() {
        const { data, targetMenu } = this.props
        return (
            <>
                <App
                    data={data}
                    targetMenu={targetMenu}
                    getHandleClickMenu={this.getHandleClickMenu}
                    handleClickOpenDrawer={this.handleClickOpenDrawer}
                />
            </>
        )
    }
}

function mapStateToProps(store) {
    return {
        ...store.fetchReducer,
        ...store.targetMenuReducer
    }
}

const mapDispatchToProps = {
    changeTargetMenu,
    changeDrawerVisible
}
export default connect(mapStateToProps, mapDispatchToProps)(Content)
