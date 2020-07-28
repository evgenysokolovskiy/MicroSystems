import React from 'react'
import { Link } from 'react-router-dom'
// Компоненты
import ClockComponent from './ClockComponent'
import WeatherComponent from './WeatherComponent'

// Antd
import { HomeOutlined } from '@ant-design/icons'

export const App = (props) => {
    const { clock, temp, humidity, srcIcon } = props

    return (
        <div
            style={{
                minHeight: '6vh',
                paddingLeft: '20px',
                paddingRight: '20px',
                color: '#222',
                display: 'flex',
                flexFlow: 'row wrap',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}
        >
            <WeatherComponent temp={temp} humidity={humidity} srcIcon={srcIcon} />
            <div
                style={{
                    display: 'flex',
                    flexFlow: 'row wrap',
                    alignItems: 'center'
                }}
            >
                <ClockComponent clock={clock} />
                <Link to="/">
                    <HomeOutlined style={{ fontSize: '16px', textAlign: 'right' }} />
                </Link>
            </div>
        </div>
    )
}
