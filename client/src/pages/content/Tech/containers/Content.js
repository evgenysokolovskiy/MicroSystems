import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import clonedeep from 'lodash.clonedeep'
import App from '../components/Content/App'
// fetch
import { fetchTypesMiddleware } from '../../../../api/middlewares/fetchTypesMiddleware'
import { fetchCardsMiddleware } from '../../../../api/middlewares/fetchCardsMiddleware'
import { fetchJoinTechnologyFactMiddleware } from '../../../../api/middlewares/fetchJoinTechnologyFactMiddleware'
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

export class Content extends PureComponent {
    constructor(props) {
        super(props)
        this.nameTotalTab = 'Сводная'
        this.state = {
            data: null,
            type: null,
            card: null,
            quality: null,
            mtime: null,
            isLoadedJoinTechnologyFact: false,
            isLoadedTypes: false,
            isLoadedCards: false,
            isLoadedQualityProduction: false,
            isLoadedMtime: false
        }
    }

    componentDidUpdate(prevProps) {
        const { techJoinTechnologyFact, techTargetMenu, techType, techCardNumber } = this.props

        // *** ЗАПИСАТЬ В СТЕЙТ
        if (techTargetMenu === 'table' || techTargetMenu === 'axis') {
            if (prevProps.techType !== techType) {
                this.setState({ type: techType })
            }
        }

        if (techTargetMenu !== 'table' && techTargetMenu !== 'axis') {
            if (prevProps.techJoinTechnologyFact !== techJoinTechnologyFact) {
                const data = clonedeep(techJoinTechnologyFact)
                this.setState({ data })
            }

            if (prevProps.techType !== techType) {
                this.setState({ type: techType })
            }

            if (prevProps.techCardNumber !== techCardNumber) {
                this.setState({ card: techCardNumber })
            }
        }

        // *** ПРИНЯТЬ ДАННЫЕ

        // При изменении меню
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
                    fetchJoinTechnologyFactMiddleware
                } = this.props

                const urlTypes = `http://localhost:3000/api/joinTechnologyFact/${techTargetMenu}/types`
                const urlCards = `http://localhost:3000/api/joinTechnologyFact/${techTargetMenu}/${type}/cards`
                const urlData =
                    card === this.nameTotalTab
                        ? `http://localhost:3000/api/joinTechnologyFact/${techTargetMenu}/${type}/summary`
                        : `http://localhost:3000/api/joinTechnologyFact/${techTargetMenu}/${type}/${card}`

                // Загрузить данные, записать в стейт информацию о состоянии загрузки
                fetchTypesMiddleware(urlTypes, this)
                fetchCardsMiddleware(urlCards, this)
                fetchJoinTechnologyFactMiddleware(urlData, this)
            }
        }

        // При изменении типа
        if (prevProps.techType !== techType) {
            if (techTargetMenu !== 'table' && techTargetMenu !== 'axis') {
                const {
                    fetchCardsMiddleware,
                    fetchJoinTechnologyFactMiddleware,
                    techType: type, // Тип подшипника
                    techCardNumber: card // Номер карты
                } = this.props

                const urlCards = `http://localhost:3000/api/joinTechnologyFact/${techTargetMenu}/${type}/cards`
                const urlData =
                    card === this.nameTotalTab
                        ? `http://localhost:3000/api/joinTechnologyFact/${techTargetMenu}/${type}/summary`
                        : `http://localhost:3000/api/joinTechnologyFact/${techTargetMenu}/${type}/${card}`

                // Загрузить данные, записать в стейт информацию о состоянии загрузки
                fetchJoinTechnologyFactMiddleware(urlData, this)
                fetchCardsMiddleware(urlCards, this)
            }
        }

        // При изменении карты
        if (prevProps.techCardNumber !== techCardNumber) {
            if (techTargetMenu !== 'table' && techTargetMenu !== 'axis') {
                const {
                    fetchJoinTechnologyFactMiddleware,
                    techType: type, // Тип подшипника
                    techCardNumber: card // Номер карты
                } = this.props

                const urlData =
                    card === this.nameTotalTab
                        ? `http://localhost:3000/api/joinTechnologyFact/${techTargetMenu}/${type}/summary`
                        : `http://localhost:3000/api/joinTechnologyFact/${techTargetMenu}/${type}/${card}`

                // Загрузить данные, записать в стейт информацию о состоянии загрузки
                fetchJoinTechnologyFactMiddleware(urlData, this)
            }
        }
    }

    // Событие по меню (выбора процедуры)
    handleClickMenu = item => {
        this.props.changeTechTargetMenu(item)
        this.props.changeCardNumber(this.nameTotalTab)
        // Перевести в false состояние для новых загрузок
        this.setState({
            isLoadedJoinTechnologyFact: false,
            isLoadedTypes: false,
            isLoadedCards: false,
            isLoadedQualityProduction: false,
            isLoadedMtime: false
        })
    }

    // Событие по типу подшипника
    handleClickChangeTechType = e => {
        // Изменить тип подшипника
        this.props.changeType(+e)
        this.props.changeCardNumber(this.nameTotalTab)

        // Перевести в false состояние для новых загрузок
        this.setState({
            isLoadedJoinTechnologyFact: false,
            isLoadedCards: false
        })
    }

    // Событие по карте
    handleClickChangeTechCards = e => {
        this.props.changeCardNumber(e)
        this.setState({
            isLoadedJoinTechnologyFact: false
        })
    }

    // Событие выбора временной отметки
    handleClickTimeStamp = item => {
        this.props.changeTechTargetTimeStamp(item)
        this.props.changeTechDrawerVisible(true)
    }

    render() {
        // Данные из store
        let {
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
            data,
            isLoadedTypes,
            isLoadedCards,
            isLoadedJoinTechnologyFact,
            isLoadedQualityProduction,
            isLoadedMtime
        } = this.state

        // Типы подшипника, определённые в технологии (для вывода в меню типов) для всех операций
        const quality = clonedeep(techQualityProduction)
        if (quality && menu === 'axis')
            types = Object.keys(quality['all']['types']).sort((a, b) => a - b)

        // Данные по отметке времени
        data &&
            menu &&
            menu !== 'table' &&
            menu !== 'axis' &&
            type &&
            this.props.changeTechTargetTimeStampData(calculateTargetData(data, target))

        return (
            <App
                isLoadedTypes={isLoadedTypes}
                isLoadedCards={isLoadedCards}
                isLoadedJoinTechnologyFact={isLoadedJoinTechnologyFact}
                isLoadedQualityProduction={isLoadedQualityProduction}
                isLoadedMtime={isLoadedMtime}
                menu={menu}
                types={types}
                cards={cards}
                type={type}
                card={card}
                target={target}
                data={data}
                mtime={mtime}
                quality={quality}
                nameTotalTab={this.nameTotalTab}
                handleClickMenu={this.handleClickMenu}
                handleClickTimeStamp={this.handleClickTimeStamp}
                handleClickChangeTechType={this.handleClickChangeTechType}
                handleClickChangeTechCards={this.handleClickChangeTechCards}
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
    fetchJoinTechnologyFactMiddleware,
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
