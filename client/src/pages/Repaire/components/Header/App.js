import React from 'react'
// Компоненты
import { LogoComponent } from './LogoComponent'
import { MenuComponent } from './MenuComponent'
import { SearchComponent } from './SearchComponent'
// Antd
import { Layout } from 'antd'
const { Header } = Layout

export const App = () => {
    return (
        <Header className="header">
            <LogoComponent />
            <MenuComponent />
            <SearchComponent />
        </Header>
    )
}
