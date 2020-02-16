import React from 'react'
import { connect } from 'react-redux'
import { App } from '../components/Content/App'

export class Content extends React.Component {
    render() {
        return (
            <>
                <App />
            </>
        )
    }
}

function mapStateToProps(store) {
    return {}
}

const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(Content)
