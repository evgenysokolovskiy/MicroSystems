import React from 'react'
import { Menu, Icon, Typography } from 'antd'

const { SubMenu } = Menu
const { Title } = Typography

export default class MenuComponent extends React.Component {
    state = {
        collapsed: false
    }

    handleClick = e => this.props.handleClickMenu(e.key)

    render() {
        return (
            <div>
                <Menu
                    defaultSelectedKeys={['1']}
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
                            <span>50</span>
                        </Menu.Item>
                        <Menu.Item key="plan56">
                            <span>56</span>
                        </Menu.Item>
                        <Menu.Item key="plan57">
                            <span>57</span>
                        </Menu.Item>
                        <Menu.Item key="plan61">
                            <span>61</span>
                        </Menu.Item>
                        <Menu.Item key="plan63">
                            <span>63</span>
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
                            <span>50</span>
                        </Menu.Item>
                        <Menu.Item key="check56">
                            <span>56</span>
                        </Menu.Item>
                        <Menu.Item key="check57">
                            <span>57</span>
                        </Menu.Item>
                        <Menu.Item key="check61">
                            <span>61</span>
                        </Menu.Item>
                        <Menu.Item key="check63">
                            <span>63</span>
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
