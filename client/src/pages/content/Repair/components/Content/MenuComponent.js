import React, { PureComponent } from 'react'
import { Menu } from 'antd'
import { SolutionOutlined, TableOutlined, ToolOutlined } from '@ant-design/icons'

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
                    <SubMenu
                        key="plan"
                        title={
                            <span>
                                <SolutionOutlined />
                            </span>
                        }
                    >
                        <Menu.Item key="plan50">50</Menu.Item>
                        <Menu.Item key="plan56">56</Menu.Item>
                        <Menu.Item key="plan57">57</Menu.Item>
                        <Menu.Item key="plan61">61</Menu.Item>
                        <Menu.Item key="plan63">63</Menu.Item>
                    </SubMenu>

                    <SubMenu
                        key="scheme"
                        title={
                            <span>
                                <TableOutlined />
                            </span>
                        }
                    >
                        <Menu.Item key="scheme1">ШСЦ1</Menu.Item>
                        <Menu.Item key="scheme2">ШСЦ2</Menu.Item>
                        <Menu.Item key="scheme3">ШСЦ3</Menu.Item>
                        <Menu.Item key="scheme4">ШСЦ4</Menu.Item>
                        <Menu.Item key="scheme5">ШСЦ5</Menu.Item>
                        <Menu.Item key="scheme6">ШСЦ6</Menu.Item>
                        <Menu.Item key="scheme7">ШСЦ7</Menu.Item>
                        <Menu.Item key="scheme10">ШСЦ10</Menu.Item>
                        <Menu.Item key="scheme50">50</Menu.Item>
                        <Menu.Item key="scheme93">АТЦ</Menu.Item>
                        <Menu.Item key="scheme561">56(1)</Menu.Item>
                        <Menu.Item key="scheme562">56(2)</Menu.Item>
                    </SubMenu>

                    <SubMenu
                        key="check"
                        title={
                            <span>
                                <ToolOutlined />
                            </span>
                        }
                    >
                        <Menu.Item key="check1">ШСЦ1</Menu.Item>
                        <Menu.Item key="check2">ШСЦ2</Menu.Item>
                        <Menu.Item key="check3">ШСЦ3</Menu.Item>
                        <Menu.Item key="check4">ШСЦ4</Menu.Item>
                        <Menu.Item key="check5">ШСЦ5</Menu.Item>
                        <Menu.Item key="check6">ШСЦ6</Menu.Item>
                        <Menu.Item key="check7">ШСЦ7</Menu.Item>
                        <Menu.Item key="check10">ШСЦ10</Menu.Item>
                        <Menu.Item key="check50">50</Menu.Item>
                        <Menu.Item key="check93">АТЦ</Menu.Item>
                        <Menu.Item key="check561">56(1)</Menu.Item>
                        <Menu.Item key="check562">56(2)</Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        )
    }
}
