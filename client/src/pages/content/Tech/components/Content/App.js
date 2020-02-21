import React, { PureComponent, Suspense, lazy } from 'react'
// Компоненты
import MenuComponent from './MenuComponent'
import DiameterComponent from './ChartComponents/DiameterComponent'
import InconstancyComponent from './ChartComponents/InconstancyComponent'
import PressureComponent from './ChartComponents/PressureComponent'
import { diameter } from '../../constants'
// Antd
import { Layout, Collapse, Table, Tabs, Icon } from 'antd'

const { Content } = Layout
const { Panel } = Collapse
const { TabPane } = Tabs

// Функция правильного отображения числовых значений для отсечек на XAxis
const CustomizedAxisTick = props => {
    const { x, y, payload } = props

    return (
        <g transform={`translate(${x}, ${y})`}>
            <text dy={16} textAnchor="middle" fill="#666">
                {payload.value}
            </text>
        </g>
    )
}

export default class App extends PureComponent {
    state = {
        date: ''
    }
    // Получить текущие показатели при наведении мыши
    getData = data => {
        if (typeof data.payload[0] !== 'undefined') {
            const { date } = data.payload[0].payload
            this.setState({ date })
        }
    }
    // При клике данные из стейта
    handleClick = () => {
        const { date } = this.state
        this.props.handleClickTimeStamp(date)
    }

    render() {
        const {
            data,
            technology,
            fact,
            techTargetMenu,
            techTargetTimeStamp: date,
            handleClickMenu
        } = this.props

        const { dataDiameter, dataInconstancyDimension, datapPessureSpeed } = data

        // Контент на странице
        const elements = techTargetMenu && techTargetMenu === 'running' && (
            <Collapse defaultActiveKey={['diameter']}>
                <Panel header="ДИАМЕТР, мм" key="diameter">
                    <DiameterComponent
                        date={date}
                        dataDiameter={dataDiameter}
                        CustomizedAxisTick={CustomizedAxisTick}
                        handleClick={this.handleClick}
                        getData={this.getData}
                    />
                </Panel>

                <Panel header="НЕПОСТОЯНСТВО, мкм - РАЗМЕРНОСТЬ, мкм" key="inconstancyDimension">
                    <InconstancyComponent
                        date={date}
                        dataInconstancyDimension={dataInconstancyDimension}
                        CustomizedAxisTick={CustomizedAxisTick}
                        handleClick={this.handleClick}
                        getData={this.getData}
                    />
                </Panel>

                <Panel header="ДАВЛЕНИЕ, атм - СКОРОСТЬ, об/мин" key="pressureSpeed">
                    <PressureComponent
                        date={date}
                        datapPessureSpeed={datapPessureSpeed}
                        CustomizedAxisTick={CustomizedAxisTick}
                    />
                </Panel>
            </Collapse>
        )
        // Каждому Tab соответствует свой контент
        // Структура контента идентична. Различие во входящих данных
        const tabs = diameter.map(tab => (
            <TabPane tab={tab} key={tab}>
                {elements}
            </TabPane>
        ))

        return (
            <Content>
                <Layout
                    style={{ /*padding: '24px 0',*/ background: '#fff' }}
                    className="ant-layout-has-sider"
                >
                    <MenuComponent handleClickMenu={handleClickMenu} />
                    <Content style={{ /*padding: '0 24px',*/ minHeight: 280 }}>
                        <Tabs defaultActiveKey="3,175" type="card">
                            {tabs}
                        </Tabs>
                    </Content>
                </Layout>
            </Content>
        )
    }
}
