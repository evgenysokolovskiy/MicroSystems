import React from 'react'
import { connect } from 'react-redux'
import { App } from '../components/Header/App'

const city = 'Vologda, ru'
const key = '************************'
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}&lang=ru`

export class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            clock: '',
            weather: null
        }
    }

    componentDidMount() {
        const now = new Date()
        const hours = now.getHours()
        const minutes = String(now.getMinutes()).padStart(2, '0')
        this.setState({
            clock: `${hours}:${minutes}`
        })

        this.fetchWeather(url)

        this.timerClockID = setInterval(() => {
            const now = new Date()
            const hours = now.getHours()
            const minutes = String(now.getMinutes()).padStart(2, '0')
            this.setState({
                clock: `${hours}:${minutes}`
            })
        }, 1000)

        // Запрос каждые 5 минут
        this.timerWeatherID = setInterval(() => {
            this.fetchWeather(url)
        }, 300000)
    }

    componentWillUnmount() {
        clearInterval(this.timerClockID)
        clearInterval(this.timerWeatherID)
    }

    async fetchWeather(url) {
        const res = await fetch(url)
        const data = await res.json()

        const weather = {
            temp: data['main']['temp'],
            humidity: data['main']['humidity'],
            description: data['weather'][0]['description'],
            icon: data['weather'][0]['icon'],
            name: data['name'],
            sunrise: data['sys']['sunrise'],
            sunset: data['sys']['sunset']
        }

        this.setState({
            weather
        })
    }

    render() {
        const { clock, weather } = this.state
        const temp = weather && `${weather['temp']}`
        const humidity = weather && `${weather['humidity']}`
        const srcIcon = weather && `https://openweathermap.org/img/w/${weather['icon']}.png`

        return (
            <>
                <App clock={clock} temp={temp} humidity={humidity} srcIcon={srcIcon} />
            </>
        )
    }
}

function mapStateToProps(store) {
    return {}
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
