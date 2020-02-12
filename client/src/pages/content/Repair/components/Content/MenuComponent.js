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
                        <Menu.Item key="scheme1">
                            <span>ШСЦ-1</span>
                        </Menu.Item>
                        <Menu.Item key="scheme2">
                            <span>ШСЦ-2</span>
                        </Menu.Item>
                        <Menu.Item key="scheme3">
                            <span>ШСЦ-3</span>
                        </Menu.Item>
                        <Menu.Item key="scheme4">
                            <span>ШСЦ-4</span>
                        </Menu.Item>
                        <Menu.Item key="scheme5">
                            <span>ШСЦ-5</span>
                        </Menu.Item>
                        <Menu.Item key="scheme6">
                            <span>ШСЦ-6</span>
                        </Menu.Item>
                        <Menu.Item key="scheme7">
                            <span>ШСЦ-7</span>
                        </Menu.Item>
                        <Menu.Item key="scheme10">
                            <span>ШСЦ-10</span>
                        </Menu.Item>
                        <Menu.Item key="scheme50">
                            <span>ТП</span>
                        </Menu.Item>
                        <Menu.Item key="scheme93">
                            <span>АТЦ</span>
                        </Menu.Item>
                        <Menu.Item key="scheme561">
                            <span>56(1)</span>
                        </Menu.Item>
                        <Menu.Item key="scheme562">
                            <span>56(2)</span>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        )
    }
}
