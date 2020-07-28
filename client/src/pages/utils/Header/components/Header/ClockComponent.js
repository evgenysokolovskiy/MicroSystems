import React from 'react'

export default class ClockComponent extends React.Component {
    render() {
        const { clock } = this.props

        return (
            <div>
                <span style={{ marginRight: '20px' }}>{clock}</span>
            </div>
        )
    }
}
