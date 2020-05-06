import React, { PureComponent, Suspense, lazy } from 'react'
import clonedeep from 'lodash.clonedeep'
// Компоненты
import MenuComponent from './MenuComponent'
import InconstancyComponent from './ChartComponents/InconstancyComponent'
import PressureComponent from './ChartComponents/PressureComponent'
// Antd
import { Layout, Collapse, Tabs } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { Image1 } from '../../styles/'

const { Content } = Layout
const { Panel } = Collapse
const { TabPane } = Tabs

const TableComponent = lazy(() => import('./TableComponent/App'))
const AxisComponent = lazy(() => import('./AxisComponent/App'))
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
        axis: null,
        charts: null,
        date: ''
    }

    componentDidUpdate(prevProps) {
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
            if (prevProps.data !== this.props.data || prevProps.cards !== this.props.cards) {
                const {
                    types, // Все типы
                    type, // Текущий тип
                    cards, // Все номера карт
                    menu, // Текущая процедура
                    card, // Текущая карта
                    target: date, // Текущая временная отметка
                    data, // Данные для построения графиков
                    nameTotalTab // Наименование сводной карты
                } = this.props

                if (!data || !Object.keys(cards)[0]) return

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
                    cards['notBatchLoadingTime'].map(card => (
                        <TabPane tab={card} key={card} disabled />
                    ))

                // Графики (компонент)
                const charts = types && (
                    <Tabs
                        defaultActiveKey={String(type)}
                        type="card"
                        onChange={this.handleChangeType}
                    >
                        {types.map(type => (
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
                                    <Panel
                                        header="ДАВЛЕНИЕ, атм - СКОРОСТЬ, об/мин"
                                        key="pressureSpeed"
                                    >
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
                        ))}
                    </Tabs>
                )

                this.setState({ charts })
            }
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
        const {
            quality,
            mtime,
            menu,
            handleClickMenu,
            isLoadedQualityProduction,
            isLoadedMtime,
            isLoadedJoinTechnologyFact
        } = this.props
        const { axis, charts } = this.state

        const table = quality && mtime && (
            <TableComponent
                quality={clonedeep(quality)}
                mtime={mtime}
                CustomizedAxisTick={CustomizedAxisTick}
            />
        )

        return (
            <Content>
                <Layout style={{ background: '#fff' }} className="ant-layout-has-sider">
                    <MenuComponent handleClickMenu={handleClickMenu} />
                    <Content style={{ minHeight: '92vh' }}>
                        {menu && menu === 'table' && (
                            <Suspense
                                fallback={
                                    <div className="download">
                                        <h2>
                                            <LoadingOutlined className="circleBlue" />
                                            МОНТИРУЕМ ТАБЛИЦУ...
                                        </h2>
                                        <h4>Может занять некоторое время!</h4>
                                    </div>
                                }
                            >
                                {table ? (
                                    table
                                ) : (
                                    <div className="download">
                                        <h2>
                                            <LoadingOutlined className="circleRed" />
                                            ЗАГРУЖАЕМ ДАННЫЕ...
                                        </h2>
                                        <h4>Может занять некоторое время!</h4>
                                    </div>
                                )}
                            </Suspense>
                        )}

                        {menu && menu === 'axis' && (
                            <Suspense
                                fallback={
                                    <div className="download">
                                        <h2>
                                            <LoadingOutlined className="circleBlue" />
                                            МОНТИРУЕМ ГРАФИК...
                                        </h2>
                                        <h4>Может занять некоторое время!</h4>
                                    </div>
                                }
                            >
                                {isLoadedQualityProduction && isLoadedMtime && axis ? (
                                    axis
                                ) : (
                                    <div className="download">
                                        <h2>
                                            <LoadingOutlined className="circleRed" />
                                            ЗАГРУЖАЕМ ДАННЫЕ...
                                        </h2>
                                        <h4>Может занять некоторое время!</h4>
                                    </div>
                                )}
                            </Suspense>
                        )}

                        {menu && menu !== 'table' && menu !== 'axis' && (
                            <Suspense
                                fallback={
                                    <div className="download">
                                        <h2>
                                            <LoadingOutlined className="circleBlue" />
                                            МОНТИРУЕМ ГРАФИК...
                                        </h2>
                                        <h4>Может занять некоторое время!</h4>
                                    </div>
                                }
                            >
                                {isLoadedJoinTechnologyFact && charts ? (
                                    charts
                                ) : (
                                    <div className="download">
                                        <h2>
                                            <LoadingOutlined className="circleRed" />
                                            ЗАГРУЖАЕМ ДАННЫЕ...
                                        </h2>
                                        <h4>Может занять некоторое время!</h4>
                                    </div>
                                )}
                            </Suspense>
                        )}
                    </Content>
                </Layout>
            </Content>
        )
    }
}
