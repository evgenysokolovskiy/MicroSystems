import React, { PureComponent, Suspense, lazy } from 'react'
import clonedeep from 'lodash.clonedeep'
// Компоненты
import MenuComponent from './MenuComponent'
import InconstancyComponent from './ChartComponents/InconstancyComponent'
import PressureComponent from './ChartComponents/PressureComponent'
// Antd
import { Layout, Collapse, Tabs, Typography } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { Container, Message } from '../../styles/'

import componentLoader from '../../../componentLoader'

const { Content } = Layout
const { Panel } = Collapse
const { TabPane } = Tabs
const { Title, Text } = Typography

const TableComponent = lazy(() => componentLoader(() => import('./TableComponent/App')))
const AxisComponent = lazy(() => componentLoader(() => import('./AxisComponent/App')))
const DiameterComponent = lazy(() => componentLoader(() => import('./ChartComponents/DiameterComponent')))

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
        axis: null,
        charts: null,
        date: ''
    }

    componentDidUpdate(prevProps, prevState) {
        // 1) Построение осевого графика
        if (this.props.menu === 'axis') {
            // Условие формирования графика
            if (
                prevProps.isLoadedMtime !== this.props.isLoadedMtime ||
                prevProps.isLoadedQualityProduction !== this.props.isLoadedQualityProduction ||
                prevProps.type !== this.props.type
            ) {
                const {
                    types, // Все типы
                    type, // Текущий тип
                    quality,
                    mtime
                } = this.props

                // Осевой график (компонент)
                const axis = quality && mtime && types && type && (
                    <>
                        <h4 style={{ paddingLeft: 20, paddingTop: 20 }}>
                            Осевой график запущенных процессов
                        </h4>
                        <Tabs
                            defaultActiveKey={String(type)}
                            type="card"
                            onChange={this.handleChangeType}
                        >
                            {types.map(type => (
                                <TabPane tab={type} key={type}>
                                    <AxisComponent
                                        type={type}
                                        quality={clonedeep(quality)}
                                        mtime={mtime}
                                    />
                                </TabPane>
                            ))}
                        </Tabs>
                    </>
                )

                this.setState({ axis })
            }
        }

        // 2) Построение графической части
        if (this.props.menu !== 'table' && this.props.menu !== 'axis') {
            // Условие формирования графиков
            if (
                prevProps.diameter !== this.props.diameter ||
                prevProps.inconstancyDimension !== this.props.inconstancyDimension ||
                prevProps.pressureSpeed !== this.props.pressureSpeed ||
                prevProps.cards !== this.props.cards ||
                prevProps.isLoadedInconstancyDimension !==
                    this.props.isLoadedInconstancyDimension ||
                prevProps.isLoadedPressureSpeed !== this.props.isLoadedPressureSpeed ||
                prevProps.target !== this.props.target
            ) {
                const {
                    types, // Все типы
                    type, // Текущий тип
                    cards, // Все номера карт
                    menu, // Текущая процедура
                    card, // Текущая карта
                    target: date, // Текущая временная отметка
                    diameter,
                    inconstancyDimension,
                    pressureSpeed,
                    nameTotalTab // Наименование сводной карты
                } = this.props

                if (!Object.keys(cards)[0]) return

                // Активные карты
                const visibleCards =
                    cards &&
                    cards['hasBatchLoadingTime'] &&
                    cards['hasBatchLoadingTime'].map(card => <TabPane tab={card} key={card} />)

                // Неактивные карты
                const disabledCards =
                    cards &&
                    cards['notBatchLoadingTime'] &&
                    cards['notBatchLoadingTime'].map(card => (
                        <TabPane tab={card} key={card} disabled />
                    ))

                // Графики (компонент)
                const Diameter = diameter && (
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
                )

                const InconstancyDimension = inconstancyDimension && (
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
                )

                const PressureSpeed = pressureSpeed && (
                    <PressureComponent
                        date={date}
                        card={card}
                        pressureSpeed={pressureSpeed}
                        len={visibleCards.length}
                        nameTotalTab={nameTotalTab}
                        CustomizedAxisTick={CustomizedAxisTick}
                    />
                )

                const charts = types && (diameter || inconstancyDimension || pressureSpeed) && (
                    <Tabs
                        defaultActiveKey={String(type)}
                        type="card"
                        onChange={this.handleChangeType}
                    >
                        {types.map(type => (
                            <TabPane tab={type} key={type}>
                                <Tabs
                                    defaultActiveKey={card ? card : nameTotalTab}
                                    type="card"
                                    onChange={this.handleChangeCards}
                                >
                                    {visibleCards && [...visibleCards, ...disabledCards]}
                                </Tabs>
                                <Collapse
                                    defaultActiveKey={['diameter']}
                                    onChange={this.handleChangePanel}
                                >
                                    <Panel header="ДИАМЕТР, мм" key="diameter">
                                        {Diameter}
                                    </Panel>

                                    <Panel
                                        header="НЕПОСТОЯНСТВО, мкм - РАЗНОРАЗМЕРНОСТЬ, мкм"
                                        key="inconstancyDimension"
                                    >
                                        {this.props.isLoadedInconstancyDimension ? (
                                            InconstancyDimension
                                        ) : (
                                            <Text>
                                                <LoadingOutlined className="circleRed" />
                                                ПОСТРОЕНИЕ ДАННЫХ
                                            </Text>
                                        )}
                                    </Panel>

                                    <Panel
                                        header="ДАВЛЕНИЕ, атм - СКОРОСТЬ, об/мин"
                                        key="pressureSpeed"
                                    >
                                        {this.props.isLoadedPressureSpeed ? (
                                            PressureSpeed
                                        ) : (
                                            <Text>
                                                <LoadingOutlined className="circleRed" />
                                                ПОСТРОЕНИЕ ДАННЫХ
                                            </Text>
                                        )}
                                    </Panel>
                                </Collapse>
                            </TabPane>
                        ))}
                    </Tabs>
                )

                this.setState({ charts })
            }
        }
    }

    // Получить текущие показатели при наведении мыши
    getData = data => {
        if (data.payload && typeof data.payload[0] !== 'undefined') {
            const { date } = data.payload[0].payload
            this.setState({ date })
        }
    }

    // Событие выбора временной отметки (при клике данные из стейта)
    handleClick = () => {
        const { card, nameTotalTab } = this.props
        const { date } = this.state
        card !== nameTotalTab && this.props.handleClickTimeStamp(date)
    }

    // Событие по типу подшипника
    handleChangeType = e => {
        this.props.handleClickChangeTechType(e)
    }

    // Событие по карте
    handleChangeCards = e => {
        this.props.handleClickChangeTechCards(e)
    }

    // Открытые панели
    handleChangePanel = key => {
        // Передать key последней по времени открытой панели
        this.props.handleLastOpenedPanel(key[key.length - 1])
    }

    render() {
        const {
            menu,
            quality,
            mtime,
            isLoadedQualityProduction,
            isLoadedMtime,
            isLoadedDiameter,
            handleClickMenu
        } = this.props
        const { axis, charts } = this.state

        const table = quality && mtime && (
            <TableComponent
                quality={clonedeep(quality)}
                mtime={mtime}
                CustomizedAxisTick={CustomizedAxisTick}
            />
        )

        const download = (
            <Container>
                <Message>
                    <Title level={4}>
                        <LoadingOutlined className="circleRed" />
                        ПОСТРОЕНИЕ ДАННЫХ
                    </Title>
                    <Text style={{ paddingLeft: 35 }}>Может потребоваться несколько минут!</Text>
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
                    <Text style={{ paddingLeft: 35 }}>Может потребоваться несколько минут!</Text>
                </Message>
            </Container>
        )

        return (
            <Content>
                <Layout style={{ background: '#fff' }} className="ant-layout-has-sider">
                    <MenuComponent handleClickMenu={handleClickMenu} />
                    <Content style={{ minHeight: '92vh' }}>
                        {menu && menu === 'table' && (
                            <Suspense fallback={mount}>{table ? table : download}</Suspense>
                        )}

                        {menu && menu === 'axis' && (
                            <Suspense fallback={mount}>
                                {isLoadedQualityProduction && isLoadedMtime && axis
                                    ? axis
                                    : download}
                            </Suspense>
                        )}

                        {menu && menu !== 'table' && menu !== 'axis' && (
                            <Suspense fallback={mount}>
                                {isLoadedDiameter && charts ? charts : download}
                            </Suspense>
                        )}
                    </Content>
                </Layout>
            </Content>
        )
    }
}
