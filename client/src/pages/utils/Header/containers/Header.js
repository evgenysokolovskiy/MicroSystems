import React from 'react'
import { connect } from 'react-redux'
import { App } from '../components/App'

export class Header extends React.Component {
    render() {
        return <App />
    }
}

function mapStateToProps(store) {
    return {
        ...store.fetchReducer
    }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
