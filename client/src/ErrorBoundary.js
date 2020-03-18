import React from 'react'
import { Result } from 'antd'

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
                <Result
                    status="404"
                    title="404"
                    subTitle="Ошибка... Попробуйте перезагрузить приложение!"
                />
            )
        }

        return this.props.children
    }
}
