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
                    <Menu.Item key="table">
                        <TableOutlined />
                    </Menu.Item>
                    <Menu.Item key="axis">
                        <AlignCenterOutlined />
                    </Menu.Item>
                    <SubMenu
                        key="graph"
                        title={
                            <span>
                                <LineChartOutlined />
                            </span>
                        }
                    >
                        <Menu.Item key="running">ОБКАТКА</Menu.Item>
                        <Menu.Item key="grinding">ШЛИФОВКА</Menu.Item>

                        <SubMenu key="tweaking" title="ДОВОДКА">
                            <Menu.Item key="rough">ЧЕРНОВАЯ</Menu.Item>
                            <Menu.Item key="clean">ЧИСТОВАЯ</Menu.Item>
                            <Menu.Item key="final">ОКОНЧАТЕЛЬНАЯ</Menu.Item>
                        </SubMenu>
                    </SubMenu>
                </Menu>
            </div>
        )
    }
}
