import React from 'react'
// Antd
import { Layout, Menu, Icon } from 'antd'
const { Sider } = Layout
const { SubMenu } = Menu

export const MenuComponent = () => {
    return (
        <Sider width={250} style={{ background: '#fff' }}>
            <Menu mode="inline" style={{ height: '100%' }}>
                <SubMenu key="sub1" title={<span> Производство №50</span>}>
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

                <SubMenu key="sub2" title={<span>Производство №56</span>}>
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

                <SubMenu key="sub3" title={<span>Производство №57</span>}>
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

                <SubMenu key="sub4" title={<span>Производство №61</span>}>
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

                <SubMenu key="sub5" title={<span>Производство №63</span>}>
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
        </Sider>
    )
}
