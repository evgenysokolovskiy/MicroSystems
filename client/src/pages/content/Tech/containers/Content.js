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
            techQualityProduction: quality, // Данные качества выпускаемой продукции на основе факта (проверок)
            techInterval: interval, // Интервал между отсечками на шкале времени
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

        /*
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
                    // Добавить предположительное время выгрузки согласно технологии
                    // type[1]['technology']['len'] - количество отсечек по технологии
                    // interval - столько минут составляет каждый интервал между отсечками
                    // Т.е. чтобы получить дату окончания тех.процесса по технологии необходимо:
                    // Если интервал равен 30 минутам, а длина 42 отсечки, то к времени загрузки необходимо прибавить
                    // 42 раза по 30 минут
                    if (procedure[0] !== 'running' && procedure[0] !== 'grinding' && procedure[0] !== 'stamping') return
                    // Длина тех.процесса в миллисекундах
                    const msTechnology = type[1]['technology']['len'] * interval * 60000
                    const msBatchLoadingTime = convertStringToDateBatchLoadingTime(batchLoadingTimeItem['batchLoadingTime'])
                    const msUnloadingTime = msBatchLoadingTime + msTechnology
                    const strUnloadingTime = convertDateToString(msUnloadingTime)
                    obj[type[0]][procedure[0]][card[0]]['unloadingTime'] = strUnloadingTime
                }
            })
        })
    })
})


// Конвертировать строку в дату (в миллисекундах) с округлением до получаса
function convertStringToDateBatchLoadingTime(str) {
    if (!str) return
    const dd = str.split('.')[0]
    const mm = str.split('.')[1] - 1
    const yyyy = str.split('.')[2].split('  ')[0]
    let hours = str.split('  ')[1].split('.')[0]
    const minutes = str.split('  ')[1].split('.')[1]

    // Округлить время до получаса
    const m = minutes > 15 && minutes < 45 && minutes !== 0 ? 30 : '00'
    const h = minutes > 44 ? (hours === 23 ? '00' : ++hours) : hours

    return new Date(yyyy, mm, dd, h, m).getTime()
}

// Конвертировать дату в строку
function convertDateToString(milliseconds) {
    if (!milliseconds) return
    const date = new Date(milliseconds)
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const d = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()

    return `${d}.${month}.${year} ${hours}:${minutes}`
}

*/

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
                ? (data = clonedeep(
                      calculateDataFewCards({ technology, fact, card, cards, interval })
                  ))
                : (data = clonedeep(calculateDataOneCard({ technology, fact, card, interval })))
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
        ...store.techTargetMenuReducer,
        ...store.techTargetTimeStampReducer,
        ...store.techQualityProductionReducer,
        ...store.techJoinTechnologyFactReducer,
        ...store.techIntervalReducer,
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
