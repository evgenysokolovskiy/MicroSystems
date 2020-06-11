import React, { PureComponent } from 'react'
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
                        <span>ШП</span>
                    </Menu.Item>

                    <Menu.Item key="shsp">
                        <span>ШСП</span>
                    </Menu.Item>

                    <Menu.Item key="sog">
                        <span>СОЖ</span>
                    </Menu.Item>
                </Menu>
            </div>
        )
    }
}
