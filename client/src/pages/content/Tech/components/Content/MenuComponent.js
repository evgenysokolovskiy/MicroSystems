import React from 'react'
import { Link } from 'react-router-dom'
import { Menu, Icon, Typography } from 'antd'

const { SubMenu } = Menu
const { Title } = Typography

export default class MenuComponent extends React.Component {
    state = {
        collapsed: false
    }

    render() {
        return (
            <div>
                <Menu
                    defaultOpenKeys={['control']}
                    mode="inline"
                    theme="light"
                    inlineCollapsed={this.state.collapsed}
                >
                    <SubMenu
                        key="control"
                        title={
                            <span>
                                <Icon type="solution" />
                            </span>
                        }
                    >
                        <Menu.Item key="stamping">
                            <span>
                                <Link to="/tech/stamping">Штамповка</Link>
                            </span>
                        </Menu.Item>
                        <Menu.Item key="running">
                            <span>
                                <Link to="/tech/running">Обкатка</Link>
                            </span>
                        </Menu.Item>
                        <Menu.Item key="grinding">
                            <span>
                                <Link to="/tech/grinding">Шлифовка</Link>
                            </span>
                        </Menu.Item>

                        <SubMenu key="tweaking" title="Доводка">
                            <Menu.Item key="rough">
                                <span>
                                    <Link to="/tech/rough">Черновая</Link>
                                </span>
                            </Menu.Item>
                            <Menu.Item key="preliminary">
                                <span>
                                    <Link to="/tech/preliminary">Предварительная</Link>
                                </span>
                            </Menu.Item>
                            <Menu.Item key="clean">
                                <span>
                                    <Link to="/tech/clean">Чистовая</Link>
                                </span>
                            </Menu.Item>
                            <Menu.Item key="final">
                                <span>
                                    <Link to="/tech/final">Окончательная</Link>
                                </span>
                            </Menu.Item>
                        </SubMenu>
                    </SubMenu>
                </Menu>
            </div>
        )
    }
}
