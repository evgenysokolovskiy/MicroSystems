import React from 'react'
import { connect } from 'react-redux'
import { App } from '../components/Content/App'
import { changeTechTargetMenu } from '../../../../store/tech/actions/techTargetMenuAction'

export class Content extends React.Component {
    handleClickMenu = item => {
        this.props.changeTechTargetMenu(item)
    }

    render() {
        const { techTargetMenu } = this.props

        return <App techTargetMenu={techTargetMenu} handleClickMenu={this.handleClickMenu} />
    }
}

function mapStateToProps(store) {
    return {
        ...store.techTargetMenuReducer
    }
}

const mapDispatchToProps = {
    changeTechTargetMenu
}
export default connect(mapStateToProps, mapDispatchToProps)(Content)
