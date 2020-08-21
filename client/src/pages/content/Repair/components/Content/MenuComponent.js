import React, { PureComponent } from 'react'
import { Menu } from 'antd'
import {
    VerticalLeftOutlined,
    SolutionOutlined,
    TableOutlined,
    ToolOutlined,
    FileExcelOutlined
} from '@ant-design/icons'
import {
    plan,
    equipmentSortedNum,
    equipmentSortedPercent,
    equipmentFilteredPercentMoreNorm
} from '../../../../../api/urls/'

const { SubMenu } = Menu

export default class MenuComponent extends PureComponent {
    state = {
        collapsed: false
    }

    handleClick = (e) => {
        this.props.handleClickMenu(e.key)
    }

    saveFile = (url, fileName) => {
        ;(async function () {
            const res = await fetch(url)
            const blob = await res.blob()
            let link = document.createElement('a')
            link.setAttribute('download', fileName)
            link.setAttribute('target', '_blank')
            link.href = URL.createObjectURL(blob)
            link.click()
            URL.revokeObjectURL(link.href)
        })()

        /*
        let link = document.createElement('a')
        link.download = 'hello.txt'
        let blob = new Blob(['Hello world!'], {type: 'text/plain'})
        link.href = URL.createObjectURL(blob)
        link.click()
        URL.revokeObjectURL(link.href)
*/
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
                        key="equipment"
                        title={
                            <span>
                                <VerticalLeftOutlined />
                            </span>
                        }
                    >
                        <Menu.Item key="equipment50">50</Menu.Item>
                        <Menu.Item key="equipment56">56</Menu.Item>
                        <Menu.Item key="equipment57">57</Menu.Item>
                        <Menu.Item key="equipment61">61</Menu.Item>
                    </SubMenu>

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

                    <SubMenu
                        key="upload"
                        title={
                            <span>
                                <FileExcelOutlined />
                            </span>
                        }
                    >
                        <Menu.Item
                            key="upload-data"
                            onClick={() =>
                                this.saveFile(
                                    plan,
                                    'система_анализа_и_планирования_ремонтов_оборудования.xlsx'
                                )
                            }
                        >
                            Система анализа и планирования ремонтов
                        </Menu.Item>

                        <Menu.Item
                            key="upload-sortedNum"
                            onClick={() =>
                                this.saveFile(
                                    equipmentSortedNum,
                                    'оборудование_с_сортировкой_по_цеховому_номеру.xlsx'
                                )
                            }
                        >
                            Оборудование с сортировкой по цеховому номеру
                        </Menu.Item>

                        <Menu.Item
                            key="upload-sortedPercent"
                            onClick={() =>
                                this.saveFile(
                                    equipmentSortedPercent,
                                    'оборудование_с_сортировкой_по_проценту.xlsx'
                                )
                            }
                        >
                            Оборудование с сортировкой по проценту (простои / наработка)
                        </Menu.Item>

                        <Menu.Item
                            key="upload-filteredPercentMoreNorm"
                            onClick={() =>
                                this.saveFile(
                                    equipmentFilteredPercentMoreNorm,
                                    'оборудование_не_соответствующее_нормативам_по_простоям.xlsx'
                                )
                            }
                        >
                            Оборудование, не соответствующее нормативам по простоям
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        )
    }
}
