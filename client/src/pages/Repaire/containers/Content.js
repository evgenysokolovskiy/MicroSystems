import React from 'react'
import { connect } from 'react-redux'
import { App } from '../components/Content/App'

export class Content extends React.Component {
    render() {
        const { data } = this.props
        return (
            <>
                <App data={data} />
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
