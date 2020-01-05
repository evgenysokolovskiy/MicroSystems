import React from 'react'
// Antd
import { Menu } from 'antd'

export const MenuComponent = () => {
    return (
        <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '120px', marginRight: 'auto' }}
        >
            <Menu.Item key="1">Анализ выпуска продукции</Menu.Item>
            <Menu.Item key="2">План ремонтов</Menu.Item>
        </Menu>
    )
}
