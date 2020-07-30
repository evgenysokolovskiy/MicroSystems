import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import App from '../components/Drawer/App'
import { changeTechDrawerVisible } from '../../../../store/tech/actions/techDrawerAction'
import { changeTechTargetTimeStamp } from '../../../../store/tech/actions/techMainFunctionalityAction'

export class Drawer extends PureComponent {
    handleClickCloseTechDrawer = () => this.props.changeTechDrawerVisible(false)

    render() {
        let {
            techTargetTimeStampData: data, // Данные в момент времени
            techTargetTimeStamp: target, // Момент времени
            techDrawerVisible: visible // Видимость окна
        } = this.props

        return (
            <>
                <App
                    data={data}
                    target={target}
                    visible={visible}
                    handleClickCloseTechDrawer={this.handleClickCloseTechDrawer}
                    changeTechTargetTimeStamp={this.props.changeTechTargetTimeStamp}
                />
            </>
        )
    }
}

function mapStateToProps(store) {
    return {
        ...store.techDrawerReducer,
        ...store.techTargetTimeStampReducer,
        ...store.techTargetTimeStampDataReducer
    }
}

const mapDispatchToProps = {
    changeTechDrawerVisible,
    changeTechTargetTimeStamp
}

export default connect(mapStateToProps, mapDispatchToProps)(Drawer)
