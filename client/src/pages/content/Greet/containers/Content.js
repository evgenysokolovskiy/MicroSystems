import React from 'react'
import { connect } from 'react-redux'
import { App } from '../components/App'
import { changeGreetMenu } from '../../../../store/greet/actions/greetMenuAction'
import { changeLabTargetMenu } from '../../../../store/laboratory/actions/labTargetMenuAction'

class Content extends React.Component {
    handleClickMenu = (target) => {
        const { changeGreetMenu, changeLabTargetMenu } = this.props
        changeGreetMenu(target)
        changeLabTargetMenu(null)
    }

    render() {
        return <App handleClickMenu={this.handleClickMenu} />
    }
}

const mapDispatchToProps = {
    changeGreetMenu,
    changeLabTargetMenu
}

export default connect(null, mapDispatchToProps)(Content)
