import React from 'react'
import { connect } from 'react-redux'
// Компоненты
import { App } from '../components/Footer/App'

export class Footer extends React.Component {
    render() {
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

export default connect(mapStateToProps, mapDispatchToProps)(Footer)
