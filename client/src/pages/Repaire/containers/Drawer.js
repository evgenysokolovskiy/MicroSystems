import React from 'react'
import { connect } from 'react-redux'
import { changeDrawerVisible } from '../../../store/actions/drawerAction'
import { App } from '../components/Drawer/App'

export class Drawer extends React.Component {
    handleClickCloseDrawer = () => this.props.changeDrawerVisible(false)

    render() {
        const { visible } = this.props
        return (
            <>
                <App visible={visible} handleClickCloseDrawer={this.handleClickCloseDrawer} />
            </>
        )
    }
}

function mapStateToProps(store) {
    return {
        ...store.drawerReducer
    }
}

const mapDispatchToProps = {
    changeDrawerVisible
}

export default connect(mapStateToProps, mapDispatchToProps)(Drawer)
