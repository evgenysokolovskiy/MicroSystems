import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { App } from '../components/Drawer/App'
import { changeDrawerVisible } from '../../../../store/repair/actions/repaireDrawerAction'

export class Drawer extends PureComponent {
    handleClickCloseDrawer = () => this.props.changeDrawerVisible(false)

    render() {
        const { data, targetMenu, targetInn, visible } = this.props

        let innPlan = {}
        let innOffPlan = {}

        const p =
            targetMenu && targetMenu.match(/plan/) && data && data[targetMenu.match(/[0-9]+/)[0]]
        const eq =
            targetMenu &&
            targetMenu.match(/equipment/) &&
            data &&
            data[targetMenu.match(/[0-9]+/)[0]]

        // Выбранное оборудование входит в план ремонтов
        p &&
            Object.values(p['approved']).forEach((item) =>
                item.forEach((it) => {
                    if (+it['inn'] === +targetInn) {
                        innPlan = it
                    }
                })
            )

        // Выбранное оборудование не входит в план ремонтов
        eq &&
            eq['all'].forEach((item) => {
                if (+item['inn'] === +targetInn) {
                    innOffPlan = item
                }
            })

        return (
            <>
                <App
                    data={Object.keys(innPlan).length ? innPlan : innOffPlan}
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
