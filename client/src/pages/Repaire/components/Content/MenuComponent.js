import React from 'react'
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
                    defaultSelectedKeys={['1']}
                    mode="inline"
                    theme="light"
                    inlineCollapsed={this.state.collapsed}
                >
                    <SubMenu
                        key="sub1"
                        title={
                            <span>
                                <Title level={4}>50</Title>
                            </span>
                        }
                    >
                        <Menu.Item key="1">
                            <Icon type="solution" />
                            План ремонтов
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="tool" />
                            Диагностика
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="table" />
                            Схема
                        </Menu.Item>
                    </SubMenu>

                    <SubMenu
                        key="sub2"
                        title={
                            <span>
                                <Title level={4}>56</Title>
                            </span>
                        }
                    >
                        <Menu.Item key="4">
                            <Icon type="solution" />
                            План ремонтов
                        </Menu.Item>
                        <Menu.Item key="5">
                            <Icon type="tool" />
                            Диагностика
                        </Menu.Item>
                        <Menu.Item key="6">
                            <Icon type="table" />
                            Схема
                        </Menu.Item>
                    </SubMenu>

                    <SubMenu
                        key="sub3"
                        title={
                            <span>
                                <Title level={4}>57</Title>
                            </span>
                        }
                    >
                        <Menu.Item key="7">
                            <Icon type="solution" />
                            План ремонтов
                        </Menu.Item>
                        <Menu.Item key="8">
                            <Icon type="tool" />
                            Диагностика
                        </Menu.Item>
                        <Menu.Item key="9">
                            <Icon type="table" />
                            Схема
                        </Menu.Item>
                    </SubMenu>

                    <SubMenu
                        key="sub4"
                        title={
                            <span>
                                <Title level={4}>61</Title>
                            </span>
                        }
                    >
                        <Menu.Item key="10">
                            <Icon type="solution" />
                            План ремонтов
                        </Menu.Item>
                        <Menu.Item key="11">
                            <Icon type="tool" />
                            Диагностика
                        </Menu.Item>
                        <Menu.Item key="12">
                            <Icon type="table" />
                            Схема
                        </Menu.Item>
                    </SubMenu>

                    <SubMenu
                        key="sub5"
                        title={
                            <span>
                                <Title level={4}>63</Title>
                            </span>
                        }
                    >
                        <Menu.Item key="13">
                            <Icon type="solution" />
                            План ремонтов
                        </Menu.Item>
                        <Menu.Item key="14">
                            <Icon type="tool" />
                            Диагностика
                        </Menu.Item>
                        <Menu.Item key="15">
                            <Icon type="table" />
                            Схема
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        )
    }
}
