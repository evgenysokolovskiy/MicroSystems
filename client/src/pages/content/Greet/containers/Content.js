import React from 'react'
import { connect } from 'react-redux'
import { App } from '../components/App'
import { changeGreetMenu } from '../../../../store/greet/actions/greetMenuAction'

class Content extends React.Component {
	handleClickMenu = target => {
		this.props.changeGreetMenu(target)
	}

    render() {
        return (
        	<App 
        		handleClickMenu={this.handleClickMenu}
        	/>
        )
    }
}

const mapDispatchToProps = {
	changeGreetMenu
}

export default connect(null, mapDispatchToProps)(Content)
