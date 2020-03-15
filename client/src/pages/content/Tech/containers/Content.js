import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import clonedeep from 'lodash.clonedeep'
import App from '../components/Content/App'
import { changeTechTargetMenu } from '../../../../store/tech/actions/techTargetMenuAction'
import { changeTechTargetTimeStamp } from '../../../../store/tech/actions/techTargetTimeStampAction'
import { changeTechDrawerVisible } from '../../../../store/tech/actions/techDrawerAction'
import { changeTechTechnology } from '../../../../store/tech/actions/techTechnologyAction'
import { changeType } from '../../../../store/tech/actions/techTypeAction'
import { changeCardNumber } from '../../../../store/tech/actions/techCardNumberAction'

export class Content extends PureComponent {

    componentDidMount() {
        const { techJoinTechnologyFact, techTargetMenu, techType, changeCardNumber } = this.props
        if (techJoinTechnologyFact && techTargetMenu && techType) {
            // Присвоить techCardNumber номер первой карты для выбранного типа
            changeCardNumber([...Object.keys(techJoinTechnologyFact[techTargetMenu][techType]['fact'])][0])
        }
    }

    handleClickMenu = item => {
        this.props.changeTechTargetMenu(item)
    }

    handleClickTimeStamp = item => {
        this.props.changeTechTargetTimeStamp(item)
        this.props.changeTechDrawerVisible(true)
    }

    handleClickChangeTechType = e => {
        // Изменить тип подшипника
        this.props.changeType(+e)
        // При смене типа подшипника присвоить techCardNumber номер первой карты для выбранного типа
        const { techJoinTechnologyFact, techTargetMenu, changeCardNumber } = this.props
        changeCardNumber([...Object.keys(techJoinTechnologyFact[techTargetMenu][+e]['fact'])][0])
    }

    handleClickChangeTechCards = e => {
        this.props.changeCardNumber(e)
    }

    render() {
        // Данные из store
        let { 
            techTargetMenu: menu, // Меню (процедура)
            techType: type, // Тип подшипника
            techCardNumber: card, // Номер карты
            techJoinTechnologyFact: joinData, // Данные технология и факт
            techTargetTimeStamp: target, // Момент времени
         } = this.props

         // Искомые данные
        let types, // Все типы подшипника
            cards = {}, // Все номера карт
            diameter = [], // Для построения графика диаметра
            inconstancy, // Для построения графика непостоянства
            dimension, // Для построения графика разноразмерности
            fact, // Фактические данные
            dataInconstancyDimension,
            dataPressureSpeed

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
            // Данные для построения графика диаметра
            diameter = getDiameter(fact, card, pointsDiameter, pointsInconstancy, pointsDimension, pointsPressure, pointsSpeed)['diameter']
            dataInconstancyDimension = getDiameter(fact, card, pointsDiameter, pointsInconstancy, pointsDimension, pointsPressure, pointsSpeed)['inconstancyDimension']
            dataPressureSpeed = getDiameter(fact, card, pointsDiameter, pointsInconstancy, pointsDimension, pointsPressure, pointsSpeed)['pressureSpeed']
        }





/*
        const { type, menu, target, techTechnology, techShpFact } = this.props
        const { LEN, dataInconstancyDimension, dataPressureSpeed, diameter, inconstancy, dimension, technologyPressure, technologySpeed } = techTechnology

        // Получить фактические данные, соответствующие выбранному типу подшипника
        const factType = menu && menu === 'running' && techShpFact[menu].filter(item => item['type'] === type)

        if (factType && factType[0]) {
            // Получить начальную дату фактических данных
            const ddmmyyyy = factType[0]['date']
            const dd = ddmmyyyy.split('.')[0]
            const mm = ddmmyyyy.split('.')[1]
            const yyyy = ddmmyyyy.split('.')[2]
            let hours = factType[0]['measurementTime'].split('.')[0]
            const minutes = factType[0]['measurementTime'].split('.')[1]
            const start = new Date(`${yyyy},${mm},${dd}`)
            start.setHours(hours)

            // От этой точки будет строиться технология
            diameter[0]['date'] = `${dd}.${mm}.${yyyy} ${hours}:${minutes}`
            dataInconstancyDimension[0]['date'] = `${dd}.${mm}.${yyyy} ${hours}:${minutes}`
            dataPressureSpeed[0]['date'] = `${dd}.${mm}.${yyyy} ${hours}:${minutes}`

            for (let i = 1; i < LEN; i++) {
                start.setHours(start.getHours() + 1)
                const hours = start.getHours()
                const date = String(start.getDate()).padStart(2, '0')
                const month = String(start.getMonth() + 1).padStart(2, '0')
                const year = start.getFullYear()

                diameter[i]['date'] = `${date}.${month}.${year} ${hours}:${minutes}`
                dataInconstancyDimension[i]['date'] = `${date}.${month}.${year} ${hours}:${minutes}`
                dataPressureSpeed[i]['date'] = `${date}.${month}.${year} ${hours}:${minutes}`
            }

            for (let i = 0; i < diameter.length; i++) {
                const techDate = convertTechnologyToDate(diameter[i]['date'])
                for (let j = 0; j < factType.length; j++) {
                    const factDate = converFactToDate(factType[j])
                    if (techDate.toLocaleString() === factDate.toLocaleString()) {
                        const fact = factType[j]['diameter']
                        const norm = diameter[i]['norm']

                        diameter[i]['fact'] = factType[j]['diameter']
                        fact > norm[0] && fact < norm[1]
                            ? diameter[i]['trueFact'] = factType[j]['diameter']
                            : diameter[i]['falseFact'] = factType[j]['diameter']
                    }
                }
            }
        }



        // Получить данные (в момент времени 'target')
        let minDiameter, maxDiameter, inconstancy, dimension, pressure, speed
        let factDiameter
        // Данные по отсечке времени для графика "Диаметр"
        diameter.forEach(item => {
            if (item['date'] === target) {
                minDiameter = item['norm'][0]
                maxDiameter = item['norm'][1]
                factDiameter = item['fact']
            }
        })

        // Данные по отсечке времени для графика "Непостоянство-размерность"
        dataInconstancyDimension.forEach(item => {
            if (item['date'] === target) {
                inconstancy = item['inconstancy']
                dimension = item['dimension']
            }
        })
        // Данные по отсечке времени для графика "Давление-скорость"
        dataPressureSpeed.forEach(item => {
            if (item['date'] === target) {
                pressure = item['pressure']
                speed = item['speed']
            }
        })

*/











/*

        // Технология (в момент времени 'target')
        const technology = {
            minDiameter,
            maxDiameter,
            inconstancy,
            dimension,
            pressure,
            speed
        }
        // Факт (в момент времени 'target')
        const fact = {
            factDiameter
        }
*/


        return (
            <App
                types={types}
                cardNumbers={cards}
                techCardNumber={card}
                dataDiameter={diameter}
                dataInconstancyDimension={dataInconstancyDimension}
                dataPressureSpeed={dataPressureSpeed}
                techType={type}
                //technology={technology}
                //fact={fact}
                techTargetMenu={menu}
                techTargetTimeStamp={target}
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
    changeTechDrawerVisible,
    changeType,
    changeCardNumber
}
export default connect(mapStateToProps, mapDispatchToProps)(Content)






/*
function convertTechnologyToDate(str) {
    const dd = str.split(' ')[0].split('.')[0]
    const mm = str.split(' ')[0].split('.')[1]
    const yyyy = str.split(' ')[0].split('.')[2]
    let hours = str.split(' ')[1].split(':')[0]
    const minutes = str.split(' ')[1].split(':')[1]
    return new Date(yyyy, mm, dd, hours, minutes)    
}
*/
/*
function converFactToDate(obj) {
    const dd = obj['date'].split('.')[0]
    const mm = obj['date'].split('.')[1]
    const yyyy = obj['date'].split('.')[2]
    let hours = obj['measurementTime'].split('.')[0]
    const minutes = obj['measurementTime'].split('.')[1]
    return new Date(yyyy, mm, dd, hours, minutes)  
}
*/

/*
function convertDateToString(start, next) {
    if (!start) return
    start.setHours(start.getHours() + next)
    const hours = start.getHours()
    const minutes = start.getMinutes()
    const date = String(start.getDate()).padStart(2, '0')
    const month = String(start.getMonth() + 1).padStart(2, '0')
    const year = start.getFullYear()

    //return `${date}.${month}.${year} ${hours}:${minutes}` 
    return start  
}
*/


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




function convertStringToDate(obj) {
    if (!obj['date'] || !obj['measurementTime']) return
    const dd = obj['date'].split('.')[0]
    const mm = obj['date'].split('.')[1] - 1
    const yyyy = obj['date'].split('.')[2]
    let hours = obj['measurementTime'].split('.')[0]
    const minutes = obj['measurementTime'].split('.')[1]

    // Округлить время до получаса
    const m = ( minutes > 15 && minutes < 45 && minutes !== 0 ) ? '30' : '00'
    const h = ( minutes > 44 ) ? (hours === 23 ? '00' : ++hours) : hours

    return new Date(yyyy, mm, dd, h, m).getTime()
}

function convertStringToDateBatchLoadingTime(str) {
    if (!str) return
    const dd = str.split('.')[0]
    const mm = (str.split('.')[1] - 1)
    const yyyy = str.split('.')[2].split('  ')[0]
    let hours = str.split('  ')[1].split('.')[0]
    const minutes = str.split('  ')[1].split('.')[1]

    // Округлить время до получаса
    const m = ( minutes > 15 && minutes < 45 && minutes !== 0 ) ? '30' : '00'
    const h = ( minutes > 44 ) ? (hours === 23 ? '00' : ++hours) : hours

    return new Date(yyyy, mm, dd, h, m).getTime()
}

// Определить номера карт для выбранного типа подшипника
function getCards(fact) {
    // Карты, для которых из фактических данных определено время загрузки
    const hasBatchLoadingTime = {}
    Object.entries(fact).forEach(item => {
        item[1].forEach(arr => {
            const batchLoadingTime = convertStringToDateBatchLoadingTime(arr['batchLoadingTime'])
            if (batchLoadingTime) hasBatchLoadingTime[item[0]] = batchLoadingTime 
        })
    })
    // Карты, для которых из фактических данных не определено время загрузки
    const notBatchLoadingTime = Object.keys(fact).filter(item => {
        const abc = Object.keys(hasBatchLoadingTime).some(val => val === item )
        if (!abc) return item
    })

    return {
        hasBatchLoadingTime: Object.keys(hasBatchLoadingTime),
        notBatchLoadingTime
    }
}

function getDiameter(fact, card, pointsDiameter, pointsInconstancy, pointsDimension, pointsPressure, pointsSpeed) {
    // 1) Получить дату факта: конкатенировать дату и время как строку
    // Конвертировать конкатенированную дату в миллисекунды
    // Записать свойство convertFactJointDate['jointDate'], которое будет отображать дату фактического действия в миллисекундах
    const convertFactJointDate = fact && card && fact[card].map(item => {
        const date = convertStringToDate(item)
        item['jointDate'] = date
        return item
    })

    // Определить временную отметку начала построения технологии в миллисекундах
    // Соответствует временной отметке загрузки

    // 2) Определить временную отметку загрузки (определена как string)
    let batchLoadingTime            
    convertFactJointDate && convertFactJointDate.forEach(item => {
        if (item['batchLoadingTime']) batchLoadingTime = item['batchLoadingTime']        
    })
    // 3) Преобразовать string в Date (в миллисекундах)
    let start = convertStringToDateBatchLoadingTime(batchLoadingTime)

    // Количество часов по технологии
    const len = pointsDiameter.length

    // 4) Определить временные отметки от начальной отметки start до конечной на расстоянии длины len
    // Интервал между отмеками составляет заданный интервал int в миллисекундах
    let arr = [start]
    // 1800000 - полчаса
    // 3600000 - час
    const int = 1800000
    for (let i = 1; i < len; i++) {
        start = start + int
        arr = [...arr, start]
    }

    // 5) Получить новый массив, как pointsDiameter, дополненный date в миллисекундах
    const pointsDiameterDate = [...pointsDiameter].map((item, i) => {
        item['date'] = arr[i]
        return item
    })





let pointsInconstancyDimension = []
for (let i = 0; i < pointsInconstancy.length; i++) {
    const item = {
        inconstancy: pointsInconstancy[i],
        dimension: pointsDimension[i]
    }
    
    pointsInconstancyDimension = [...pointsInconstancyDimension, item]
}

const pointsInconstancyDimensionDate = [...pointsInconstancyDimension].map((item, i) => {
    item['date'] = arr[i]
    return item
})


let pointsPressureSpeed = []
for (let i = 0; i < pointsPressure.length; i++) {
    const itemPressureSpeed = {
        pressure: pointsPressure[i],
        speed: pointsSpeed[i]
    }
    pointsPressureSpeed = [...pointsPressureSpeed, itemPressureSpeed]
}

const pointsPressureSpeedDate = [...pointsPressureSpeed].map((item, i) => {
    item['date'] = arr[i]
    return item
})


    // 6) Добавить факт к pointsDiameterDate
    const diameter = [...pointsDiameterDate].map(technology => {
        convertFactJointDate && [...convertFactJointDate].forEach(fact => {
            if (technology['date'] === fact['jointDate']) {
                const factDiameter = fact['diameter']
                // 'fact' необходим для построения линейного графика, соединяющего точки
                technology['fact'] = factDiameter
                // 'trueFact' и 'falseFact' необходимы для построения точек
                factDiameter > technology['norm'][0] && factDiameter < technology['norm'][1]
                    ? technology['trueFact'] = factDiameter
                    : technology['falseFact'] = factDiameter
            }
        })
        technology['date'] = convertDateToString(technology['date'])
        return technology
    })
/*
    const inconstancy = [...pointsDiameterDate].map(technology => {
        convertFactJointDate && [...convertFactJointDate].forEach(fact => {
            if (technology['date'] === fact['jointDate']) {
                const factInconstancy = fact['inconstancy']
                technology['fact'] = factInconstancy
            }
        })
        technology['date'] = convertDateToString(technology['date'])
        return technology
    })


console.log(inconstancy)
*/

    return { 
        diameter, 
        inconstancyDimension: pointsInconstancyDimensionDate, 
        pressureSpeed: pointsPressureSpeedDate 
    }
}