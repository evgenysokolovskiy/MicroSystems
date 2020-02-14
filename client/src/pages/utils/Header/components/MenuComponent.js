import React from 'react'
import { Link } from 'react-router-dom'
// Antd
import { Menu } from 'antd'

export const MenuComponent = () => {
    return (
        <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '120px', marginRight: 'auto' }}
        >
            <Menu.Item key="1">
                <Link exact to="/repair/plan">
                    Управление ремонтов
                </Link>
            </Menu.Item>
            <Menu.Item key="2">
                <Link exact to="#">
                    Техническое управление
                </Link>
            </Menu.Item>
        </Menu>
    )
}
