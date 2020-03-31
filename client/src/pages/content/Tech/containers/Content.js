import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import clonedeep from 'lodash.clonedeep'
import App from '../components/Content/App'
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
    /*
    componentDidMount() {
        const { techJoinTechnologyFact: joinData, techTargetMenu: menu, techType: type, changeCardNumber } = this.props

        if (joinData && menu && type) {
            // Присвоить techCardNumber номер первой карты для выбранного типа
            changeCardNumber(
                [...Object.keys(joinData[menu][type]['fact'])][0]
            )
        }
    }
    */
    constructor(props) {
        super(props)
        this.nameTotalTab = this.props.techCardNumber
    }

    // Событие по меню (выбора процедуры)
    handleClickMenu = item => {
        this.props.changeTechTargetMenu(item)
        this.props.changeCardNumber(this.nameTotalTab)
    }

    // Событие по типу подшипника
    handleClickChangeTechType = e => {
        // Изменить тип подшипника
        this.props.changeType(+e)
        this.props.changeCardNumber(this.nameTotalTab)
        // При смене типа подшипника присвоить techCardNumber номер первой карты для выбранного типа
        /*
        const { techJoinTechnologyFact: joinData, techTargetMenu: menu, changeCardNumber } = this.props
        changeCardNumber([...Object.keys(joinData[menu][+e]['fact'])][0])
        */
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
            techTargetMenu: menu, // Меню (процедура)
            techType: type, // Тип подшипника
            techCardNumber: card, // Номер карты
            techJoinTechnologyFact, // Данные технология и факт
            techTargetTimeStamp: target // Момент времени
        } = this.props

        // Искомые данные
        let types, // Все типы подшипника
            cards = {}, // Все номера карт
            data = {} // Данные для построения графиков,

        // Технология - это расчитанные данные, в рамки которого должен укладываться факт
        // Технология имеет свою длину и определенное положение каждой точки в рамкаках этой длины
        // Факт - фактические данные
        const joinData = clonedeep(techJoinTechnologyFact)






let obj = {}
/*
Object.entries(clonedeep(techJoinTechnologyFact)).forEach(procedure => {
    Object.values(procedure).forEach(item => {
        if (typeof item !== 'object') return
        Object.entries(item).forEach(type => {
            if (!+type[0]) return
            obj[type[0]] = {...obj[type[0]], ...{[procedure[0]]: type[1]}}
        })
    })
})
*/


Object.entries(clonedeep(techJoinTechnologyFact)).forEach(procedure => {
    Object.values(procedure).forEach(item => {
        if (typeof item !== 'object') return
        Object.entries(item).forEach(type => {
            if (!+type[0]) return

            obj[type[0]] = {
                ...obj[type[0]],
                [procedure[0]]: {...type[1]['fact']}
            }

            // Добавить время загрузки
            Object.entries(type[1]['fact']).forEach(card => {
                obj[type[0]][procedure[0]][card[0]] = {
                    data: card[1]
                }
                const batchLoadingTimeItem = card[1].find(date => date['batchLoadingTime'])
                if (batchLoadingTimeItem) {
                    obj[type[0]][procedure[0]][card[0]]['batchLoadingTime'] = batchLoadingTimeItem['batchLoadingTime']
                } 
            })

            // Добавить предположительное время выгрузки согласно технологии
            console.log(type[1]['technology']['len'])
        })
    })
})


//console.log(obj)
//obj['9.525']['running']['234-56-20']['batchLoadingTime']







        // Построить графическую часть
        if (joinData && menu && menu !== 'table' && type) {
            // Отсекаем технологию и факт в соответствии с выбором меню (процедура) и типом подшипника
            // Технология
            const technology = joinData[menu][type]['technology']
            // Факт
            const fact = joinData[menu][type]['fact']
            // Типы подшипника, определённые в технологии (для вывода в меню типов)
            types = Object.keys(joinData[menu]).filter(item => +item)
            // Номера карт для выбранного типа
            cards = getCards({ fact })
            // Совместить технологию с фактом
            card === this.nameTotalTab
                ? (data = clonedeep(calculateDataFewCards({ technology, fact, card, cards })))
                : (data = clonedeep(calculateDataOneCard({ technology, fact, card })))
            // Данные по отметке времени
            const targetData = calculateTargetData(data, target)
            this.props.changeTechTargetTimeStampData(targetData)
        }

        return (
            <App
                types={types}
                cards={cards}
                menu={menu}
                type={type}
                card={card}
                target={target}
                data={data}
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
        ...store.techTargetMenuReducer,
        ...store.techTargetTimeStampReducer,
        ...store.techJoinTechnologyFactReducer,
        ...store.techTechnologyReducer,
        ...store.techShpFactReducer,
        ...store.techTypeReducer,
        ...store.techCardNumberReducer
    }
}

const mapDispatchToProps = {
    changeTechTargetMenu,
    changeTechTargetTimeStamp,
    changeTechTargetTimeStampData,
    changeTechDrawerVisible,
    changeType,
    changeCardNumber
}

export default connect(mapStateToProps, mapDispatchToProps)(Content)
