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

    // Событие по меню (выбора процедуры)
    handleClickMenu = item => {
        this.props.changeTechTargetMenu(item)
    }

    // Событие по типу подшипника
    handleClickChangeTechType = e => {
        // Изменить тип подшипника
        this.props.changeType(+e)
        this.props.changeCardNumber('Сводная')
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
            data = {}, // Данные для построения графиков,
            diameterTotal = [],
            inconstancyDimensionTotal = [],
            pressureSpeedTotal = []

        // Технология - это расчитанные данные, в рамки которого должен укладываться факт
        // Технология имеет свою длину и определенное положение каждой точки в рамкаках этой длины
        // Факт - фактические данные
        const joinData = clonedeep(techJoinTechnologyFact)

        if (joinData && menu && type) {
            // Отсекаем технологию и факт в соответствии с выбором меню (процедура) и типом подшипника
            // Технология
            const technology = joinData[menu][type]['technology']
            // Факт
            const fact = joinData[menu][type]['fact']
            // Типы подшипника, определённые в технологии (для вывода в меню типов)
            types = Object.keys(joinData[menu]).filter(item => +item)
            // Номера карт для выбранного типа
            cards = getCards({ fact })







diameterTotal = technology['pointsDiameter']

for (let i = 0, date = 0; i < diameterTotal.length; i++, date = date + .5) {
    diameterTotal[i]['date'] = date
}

for (let i = 0, date = 0; i < technology['pointsInconstancy'].length; i++, date = date + .5) {
    const item = { 
        inconstancy: technology['pointsInconstancy'][i],
        dimension: technology['pointsDimension'][i],
        date
    }
    inconstancyDimensionTotal[i] = item
}

for (let i = 0, date = 0; i < technology['pointsPressure'].length; i++, date = date + .5) {
    const item = { 
        pressure: technology['pointsPressure'][i],
        speed: technology['pointsSpeed'][i],
        date
    }
    pressureSpeedTotal[i] = item
}



cards['hasBatchLoadingTime'].forEach((card, index) => {
    if (card === 'Сводная') return
    const data = clonedeep(getData({ technology, fact, card }))

    for (let i = 0; i < diameterTotal.length; i++) {
        if (data['diameter'][i]['fact']) {
            diameterTotal[i][`fact${index}`] = data['diameter'][i]['fact']

            if (data['diameter'][i]['falseFact']) {
                diameterTotal[i][`falseFact${index}`] = data['diameter'][i]['falseFact']
            }

            if (data['diameter'][i]['trueFact']) {
                diameterTotal[i][`trueFact${index}`] = data['diameter'][i]['trueFact']
            }

        }
    }


    for (let i = 0; i < inconstancyDimensionTotal.length; i++) {
        if (data['inconstancyDimension'][i]['factInconstancy']) {
            inconstancyDimensionTotal[i][`factInconstancy${index}`] = data['inconstancyDimension'][i]['factInconstancy']

            if (data['inconstancyDimension'][i]['factInconstancyFalse']) {
                inconstancyDimensionTotal[i][`factInconstancyFalse${index}`] = data['inconstancyDimension'][i]['factInconstancyFalse']
            }

            if (data['inconstancyDimension'][i]['factInconstancyTrue']) {
                inconstancyDimensionTotal[i][`factInconstancyTrue${index}`] = data['inconstancyDimension'][i]['factInconstancyTrue']
            }
        }

        if (data['inconstancyDimension'][i]['factDimension']) {
            inconstancyDimensionTotal[i][`factDimension${index}`] = data['inconstancyDimension'][i]['factDimension']

            if (data['inconstancyDimension'][i]['factDimensionFalse']) {
                inconstancyDimensionTotal[i][`factDimensionFalse${index}`] = data['inconstancyDimension'][i]['factDimensionFalse']
            }

            if (data['inconstancyDimension'][i]['factDimensionTrue']) {
                inconstancyDimensionTotal[i][`factDimensionTrue${index}`] = data['inconstancyDimension'][i]['factDimensionTrue']
            }
        }
    } 

})


if (card !== 'Сводная') {
    data = clonedeep(getData({ technology, fact, card }))
} else {
    data = {}
    data['diameter'] = diameterTotal
    data['inconstancyDimension'] = inconstancyDimensionTotal
    data['pressureSpeed'] = pressureSpeedTotal
}


            // Данные по отметке времени
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
