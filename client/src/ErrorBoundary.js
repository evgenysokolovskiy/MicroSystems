import React from 'react'

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true }
    }

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo)
        // Сохранить в лог
    }

    render() {
        if (this.state.hasError) {
            return (
                <div>
                    <p>В некоторых браузерах возможна ошибка роутинга!</p>
                    <p>
                        Возможно, конфигурация Webpack имеет особенности для размещения на Heroku.
                    </p>
                    <p>В любом случае, версия на Heroku используется только для разработки.</p>
                    <p>
                        Пожалуйста, перезагрузите приложение! Можно использовать кнопку >>>
                        <button>
                            <a href="http://indust.herokuapp.com/">Перезагрузить!</a>
                        </button>
                    </p>
                </div>
            )
        }

        return this.props.children
    }
}
