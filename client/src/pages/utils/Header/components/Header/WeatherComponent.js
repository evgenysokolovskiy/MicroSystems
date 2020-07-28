import React from 'react'

export default class WeatherComponent extends React.Component {
    render() {
        const { temp, humidity, srcIcon } = this.props

        return (
            <div>
                {srcIcon && (
                    <span>
                        <img src={srcIcon} alt="weather icon" />
                    </span>
                )}
                {temp && <span style={{ marginRight: '20px' }}>{temp}&#8451;</span>}
                {humidity && <span>{humidity}%</span>}
            </div>
        )
    }
}
