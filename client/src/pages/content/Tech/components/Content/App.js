import React, { PureComponent, Suspense, lazy } from 'react'
// Компоненты
import MenuComponent from './MenuComponent'
import InconstancyComponent from './ChartComponents/InconstancyComponent'
import PressureComponent from './ChartComponents/PressureComponent'
// Antd
import { Layout, Collapse, Tabs } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

const { Content } = Layout
const { Panel } = Collapse
const { TabPane } = Tabs

const TableComponent = lazy(() => import('./TableComponent/App'))
const DiameterComponent = lazy(() => import('./ChartComponents/DiameterComponent'))

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
        component: null,
        date: ''
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.menu !== this.props.menu ||
            prevProps.type !== this.props.type ||
            prevProps.card !== this.props.card ||
            prevProps.target !== this.props.target
        ) {
            const {
                types, // Все типы
                cards, // Все номера карт
                menu, // Текущая процедура
                card, // Текущая карта
                target: date, // Текущая временная отметка
                data, // Данные для построения графиков
                nameTotalTab, // Наименование сводной карты
                handleClickMenu
            } = this.props

            const { diameter, inconstancyDimension, pressureSpeed } = data

            // Активные карты
            const visibleCards =
                cards &&
                cards['hasBatchLoadingTime'] &&
                cards['hasBatchLoadingTime'].map(card => <TabPane tab={card} key={card} />)

            // Неактивные карты
            const disabledCards =
                cards &&
                cards['notBatchLoadingTime'] &&
                cards['notBatchLoadingTime'].map(card => <TabPane tab={card} key={card} disabled />)

            const component =
                types &&
                types.map(type => (
                    <TabPane tab={type} key={type}>
                        <Tabs
                            defaultActiveKey={nameTotalTab}
                            type="card"
                            onChange={this.handleChangeCards}
                        >
                            {visibleCards && [...visibleCards, ...disabledCards]}
                        </Tabs>
                        <Collapse defaultActiveKey={['diameter']}>
                            <Panel header="ДИАМЕТР, мм" key="diameter">
                                <DiameterComponent
                                    date={date}
                                    menu={menu}
                                    type={type}
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
                    </TabPane>
                ))

            this.setState({ component })
        }
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
        const { quality, menu, card, handleClickMenu } = this.props
        const { component } = this.state

        return (
            <Content>
                <Layout style={{ background: '#fff' }} className="ant-layout-has-sider">
                    <MenuComponent handleClickMenu={handleClickMenu} />
                    <Content style={{ minHeight: '92vh' }}>
                        {menu && menu === 'table' && (
                            <Suspense fallback={<LoadingOutlined className="loading" />}>
                                <TableComponent quality={quality} />
                            </Suspense>
                        )}

                        {menu && menu !== 'table' && (
                            <Suspense fallback={<LoadingOutlined className="loading" />}>
                                <Tabs
                                    defaultActiveKey={card}
                                    type="card"
                                    onChange={this.handleChangeType}
                                >
                                    {component ? (
                                        component
                                    ) : (
                                        <LoadingOutlined className="loading" />
                                    )}
                                </Tabs>
                            </Suspense>
                        )}
                    </Content>
                </Layout>
            </Content>
        )
    }
}
