import React from 'react'
// Компоненты
import MenuComponent from './MenuComponent'
import { SearchComponent } from './SearchComponent'
// Antd
import { Layout } from 'antd'
const { Header } = Layout

export const App = () => {
    return (
        <Header className="header">
            <MenuComponent />
            <SearchComponent />
        </Header>
    )
}
