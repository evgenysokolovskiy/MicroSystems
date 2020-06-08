import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import { TableOutlined, AlignCenterOutlined, LineChartOutlined } from '@ant-design/icons'

const { SubMenu } = Menu

export default class MenuComponent extends PureComponent {
    state = {
        collapsed: false
    }

    handleClick = e => {
        this.props.handleClickMenu(e.key)
    }

    render() {
        return (
            <div>
                <Menu
                    mode="inline"
                    theme="light"
                    inlineCollapsed={this.state.collapsed}
                    onClick={this.handleClick}
                >
                    <Menu.Item key="shp">
                        <span>
                            <Link to="/laboratory/shp">ШП</Link>
                        </span>
                    </Menu.Item>

                    <Menu.Item key="shsp">
                        <span>
                            <Link to="/laboratory/shsp">ШСП</Link>
                        </span>
                    </Menu.Item>

                    <Menu.Item key="sog">
                        <span>
                            <Link to="/laboratory/sog">СОЖ</Link>
                        </span>
                    </Menu.Item>
                </Menu>
            </div>
        )
    }
}
