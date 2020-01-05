import React from 'react'
import { connect } from 'react-redux'
// Компонент
import { App } from '../components/Content/App'

export class Content extends React.Component {
    render() {
        console.log(this.props.data)
        return (
            <>
                <App />
            </>
        )
    }
}

function mapStateToProps(store) {
    return {
        ...store.fetchReducer
    }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Content)
