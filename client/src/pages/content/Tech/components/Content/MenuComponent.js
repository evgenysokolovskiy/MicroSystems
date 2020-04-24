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
                    <Menu.Item key="table">
                        <Link to="/tech/table">
                            <TableOutlined />
                        </Link>
                    </Menu.Item>

                    <Menu.Item key="axis">
                        <Link to="/tech/axis">
                            <AlignCenterOutlined />
                        </Link>
                    </Menu.Item>

                    <SubMenu
                        key="graph"
                        title={
                            <span>
                                <LineChartOutlined />
                            </span>
                        }
                    >
                        <Menu.Item key="running">
                            <span>
                                <Link to="/tech/running">ОБКАТКА</Link>
                            </span>
                        </Menu.Item>
                        <Menu.Item key="grinding">
                            <span>
                                <Link to="/tech/grinding">ШЛИФОВКА</Link>
                            </span>
                        </Menu.Item>

                        <SubMenu key="tweaking" title="ДОВОДКА">
                            <Menu.Item key="rough">
                                <span>
                                    <Link to="/tech/rough">ЧЕРНОВАЯ</Link>
                                </span>
                            </Menu.Item>
                            <Menu.Item key="clean">
                                <span>
                                    <Link to="/tech/clean">ЧИСТОВАЯ</Link>
                                </span>
                            </Menu.Item>
                            <Menu.Item key="final">
                                <span>
                                    <Link to="/tech/final">ОКОНЧАТЕЛЬНАЯ</Link>
                                </span>
                            </Menu.Item>
                        </SubMenu>
                    </SubMenu>
                </Menu>
            </div>
        )
    }
}

/*
<Menu.Item key="stamping">
    <span>
        <Link to="/tech/stamping">ШТАМПОВКА</Link>
    </span>
</Menu.Item>

<Menu.Item key="term">
    <span>
        <Link to="/tech/term">ТЕРМООБРАБОТКА</Link>
    </span>
</Menu.Item>

*/
