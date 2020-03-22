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
        date: ''
    }
    // Получить текущие показатели при наведении мыши
    getData = data => {
        if (typeof data.payload[0] !== 'undefined') {
            const { date } = data.payload[0].payload
            this.setState({ date })
        }
    }

    // Событие выбора временной отметки (при клике данные из стейта)
    handleClick = () => {
        const { date } = this.state
        this.props.handleClickTimeStamp(date)
    }

    // Событие по типу подшипника
    handleChangeType = e => {
        this.props.handleClickChangeTechType(e)
    }

    // Событие по карте
    handleChangeCards = e => {
        this.props.handleClickChangeTechCards(e)
    }

    render() {
        const {
            types, // Все типы
            cards, // Все номера карт
            menu, // Текущая процедура
            card, // Текущая карта
            target: date, // Текущая временная отметка
            data, // Данные для построения графиков
            nameTotalTab,
            handleClickMenu
        } = this.props

        const { diameter, inconstancyDimension, pressureSpeed } = data

        // Активные карты
        const visibleCards =
            cards && cards['hasBatchLoadingTime'].map(card => <TabPane tab={card} key={card} />)

        // Неактивные карты
        const disabledCards =
            cards &&
            cards['notBatchLoadingTime'].map(card => <TabPane tab={card} key={card} disabled />)

        // Все карты
        const convertedCards = [...visibleCards, ...disabledCards]

        // Контент на странице
        const elements = menu && (
            <>
                <Tabs
                    defaultActiveKey={nameTotalTab}
                    type="card"
                    size="small"
                    onChange={this.handleChangeCards}
                >
                    {convertedCards}
                </Tabs>
                <Collapse defaultActiveKey={['diameter']}>
                    <Panel header="ДИАМЕТР, мм" key="diameter">
                        <DiameterComponent
                            date={date}
                            card={card}
                            diameter={diameter}
                            len={visibleCards.length}
                            nameTotalTab={nameTotalTab}
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
                            card={card}
                            inconstancyDimension={inconstancyDimension}
                            len={visibleCards.length}
                            nameTotalTab={nameTotalTab}
                            CustomizedAxisTick={CustomizedAxisTick}
                            handleClick={this.handleClick}
                            getData={this.getData}
                        />
                    </Panel>

                    <Panel header="ДАВЛЕНИЕ, атм - СКОРОСТЬ, об/мин" key="pressureSpeed">
                        <PressureComponent
                            date={date}
                            card={card}
                            pressureSpeed={pressureSpeed}
                            len={visibleCards.length}
                            nameTotalTab={nameTotalTab}
                            CustomizedAxisTick={CustomizedAxisTick}
                        />
                    </Panel>
                </Collapse>
            </>
        )

        const tabs =
            types &&
            types.map(tab => (
                <TabPane tab={tab} key={tab}>
                    {elements}
                </TabPane>
            ))

        return (
            <Content>
                <Layout style={{ background: '#fff' }} className="ant-layout-has-sider">
                    <MenuComponent handleClickMenu={handleClickMenu} />
                    <Content style={{ minHeight: '92vh' }}>
                        <Tabs
                            defaultActiveKey={'9.525'}
                            type="card"
                            onChange={this.handleChangeType}
                        >
                            {tabs}
                        </Tabs>
                    </Content>
                </Layout>
            </Content>
        )
    }
}
