import React from 'react'
// Компоненты
import { CopyrightComponent } from './CopyrightComponent'
// Antd
import { Layout } from 'antd'
const { Footer } = Layout

export const App = () => {
    return (
        <Footer className="footer" style={{ textAlign: 'center' }}>
            <CopyrightComponent />
        </Footer>
    )
}

//<a href="http://localhost:3000/download/file.xlsx" download>скачать</a>
