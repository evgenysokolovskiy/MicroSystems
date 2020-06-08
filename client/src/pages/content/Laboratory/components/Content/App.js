import React, { PureComponent, Suspense, lazy } from 'react'
import clonedeep from 'lodash.clonedeep'

import MenuComponent from './MenuComponent'
// Antd
import { Layout, Typography, Tabs } from 'antd'
import { LoadingOutlined, PercentageOutlined, FieldBinaryOutlined } from '@ant-design/icons'
// Styled-components
import { Container, Message } from '../../styles/'

const TablePercentComponent = lazy(() => import('./TableComponents/TablePercentComponent'))
const TableAmountComponent = lazy(() => import('./TableComponents/TableAmountComponent'))
const ChartComponent = lazy(() => import('./ChartComponents/ChartComponent'))

const { Content } = Layout
const { TabPane } = Tabs
const { Title, Text } = Typography

// Функция правильного отображения числовых значений для отсечек на XAxis
const CustomizedAxisTick = props => {
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

    handleChange = e => {
        this.props.handleClickAmount(e)
        this.setState({ activeTab: e })
    }

    handleChangeParam = e => {
        this.props.handleClickParam(e)
    }

    handleChangeProp = e => {
        this.props.handleClickProp(e)
    }

    render() {
        let {
            menu,
            param,
            prop,
            percent,
            amount,
            source,
            isLoadedPercent,
            isLoadedAmount,
            isLoadedSource,
            handleClickMenu,
            handleClickAmount,
            handleClickParam,
            handleClickProp
        } = this.props

        const { activeTab } = this.state

        const download = (
            <Container>
                <Message>
                    <Title level={4}>
                        <LoadingOutlined className="circleRed" />
                        ЗАГРУЖАЮТСЯ ДАННЫЕ
                    </Title>
                    <Text style={{ paddingLeft: 35 }}>Может занять некоторое время!</Text>
                </Message>
            </Container>
        )

        const mount = (
            <Container>
                <Message>
                    <Title level={4}>
                        <LoadingOutlined className="circleBlue" />
                        МОНТИРУЕТСЯ ГРАФИК
                    </Title>
                    <Text style={{ paddingLeft: 35 }}>Может занять некоторое время!</Text>
                </Message>
            </Container>
        )

        const tabs = (
            <Tabs type="card" defaultActiveKey={activeTab} onChange={this.handleChange}>
                <TabPane
                    tab=<PercentageOutlined style={{ fontSize: '14px', color: '#08c' }} />
                    key={'percent'}
                />

                <TabPane
                    tab=<FieldBinaryOutlined style={{ fontSize: '14px', color: '#08c' }} />
                    key={'amount'}
                />
            </Tabs>
        )

        if (!param) {
            param = source && Object.keys(source)[0]
        }
        if (!prop && source && param) {
            prop = Object.keys(source[param])[0]
            this.props.handleClickProp(Object.keys(source[param])[0])
        }
        if (source && param && prop && !Object.keys(source[param]).includes(prop)) {
            prop = Object.keys(source[param])[0]
            this.props.handleClickProp(Object.keys(source[param])[0])
        }

        const chart = source && param && prop && (
            <ChartComponent source={source[param][prop]} CustomizedAxisTick={CustomizedAxisTick} />
        )

        const percentTable = (
            <>
                {tabs}
                <TablePercentComponent
                    percent={percent}
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
                {tabs}
                <TableAmountComponent
                    amount={amount}
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
                        {isLoadedPercent && (
                            <Suspense fallback={mount}>
                                {percentTable ? percentTable : download}
                            </Suspense>
                        )}
                        {isLoadedAmount && (
                            <Suspense fallback={mount}>
                                {amountTable ? amountTable : download}
                            </Suspense>
                        )}
                    </Content>
                </Layout>
            </Content>
        )
    }
}
