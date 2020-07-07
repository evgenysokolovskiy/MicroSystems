import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import clonedeep from 'lodash.clonedeep'
import App from '../components/Content/App'
// fetch
import { fetchTypesMiddleware } from '../../../../api/middlewares/fetchTypesMiddleware'
import { fetchCardsMiddleware } from '../../../../api/middlewares/fetchCardsMiddleware'
import {
    fetchDiameterMiddleware,
    fetchInconstancyDimensionMiddleware,
    fetchPressureSpeedMiddleware
} from '../../../../api/middlewares/fetchJoinTechnologyFactMiddleware'
import { fetchQualityProductionMiddleware } from '../../../../api/middlewares/fetchQualityProductionMiddleware'
import { fetchMtimeMiddleware } from '../../../../api/middlewares/fetchMtimeMiddleware'
// actions
import { changeTechTargetMenu } from '../../../../store/tech/actions/techTargetMenuAction'
import { changeTechTargetTimeStamp } from '../../../../store/tech/actions/techTargetTimeStampAction'
import { changeTechTargetTimeStampData } from '../../../../store/tech/actions/techTargetTimeStampDataAction'
import { changeTechDrawerVisible } from '../../../../store/tech/actions/techDrawerAction'
import { changeType } from '../../../../store/tech/actions/techTypeAction'
import { changeCardNumber } from '../../../../store/tech/actions/techCardNumberAction'
import { calculateTargetData } from '../helpers/calculateTargetData'

const origin = window.location.origin

export class Content extends PureComponent {
    constructor(props) {
        super(props)
        this.nameTotalTab = 'Сводная'
        this.state = {
            isLoadedDiameter: false,
            isLoadedInconstancyDimension: false,
            isLoadedPressureSpeed: false,
            isLoadedTypes: false,
            isLoadedCards: false,
            isLoadedQualityProduction: false,
            isLoadedMtime: false,
            // Последняя открытая панель
            lastOpenedPanel: 'diameter'
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { techTargetMenu, techType, techCardNumber } = this.props
        const { lastOpenedPanel, isLoadedInconstancyDimension, isLoadedPressureSpeed } = this.state

        // *** ПРИНЯТЬ ДАННЫЕ

        // ПРИ СМЕНЕ МЕНЮ
        if (prevProps.techTargetMenu !== techTargetMenu) {
            // 1) Загрузить данные для вкладок меню: table, axis
            if (techTargetMenu === 'table' || techTargetMenu === 'axis') {
                const { fetchQualityProductionMiddleware, fetchMtimeMiddleware } = this.props
                // Загрузить данные, записать в стейт информацию о состоянии загрузки
                fetchQualityProductionMiddleware(this)
                fetchMtimeMiddleware(this)
            }
            // 2) Загрузить данные для вкладок меню, отображающих графики
            if (techTargetMenu !== 'table' && techTargetMenu !== 'axis') {
                const {
                    techType: type, // Тип подшипника
                    techCardNumber: card, // Номер карты
                    fetchTypesMiddleware,
                    fetchCardsMiddleware,
                    fetchDiameterMiddleware
                } = this.props

                const urlTypes = `${origin}/api/joinTechnologyFact/${techTargetMenu}/types`
                const urlCards = `${origin}/api/joinTechnologyFact/${techTargetMenu}/${type}/cards`
                const urlDiameter =
                    card === this.nameTotalTab
                        ? `${origin}/api/joinTechnologyFact/${techTargetMenu}/${type}/summary/diameter`
                        : `${origin}/api/joinTechnologyFact/${techTargetMenu}/${type}/${card}/diameter`

                // Загрузить данные, записать в стейт информацию о состоянии загрузки
                // Данные для inconstancyDimension и pressureSpeed по дефолту не загружаются
                fetchTypesMiddleware(urlTypes, this)
                fetchCardsMiddleware(urlCards, this)
                fetchDiameterMiddleware(urlDiameter, this)
            }
        }

        // ПРИ СМЕНЕ ТИПА
        if (prevProps.techType !== techType) {
            if (techTargetMenu !== 'table' && techTargetMenu !== 'axis') {
                const {
                    techType: type, // Тип подшипника
                    techCardNumber: card, // Номер карты
                    fetchCardsMiddleware,
                    fetchDiameterMiddleware
                } = this.props

                const urlCards = `${origin}/api/joinTechnologyFact/${techTargetMenu}/${type}/cards`
                const urlDiameter =
                    card === this.nameTotalTab
                        ? `${origin}/api/joinTechnologyFact/${techTargetMenu}/${type}/summary/diameter`
                        : `${origin}/api/joinTechnologyFact/${techTargetMenu}/${type}/${card}/diameter`

                // Загрузить данные, записать в стейт информацию о состоянии загрузки
                fetchCardsMiddleware(urlCards, this)
                fetchDiameterMiddleware(urlDiameter, this)
            }
        }

        // ПРИ СМЕНЕ КАРТЫ
        if (prevProps.techCardNumber !== techCardNumber) {
            if (techTargetMenu !== 'table' && techTargetMenu !== 'axis') {
                const {
                    techType: type, // Тип подшипника
                    techCardNumber: card, // Номер карты
                    fetchDiameterMiddleware
                } = this.props

                const urlDiameter =
                    card === this.nameTotalTab
                        ? `${origin}/api/joinTechnologyFact/${techTargetMenu}/${type}/summary/diameter`
                        : `${origin}/api/joinTechnologyFact/${techTargetMenu}/${type}/${card}/diameter`

                // Загрузить данные, записать в стейт информацию о состоянии загрузки
                fetchDiameterMiddleware(urlDiameter, this)
            }
        }

        // ЗАГРУЗКА ПРИ ОТКРЫТИИ ПАНЕЛИ
        if (prevState.lastOpenedPanel !== this.state.lastOpenedPanel) {
            const {
                techType: type, // Тип подшипника
                techCardNumber: card, // Номер карты
                fetchInconstancyDimensionMiddleware,
                fetchPressureSpeedMiddleware
            } = this.props

            const urlInconstancyDimension =
                card === this.nameTotalTab
                    ? `${origin}/api/joinTechnologyFact/${techTargetMenu}/${type}/summary/inconstancyDimension`
                    : `${origin}/api/joinTechnologyFact/${techTargetMenu}/${type}/${card}/inconstancyDimension`
            const urlPressureSpeed =
                card === this.nameTotalTab
                    ? `${origin}/api/joinTechnologyFact/${techTargetMenu}/${type}/summary/pressureSpeed`
                    : `${origin}/api/joinTechnologyFact/${techTargetMenu}/${type}/${card}/pressureSpeed`

            // Загрузить данные, записать в стейт информацию о состоянии загрузки
            // Данные для diameter загружаются при изменении menu (т.е. по дефолту уже загружены)
            lastOpenedPanel === 'inconstancyDimension' &&
                !isLoadedInconstancyDimension &&
                fetchInconstancyDimensionMiddleware(urlInconstancyDimension, this)
            lastOpenedPanel === 'pressureSpeed' &&
                !isLoadedPressureSpeed &&
                fetchPressureSpeedMiddleware(urlPressureSpeed, this)
        }
    } // end componentDidUpdate

    // Событие по меню (выбора процедуры)
    handleClickMenu = (item) => {
        this.props.changeTechTargetMenu(item)
        this.props.changeCardNumber(this.nameTotalTab)
        // Перевести в false состояние для новых загрузок
        this.setState({
            isLoadedDiameter: false,
            isLoadedInconstancyDimension: false,
            isLoadedPressureSpeed: false,
            isLoadedTypes: false,
            isLoadedCards: false,
            isLoadedQualityProduction: false,
            isLoadedMtime: false,
            lastOpenedPanel: 'diameter'
        })
    }

    // Событие по типу подшипника
    handleClickChangeTechType = (e) => {
        // Изменить тип подшипника
        this.props.changeType(+e)
        // Изменить номер карты
        this.props.changeCardNumber(this.nameTotalTab)
        // Перевести в false состояние для новых загрузок
        this.setState({
            isLoadedDiameter: false,
            isLoadedInconstancyDimension: false,
            isLoadedPressureSpeed: false,
            isLoadedCards: false,
            lastOpenedPanel: 'diameter'
        })
    }

    // Событие по карте
    handleClickChangeTechCards = (e) => {
        // Изменить номер карты
        this.props.changeCardNumber(e)
        this.setState({
            isLoadedDiameter: false,
            isLoadedInconstancyDimension: false,
            isLoadedPressureSpeed: false,
            lastOpenedPanel: 'diameter'
        })
    }

    // Событие выбора временной отметки
    handleClickTimeStamp = (item) => {
        this.props.changeTechTargetTimeStamp(item)
        this.props.changeTechDrawerVisible(true)
    }

    // Последяя открытая панель
    handleLastOpenedPanel = (key) => {
        this.setState({ lastOpenedPanel: key })
    }

    render() {
        let {
            techDiameter: diameter,
            techInconstancyDimension: inconstancyDimension,
            techPressureSpeed: pressureSpeed,
            techTypes: types, // Типы подшипника для данной операции
            techCards: cards, // Номера карт для данного типа
            techTargetMenu: menu, // Меню (процедура)
            techType: type, // Тип подшипника
            techCardNumber: card, // Номер карты
            techQualityProduction, // Данные качества выпускаемой продукции на основе факта (проверок)
            techMtime: mtime, // Дата изменения файла фактических данных на сервере
            techTargetTimeStamp: target // Момент времени
        } = this.props

        const {
            isLoadedTypes,
            isLoadedCards,
            isLoadedDiameter,
            isLoadedInconstancyDimension,
            isLoadedPressureSpeed,
            isLoadedQualityProduction,
            isLoadedMtime,
            lastOpenedPanel
        } = this.state

        // Типы подшипника, определённые в технологии (для вывода в меню типов) для всех операций
        const quality = clonedeep(techQualityProduction)
        if (quality && menu === 'axis')
            types = Object.keys(quality['all']['types']).sort((a, b) => a - b)

        // Данные по отметке времени
        const data = { diameter, inconstancyDimension, pressureSpeed }
        data &&
            menu &&
            menu !== 'table' &&
            menu !== 'axis' &&
            type &&
            this.props.changeTechTargetTimeStampData(calculateTargetData(data, target))

        return (
            <App
                menu={menu}
                types={types}
                cards={cards}
                type={type}
                card={card}
                target={target}
                diameter={diameter}
                inconstancyDimension={inconstancyDimension}
                pressureSpeed={pressureSpeed}
                mtime={mtime}
                quality={quality}
                nameTotalTab={this.nameTotalTab}
                lastOpenedPanel={lastOpenedPanel}
                // Состояние загрузки
                isLoadedTypes={isLoadedTypes}
                isLoadedCards={isLoadedCards}
                isLoadedDiameter={isLoadedDiameter}
                isLoadedInconstancyDimension={isLoadedInconstancyDimension}
                isLoadedPressureSpeed={isLoadedPressureSpeed}
                isLoadedQualityProduction={isLoadedQualityProduction}
                isLoadedMtime={isLoadedMtime}
                // Функции
                handleClickMenu={this.handleClickMenu}
                handleClickTimeStamp={this.handleClickTimeStamp}
                handleClickChangeTechType={this.handleClickChangeTechType}
                handleClickChangeTechCards={this.handleClickChangeTechCards}
                handleLastOpenedPanel={this.handleLastOpenedPanel}
            />
        )
    }
}

function mapStateToProps(store) {
    return {
        ...store.techTypesReducer,
        ...store.techCardsReducer,
        ...store.techTargetMenuReducer,
        ...store.techTargetTimeStampReducer,
        ...store.techQualityProductionReducer,
        ...store.techJoinTechnologyFactReducer,
        ...store.techDiameterReducer,
        ...store.techInconstancyDimensionReducer,
        ...store.techPressureSpeedReducer,
        ...store.techIntervalReducer,
        ...store.techMtimeReducer,
        ...store.techTechnologyReducer,
        ...store.techShpFactReducer,
        ...store.techTypeReducer,
        ...store.techCardNumberReducer
    }
}

const mapDispatchToProps = {
    fetchTypesMiddleware,
    fetchCardsMiddleware,
    fetchDiameterMiddleware,
    fetchInconstancyDimensionMiddleware,
    fetchPressureSpeedMiddleware,
    fetchQualityProductionMiddleware,
    fetchMtimeMiddleware,
    changeTechTargetMenu,
    changeTechTargetTimeStamp,
    changeTechTargetTimeStampData,
    changeTechDrawerVisible,
    changeType,
    changeCardNumber
}

export default connect(mapStateToProps, mapDispatchToProps)(Content)

/*
let obj = {}      
Object.entries(clonedeep(techJoinTechnologyFact)).forEach(procedure => {
    Object.values(procedure).forEach(item => {
        if (typeof item !== 'object') return
        Object.entries(item).forEach(type => {
            if (!+type[0]) return
            obj[type[0]] = {...obj[type[0]], ...{[procedure[0]]: type[1]}}
        })
    })
})
console.log(obj)
*/
