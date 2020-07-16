import React from 'react'
// Компоненты
import MenuComponent from './MenuComponent'
import { SearchComponent } from './SearchComponent'
import Bg from './Bg'
// Antd
import { Layout } from 'antd'
const { Header } = Layout

export const App = (props) => {
    const { handleClickMenu } = props

    return (
        <>
            <Header className="header">
                <MenuComponent handleClickMenu={handleClickMenu} />
                <SearchComponent />
            </Header>
            <Bg />
        </>
    )
}
