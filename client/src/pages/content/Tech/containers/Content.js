import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import clonedeep from 'lodash.clonedeep'
import App from '../components/Content/App'
// fetch
import { fetchTypesMiddleware } from '../../../../api/middlewares/fetchTypesMiddleware'
import { fetchJoinTechnologyFactMiddleware } from '../../../../api/middlewares/fetchJoinTechnologyFactMiddleware'
import { fetchQualityProductionMiddleware } from '../../../../api/middlewares/fetchQualityProductionMiddleware'
import { fetchIntervalMiddleware } from '../../../../api/middlewares/fetchIntervalMiddleware'
import { fetchMtimeMiddleware } from '../../../../api/middlewares/fetchMtimeMiddleware'
// actions
import { changeTechTargetMenu } from '../../../../store/tech/actions/techTargetMenuAction'
import { changeTechTargetTimeStamp } from '../../../../store/tech/actions/techTargetTimeStampAction'
import { changeTechTargetTimeStampData } from '../../../../store/tech/actions/techTargetTimeStampDataAction'
import { changeTechDrawerVisible } from '../../../../store/tech/actions/techDrawerAction'
import { changeType } from '../../../../store/tech/actions/techTypeAction'
import { changeCardNumber } from '../../../../store/tech/actions/techCardNumberAction'
import { getCards } from '../helpers/getCards'
import { calculateTargetData } from '../helpers/calculateTargetData'
import { calculateDataOneCard, calculateDataFewCards } from '../helpers/calculateData'

export class Content extends PureComponent {
    constructor(props) {
        super(props)
        this.nameTotalTab = 'Сводная'
        this.state = {
            isLoadedJoinTechnologyFact: false,
            isLoadedTypes: false,
            isLoadedQualityProduction: false,
            isLoadedMtime: false
        }
    }

    componentDidUpdate(prevProps) {
        const { techTargetMenu } = this.props // Меню

        if (prevProps.techTargetMenu !== techTargetMenu) {
            // 1) Загрузить данные для вкладок меню: table, axis
            if (techTargetMenu === 'table' || techTargetMenu === 'axis') {
                const {
                    fetchQualityProductionMiddleware,
                    fetchIntervalMiddleware,
                    fetchMtimeMiddleware
                } = this.props
                // Загрузить данные, записать в стейт информацию о состоянии загрузки
                fetchQualityProductionMiddleware(this)
                fetchIntervalMiddleware()
                fetchMtimeMiddleware(this)
            }

            // 2) Загрузить данные для вкладок меню, отображающих графики
            if (techTargetMenu !== 'table' && techTargetMenu !== 'axis') {
                const {
                    fetchTypesMiddleware,
                    fetchJoinTechnologyFactMiddleware,
                    techType: type, // Тип подшипника
                    techCardNumber: card // Номер карты
                } = this.props

                const urlTypes = `http://localhost:3000/api/joinTechnologyFact/${techTargetMenu}/types`
                const urlData = `http://localhost:3000/api/joinTechnologyFact/${techTargetMenu}/${type}`

                // Загрузить данные, записать в стейт информацию о состоянии загрузки
                fetchTypesMiddleware(urlTypes, this)
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
            isLoadedQualityProduction: false,
            isLoadedMtime: false
        })
    }

    // Событие по типу подшипника
    handleClickChangeTechType = e => {
        // Изменить тип подшипника
        this.props.changeType(+e)
        this.props.changeCardNumber(this.nameTotalTab)
    }

    // Событие по карте
    handleClickChangeTechCards = e => {
        this.props.changeCardNumber(e)
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
            techTargetMenu: menu, // Меню (процедура)
            techType: type, // Тип подшипника
            techCardNumber: card, // Номер карты
            techJoinTechnologyFact, // Данные технология и факт
            techQualityProduction, // Данные качества выпускаемой продукции на основе факта (проверок)
            techInterval: interval, // Интервал между отсечками на шкале времени
            techMtime: mtime, // Дата изменения файла фактических данных на сервере
            techTargetTimeStamp: target // Момент времени
        } = this.props

        const {
            isLoadedTypes,
            isLoadedJoinTechnologyFact,
            isLoadedQualityProduction,
            isLoadedMtime
        } = this.state

        // Искомые данные
        let cards = {}, // Все номера карт
            data = {} // Данные для построения графиков,

        // Технология - это расчитанные данные, в рамки которого должен укладываться факт
        // Технология имеет свою длину и определенное положение каждой точки в рамкаках этой длины
        // Факт - фактические данные
        const joinData = clonedeep(techJoinTechnologyFact)
        const quality = clonedeep(techQualityProduction)

        // Построить осевой график
        if (quality && menu === 'axis') {
            // Типы подшипника, определённые в технологии (для вывода в меню типов) для всех операций
            types = Object.keys(quality['all']['types']).sort((a, b) => a - b)
        }

        // Построить графическую часть
        if (joinData && menu && menu !== 'table' && menu !== 'axis' && type) {
            // Номера карт для выбранного типа
            cards = joinData['cards']
            // Технология и факт
            data =
                card === this.nameTotalTab
                    ? joinData['dataFewCards']
                    : joinData['dataOneCard'][card]
            // Данные по отметке времени
            const targetData = calculateTargetData(data, target)
            this.props.changeTechTargetTimeStampData(targetData)
        }

        return (
            <App
                isLoadedTypes={isLoadedTypes}
                isLoadedJoinTechnologyFact={isLoadedJoinTechnologyFact}
                isLoadedQualityProduction={isLoadedQualityProduction}
                isLoadedMtime={isLoadedMtime}
                types={types}
                cards={cards}
                menu={menu}
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
    fetchJoinTechnologyFactMiddleware,
    fetchQualityProductionMiddleware,
    fetchIntervalMiddleware,
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
