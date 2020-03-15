import React, { PureComponent, Suspense, lazy } from 'react'
// Компоненты
import MenuComponent from './MenuComponent'
import DiameterComponent from './ChartComponents/DiameterComponent'
import InconstancyComponent from './ChartComponents/InconstancyComponent'
import PressureComponent from './ChartComponents/PressureComponent'
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
            <text x={0} y={0} dy={16} textAnchor="end" fill="#000" transform="rotate(-35)" fontSize={12}>
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

    handleChangeType = e => {
        this.props.handleClickChangeTechType(e)
    }

    handleChangeCards = e => {
        this.props.handleClickChangeTechCards(e)
    }

    render() {
        const {
            types,
            cardNumbers,
            techCardNumber,
            data,
            techType,
            technology,
            fact,
            techTargetMenu,
            techTargetTimeStamp: date,
            dataDiameter, 
            dataInconstancyDimension, 
            dataPressureSpeed,
            handleClickMenu
        } = this.props


        const disabledCards = cardNumbers && cardNumbers['notBatchLoadingTime'].map(card => (
            <TabPane tab={card} key={card} disabled />
        ))

        const visibleCards = cardNumbers && cardNumbers['hasBatchLoadingTime'].map(card => (
            <TabPane tab={card} key={card} />
        ))

        const cards = [...visibleCards, ...disabledCards]



/*
        const cards = cardNumbers && cardNumbers.map(card => (
           <TabPane tab={card} key={card} />
        ))
*/
        // Контент на странице
        const elements = techTargetMenu && (
            <>
              <Tabs defaultActiveKey={techCardNumber} type="card" size="small" onChange={this.handleChangeCards}>
                {cards}
              </Tabs>
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

                    <Panel
                        header="НЕПОСТОЯНСТВО, мкм - РАЗНОРАЗМЕРНОСТЬ, мкм"
                        key="inconstancyDimension"
                    >
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
                            dataPressureSpeed={dataPressureSpeed}
                            CustomizedAxisTick={CustomizedAxisTick}
                        />
                    </Panel>
                </Collapse>
            </>
        )
        // Каждому Tab соответствует свой контент
        // Структура контента идентична. Различие во входящих данных
        const tabs = types && types.map(tab => (
            <TabPane tab={tab} key={tab}>
                {elements}
            </TabPane>
        ))

        return (
            <Content>
                <Layout
                    style={{ background: '#fff' }}
                    className="ant-layout-has-sider"
                >
                    <MenuComponent handleClickMenu={handleClickMenu} />
                    <Content style={{ minHeight: '92vh' }}>
                          <Tabs defaultActiveKey={'9.525'} type="card" onChange={this.handleChangeType}>
                            {tabs}
                        </Tabs>
                    </Content>
                </Layout>
            </Content>
        )
    }
}
