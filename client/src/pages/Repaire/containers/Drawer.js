import React from 'react'
import { connect } from 'react-redux'
import { changeDrawerVisible } from '../../../store/actions/drawerAction'
import { App } from '../components/Drawer/App'

export class Drawer extends React.Component {
    handleClickCloseDrawer = () => this.props.changeDrawerVisible(false)

    render() {
        const { data, targetMenu, targetInn, visible } = this.props

        let dataInn = {}
        const d = targetMenu && targetMenu.match(/plan/) && data[targetMenu.match(/[0-9]+/)[0]]
        d &&
            d['data'].forEach(period =>
                period.forEach(item => {
                    if (+item['inn'] === +targetInn) dataInn = item
                })
            )

        return (
            <>
                <App
                    data={dataInn}
                    visible={visible}
                    handleClickCloseDrawer={this.handleClickCloseDrawer}
                />
            </>
        )
    }
}

function mapStateToProps(store) {
    return {
        ...store.fetchReducer,
        ...store.targetMenuReducer,
        ...store.targetInnReducer,
        ...store.drawerReducer
    }
}

const mapDispatchToProps = {
    changeDrawerVisible
}

export default connect(mapStateToProps, mapDispatchToProps)(Drawer)
