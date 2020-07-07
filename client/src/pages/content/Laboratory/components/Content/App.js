import React, { PureComponent, Suspense, lazy } from 'react'

import MenuComponent from './MenuComponent'
import RangePickerComponent from './RangePickerComponent'
// Antd
import { Layout, Typography, Tabs } from 'antd'
import {
    LoadingOutlined,
    PercentageOutlined,
    FieldBinaryOutlined,
    PrinterOutlined
} from '@ant-design/icons'
// Styled-components
import { Container, Message } from '../../styles/'

const TablePercentComponent = lazy(() => import('./TableComponents/TablePercentComponent'))
const TableAmountComponent = lazy(() => import('./TableComponents/TableAmountComponent'))
const ChartComponent = lazy(() => import('./ChartComponents/ChartComponent'))

const { Content } = Layout
const { TabPane } = Tabs
const { Title } = Typography

// Функция правильного отображения числовых значений для отсечек на XAxis
const CustomizedAxisTick = (props) => {
    const { x, y, payload } = props

    return (
        <g transform={`translate(${x}, ${y})`}>
            <text
                x={0}
                y={0}
                dy={16}
                textAnchor="end"
                fill="#000"
                transform="rotate(-35)"
                fontSize={12}
            >
                {payload.value}
            </text>
        </g>
    )
}

export default class App extends PureComponent {
    state = {
        activeTab: 'percent'
    }

    componentDidUpdate(prevProps) {
        let { source, param, prop, handleClickParam, handleClickProp } = this.props

        if (/*!prevProps.source && */ prevProps.source !== source) {
            handleClickParam(Object.keys(source)[0])
        }

        if (
            (source && param && !prop && prevProps.source !== source) ||
            prevProps.param !== param
        ) {
            const val = Object.values(source).find((item) => Object.keys(item).length)
            val && handleClickProp(Object.keys(val)[0])
        }

        if (
            source &&
            param &&
            prop &&
            source[param] &&
            !Object.keys(source[param]).includes(prop)
        ) {
            handleClickProp(Object.keys(source[param])[0])
        }
    }

    handleChange = (e) => {
        this.props.handleClickAmount(e)
        this.setState({ activeTab: e })
    }

    handleChangeParam = (e) => {
        this.props.handleClickParam(e)
    }

    handleChangeProp = (e) => {
        this.props.handleClickProp(e)
    }

    onPrint = () => {
        //const content = document.querySelector('.labTable')
        //const root = document.getElementById('root')
        //root.style.display = 'none'

        window.print()

        //const printWrapper = document.createElement('div')
        //printWrapper.innerHTML = content.innerHTML
        //document.documentElement.appendChild(printWrapper)

        //document.getElementById('root').innerHTML = content.innerHTML

        //print.appendChild(content)

        //root.style.display = 'none'

        //window.print()

        //root.style.display = 'block'

        //print.removeChild(content)
        //print.style.display = 'none'

        /*
        let content1 = document.querySelector('.test')
        let pri = document.getElementById('ifmcontentstoprint').contentWindow
        //const cssLink = document.createElement('link')
        //cssLink.href = '../src/styles/index.css'
        //cssLink.rel = 'stylesheet'
        //cssLink.type = 'text/css'

        //pri.document.head.appendChild(`<style type='text/css'>table{border: 2px solid #444;}</style>`)

        pri.document.open()
        pri.document.write(content1.innerHTML)
        //pri.document.head.appendChild(`<style type='text/css'>table{border: 2px solid #444;}</style>`)
        //pri.document.head.appendChild(cssLink)
        pri.document.close()
        pri.focus()
        pri.print()
*/
    }

    render() {
        let {
            menu,
            range,
            param,
            prop,
            equipment,
            percent,
            amount,
            source,
            rowTotal,
            columnTotal,
            isLoadedPercent,
            isLoadedAmount,
            handleClickMenu,
            handleClickParam,
            handleClickProp,
            handleClickEquipment,
            handleClickRangeDate
        } = this.props

        const { activeTab } = this.state

        const download = (
            <Container>
                <Message>
                    <Title level={4}>
                        <LoadingOutlined className="circleRed" />
                        ПОСТРОЕНИЕ ДАННЫХ
                    </Title>
                </Message>
            </Container>
        )

        const mount = (
            <Container>
                <Message>
                    <Title level={4}>
                        <LoadingOutlined className="circleBlue" />
                        ПОСТРОЕНИЕ ДАННЫХ
                    </Title>
                </Message>
            </Container>
        )

        const tabs = (
            <Tabs type="card" defaultActiveKey={activeTab} onChange={this.handleChange}>
                <TabPane
                    tab=<PercentageOutlined style={{ fontSize: '16px', color: '#08c' }} />
                    key={'percent'}
                />

                <TabPane
                    tab=<FieldBinaryOutlined style={{ fontSize: '16px', color: '#08c' }} />
                    key={'amount'}
                />
            </Tabs>
        )

        const chart = source && param && prop && source[param] && source[param][prop] && (
            <ChartComponent
                source={source[param][prop]}
                prop={prop}
                equipment={equipment}
                CustomizedAxisTick={CustomizedAxisTick}
                handleClickEquipment={handleClickEquipment}
            />
        )

        const percentTable = (
            <>
                <Layout style={{ background: '#fff' }} className="ant-layout-has-sider">
                    <div className="labHeader">
                        {tabs}
                        <RangePickerComponent
                            range={range}
                            handleClickRangeDate={handleClickRangeDate}
                        />
                        <PrinterOutlined
                            style={{
                                fontSize: '20px',
                                paddingLeft: '10px',
                                color: '#999',
                                cursor: 'pointer'
                            }}
                            onClick={this.onPrint}
                        />
                    </div>
                </Layout>
                <TablePercentComponent
                    percent={percent}
                    rowTotal={rowTotal}
                    columnTotal={columnTotal}
                    menu={menu}
                    param={param}
                    prop={prop}
                    handleClickParam={handleClickParam}
                    handleClickProp={handleClickProp}
                />
                {chart}
            </>
        )

        const amountTable = (
            <>
                <Layout style={{ background: '#fff' }} className="ant-layout-has-sider">
                    <div className="labHeader">
                        {tabs}
                        <RangePickerComponent
                            range={range}
                            handleClickRangeDate={handleClickRangeDate}
                        />
                        <PrinterOutlined
                            style={{
                                fontSize: '20px',
                                paddingLeft: '10px',
                                color: '#999',
                                cursor: 'pointer'
                            }}
                            onClick={this.onPrint}
                        />
                    </div>
                </Layout>
                <TableAmountComponent
                    amount={amount}
                    rowTotal={rowTotal}
                    columnTotal={columnTotal}
                    menu={menu}
                    param={param}
                    prop={prop}
                    handleClickParam={handleClickParam}
                    handleClickProp={handleClickProp}
                />
                {chart}
            </>
        )

        return (
            <Content>
                <Layout style={{ background: '#fff' }} className="ant-layout-has-sider">
                    <MenuComponent handleClickMenu={handleClickMenu} />
                    <Content style={{ minHeight: '92vh' }}>
                        {!source && menu && download}
                        {menu && activeTab === 'percent' && source && param && prop && (
                            <Suspense fallback={mount}>
                                {isLoadedPercent ? percentTable : download}
                            </Suspense>
                        )}

                        {menu && menu && activeTab === 'amount' && (
                            <Suspense fallback={mount}>
                                {isLoadedAmount ? amountTable : download}
                            </Suspense>
                        )}
                    </Content>
                </Layout>
            </Content>
        )
    }
}
