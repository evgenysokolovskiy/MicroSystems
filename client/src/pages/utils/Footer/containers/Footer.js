import React from 'react'
import { connect } from 'react-redux'
import { App } from '../components/Footer/App'

export class Footer extends React.Component {
    /*
    componentDidMount() {
        fetch('http://localhost:3000/download/file.xlsx')
            .then(res => res.blob())
            .then(data => console.log(data))
    }
*/
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
