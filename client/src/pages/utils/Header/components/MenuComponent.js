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
                    План ремонтов
                </Link>
            </Menu.Item>
        </Menu>
    )
}
