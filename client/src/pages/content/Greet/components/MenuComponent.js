import React from 'react'
import { Link } from 'react-router-dom'
// Antd
import { Menu } from 'antd'

export default class MenuComponent extends React.Component {
    handleClick = target => {
        this.props.handleClickMenu(target['key'].slice(1))
    }
    render() {
        const currentPath = `/${window.location.pathname.split('/')[1]}/`
        return (
            <Menu
                theme="dark"
                mode="horizontal"
                selectedKeys={[currentPath]}
                style={{ lineHeight: '15vh', marginRight: 'auto' }}
                onSelect={this.handleClick}
            >
                <Menu.Item key="/repair">
                    <h1 className="mainMenuLink">
                        <Link to="/repair">УПРАВЛЕНИЕ РЕМОНТОВ</Link>
                    </h1>
                </Menu.Item>
                <Menu.Item key="/tech">
                    <h1 className="mainMenuLink">
                        <Link to="/tech">ПРИКАЗ №17</Link>
                    </h1>
                </Menu.Item>
                <Menu.Item key="/laboratory">
                    <h1 className="mainMenuLink">
                        <Link to="/laboratory">ЛАБОРАТОРИЯ</Link>
                    </h1>
                </Menu.Item>
                {/*
                <Menu.Item key="/vbf21/">
                    <Link to="/vbf21/">VBF-21</Link>
                </Menu.Item>
                */}
            </Menu>
        )
    }
}
