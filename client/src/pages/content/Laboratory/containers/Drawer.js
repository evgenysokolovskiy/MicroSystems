import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { App } from '../components/Drawer/App'
import { changeLabDrawerVisible } from '../../../../store/laboratory/actions/labDrawerAction'

export class Drawer extends PureComponent {
    handleClickCloseDrawer = () => this.props.changeLabDrawerVisible(false)

    render() {
        const {
            labSource: source,
            labParam: param,
            labProp: prop,
            labEquipmentNumber: equipment,
            labDrawerVisible: visible
        } = this.props

        return (
            <>
                <App
                    source={source}
                    param={param}
                    prop={prop}
                    equipment={equipment}
                    visible={visible}
                    handleClickCloseDrawer={this.handleClickCloseDrawer}
                />
            </>
        )
    }
}

function mapStateToProps(store) {
    return {
        ...store.labSourceReducer,
        ...store.labParamReducer,
        ...store.labPropReducer,
        ...store.labEquipmentNumberReducer,
        ...store.labDrawerReducer
    }
}

const mapDispatchToProps = {
    changeLabDrawerVisible
}

export default connect(mapStateToProps, mapDispatchToProps)(Drawer)
