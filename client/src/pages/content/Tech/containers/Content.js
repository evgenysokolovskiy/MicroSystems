import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import clonedeep from 'lodash.clonedeep'
import App from '../components/Content/App'
import { changeTechTargetMenu } from '../../../../store/tech/actions/techTargetMenuAction'
import { changeTechTargetTimeStamp } from '../../../../store/tech/actions/techTargetTimeStampAction'
import { changeTechTargetTimeStampData } from '../../../../store/tech/actions/techTargetTimeStampDataAction'
import { changeTechDrawerVisible } from '../../../../store/tech/actions/techDrawerAction'
import { changeTechTechnology } from '../../../../store/tech/actions/techTechnologyAction'
import { changeType } from '../../../../store/tech/actions/techTypeAction'
import { changeCardNumber } from '../../../../store/tech/actions/techCardNumberAction'
import { getCards, getData, getTargetData } from '../helpers/'

export class Content extends PureComponent {
    componentDidMount() {
        const { techJoinTechnologyFact, techTargetMenu, techType, changeCardNumber } = this.props

        if (techJoinTechnologyFact && techTargetMenu && techType) {
            // Присвоить techCardNumber номер первой карты для выбранного типа
            changeCardNumber(
                [...Object.keys(techJoinTechnologyFact[techTargetMenu][techType]['fact'])][0]
            )
        }
    }

    // Событие по меню (выбора процедуры)
    handleClickMenu = item => {
        this.props.changeTechTargetMenu(item)
    }

    // Событие по типу подшипника
    handleClickChangeTechType = e => {
        // Изменить тип подшипника
        this.props.changeType(+e)
        // При смене типа подшипника присвоить techCardNumber номер первой карты для выбранного типа
        const { techJoinTechnologyFact, techTargetMenu, changeCardNumber } = this.props
        changeCardNumber([...Object.keys(techJoinTechnologyFact[techTargetMenu][+e]['fact'])][0])
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
            techJoinTechnologyFact: joinData, // Данные технология и факт
            techTargetTimeStamp: target // Момент времени
        } = this.props

        // Искомые данные
        let types, // Все типы подшипника
            cards = {}, // Все номера карт
            data = {} // Данные для построения графиков

        // Произвести глубокое клонирование объекта
        // Технология - это расчитанные данные, в рамки которого должен укладываться факт
        // Технология имеет свою длину и определенное положение каждой точки в рамкаках этой длины
        // Факт - фактические данные
        const techJoinTechnologyFact = clonedeep(joinData)

        if (techJoinTechnologyFact) {
            // Отсекаем технологию и факт в соответствии с выбором меню (процедура) и типом подшипника
            // Технология
            const technology = techJoinTechnologyFact[menu][type]['technology']
            // Факт
            const fact = techJoinTechnologyFact[menu][type]['fact']
            // Технология для разных графиков
            const {
                pointsDiameter, // Технология для diameter
                pointsInconstancy, // Технология для inconstancy
                pointsDimension, // Технология для dimension
                pointsPressure, // Технология по pressure
                pointsSpeed // Технология по speed
            } = technology
            // Типы подшипника, определённые в технологии (для вывода в меню типов)
            types = Object.keys(techJoinTechnologyFact[menu]).filter(item => +item)
            // Номера карт для выбранного типа
            cards = getCards(fact)
            // Данные для построения графиков
            data = getData(
                fact,
                card,
                pointsDiameter,
                pointsInconstancy,
                pointsDimension,
                pointsPressure,
                pointsSpeed
            )

            const targetData = getTargetData(data, target)
            this.props.changeTechTargetTimeStampData(targetData)
        }

        return (
            <App
                types={types}
                cards={cards}
                menu={menu}
                card={card}
                target={target}
                data={data}
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
