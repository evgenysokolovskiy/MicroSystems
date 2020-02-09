import React from 'react'
import { Link } from 'react-router-dom'
import { Menu, Icon, Typography } from 'antd'

const { SubMenu } = Menu
const { Title } = Typography

export default class MenuComponent extends React.Component {
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
                    defaultOpenKeys={['plan']}
                    mode="inline"
                    theme="light"
                    inlineCollapsed={this.state.collapsed}
                    onClick={this.handleClick}
                >
                    <SubMenu
                        key="plan"
                        title={
                            <span>
                                <Icon type="solution" />
                            </span>
                        }
                    >
                        <Menu.Item key="plan50">
                            <span>
                                <Link to="/repair/plan/50">50</Link>
                            </span>
                        </Menu.Item>
                        <Menu.Item key="plan56">
                            <span>
                                <Link to="/repair/plan/56">56</Link>
                            </span>
                        </Menu.Item>
                        <Menu.Item key="plan57">
                            <span>
                                <Link to="/repair/plan/57">57</Link>
                            </span>
                        </Menu.Item>
                        <Menu.Item key="plan61">
                            <span>
                                <Link to="/repair/plan/61">61</Link>
                            </span>
                        </Menu.Item>
                        <Menu.Item key="plan63">
                            <span>
                                <Link to="/repair/plan/63">63</Link>
                            </span>
                        </Menu.Item>
                    </SubMenu>

                    <SubMenu
                        key="check"
                        title={
                            <span>
                                <Icon type="tool" />
                            </span>
                        }
                    >
                        <Menu.Item key="check50">
                            <span>
                                <Link to="/repair/check/50">50</Link>
                            </span>
                        </Menu.Item>
                        <Menu.Item key="check56">
                            <span>
                                <Link to="/repair/check/56">56</Link>
                            </span>
                        </Menu.Item>
                        <Menu.Item key="check57">
                            <span>
                                <Link to="/repair/check/57">57</Link>
                            </span>
                        </Menu.Item>
                        <Menu.Item key="check61">
                            <span>
                                <Link to="/repair/check/61">61</Link>
                            </span>
                        </Menu.Item>
                        <Menu.Item key="check63">
                            <span>
                                <Link to="/repair/check/63">63</Link>
                            </span>
                        </Menu.Item>
                    </SubMenu>

                    <SubMenu
                        key="scheme"
                        title={
                            <span>
                                <Icon type="table" />
                            </span>
                        }
                    >
                        <Menu.Item key="scheme50">
                            <span>50</span>
                        </Menu.Item>
                        <Menu.Item key="scheme56">
                            <span>56</span>
                        </Menu.Item>
                        <Menu.Item key="scheme57">
                            <span>57</span>
                        </Menu.Item>
                        <Menu.Item key="scheme61">
                            <span>61</span>
                        </Menu.Item>
                        <Menu.Item key="scheme63">
                            <span>63</span>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        )
    }
}
