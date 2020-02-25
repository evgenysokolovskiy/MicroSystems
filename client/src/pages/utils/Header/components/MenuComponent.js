import React from 'react'
import { Link } from 'react-router-dom'
// Antd
import { Menu } from 'antd'

export default class MenuComponent extends React.Component {
    render() {
        const currentPath = `/${window.location.pathname.split('/')[1]}/`
        return (
            <Menu
                theme="dark"
                mode="horizontal"
                selectedKeys={[currentPath]}
                style={{ lineHeight: '15vh', marginRight: 'auto' }}
            >
                <Menu.Item key="/repair/">
                    <Link to="/repair/">УПРАВЛЕНИЕ РЕМОНТОВ</Link>
                </Menu.Item>
                <Menu.Item key="/tech/">
                    <Link to="/tech/">ПРИКАЗ №17</Link>
                </Menu.Item>
                <Menu.Item key="/vbf21/">
                    <Link to="/vbf21/">VBF-21</Link>
                </Menu.Item>
            </Menu>
        )
    }
}
