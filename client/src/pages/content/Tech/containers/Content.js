import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import App from '../components/Content/App'
import { changeTechTargetMenu } from '../../../../store/tech/actions/techTargetMenuAction'
import { changeTechTargetTimeStamp } from '../../../../store/tech/actions/techTargetTimeStampAction'
import { changeTechDrawerVisible } from '../../../../store/tech/actions/techDrawerAction'
import { changeTechTechnology } from '../../../../store/tech/actions/techTechnologyAction'
import { changeType } from '../../../../store/tech/actions/techTypeAction'

export class Content extends PureComponent {
    handleClickMenu = item => {
        this.props.changeTechTargetMenu(item)
    }

    handleClickTimeStamp = item => {
        this.props.changeTechTargetTimeStamp(item)
        this.props.changeTechDrawerVisible(true)
    }

    handleClickChangeTechType = e => {
        this.props.changeType(+e)
    }

    render() {
        const { techType, techTargetMenu, techTargetTimeStamp, techTechnology: data, techShpFact } = this.props
        // techType - тип подшипника
        // techTargetMenu - вид процедуры
  
        // Исходные данные для графиков
        const { testDiameter, /*dataDiameter,*/ dataInconstancyDimension, datapPessureSpeed } = data
        // Технология (начальная, конечная точки, длина графика)
        const { START, END, LEN } = testDiameter
        // 1) Расчитать данные технологии на основании начальной, конечной точек и длины графика
        let dataDiameter = [START]
        const a = START.norm[0]
        const A = (START.norm[0] - END.norm[0]) / (LEN - 1)
        const b = START.norm[1]
        const B = (START.norm[1] - END.norm[1]) / (LEN - 1)
        for (let i = 1; i < LEN; i++) {
            const max = (a - A * i).toFixed(3)
            const min = (b - B * i).toFixed(3)
            const item = {
                norm: [max, min]
            }
            dataDiameter = [...dataDiameter, item]
        }

        // 2) Включить фактические показатели в данные технологии 

        // Получить фактические данные, соответствующие выбранному типу подшипника
        const factType = techTargetMenu && techTargetMenu === 'running' && techShpFact[techTargetMenu].filter(item => item['type'] === techType)

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
            dataDiameter[0]['date'] = `${dd}.${mm}.${yyyy} ${hours}:${minutes}`
            dataInconstancyDimension[0]['date'] = `${dd}.${mm}.${yyyy} ${hours}:${minutes}`
            datapPessureSpeed[0]['date'] = `${dd}.${mm}.${yyyy} ${hours}:${minutes}`

            for (let i = 1; i < LEN; i++) {
                start.setHours(start.getHours() + 1)
                const hours = start.getHours()
                const date = String(start.getDate()).padStart(2, '0')
                const month = String(start.getMonth() + 1).padStart(2, '0')
                const year = start.getFullYear()

                dataDiameter[i]['date'] = `${date}.${month}.${year} ${hours}:${minutes}`
                dataInconstancyDimension[i]['date'] = `${date}.${month}.${year} ${hours}:${minutes}`
                datapPessureSpeed[i]['date'] = `${date}.${month}.${year} ${hours}:${minutes}`
            }

            for (let i = 0; i < dataDiameter.length; i++) {
                const techDate = converTechnologyToDate(dataDiameter[i]['date'])
                for (let j = 0; j < factType.length; j++) {
                    const factDate = converFactToDate(factType[j])
                    if (techDate.toLocaleString() === factDate.toLocaleString()) {
                        const fact = factType[j]['diameter']
                        const norm = dataDiameter[i]['norm']

                        dataDiameter[i]['fact'] = factType[j]['diameter']
                        fact > norm[0] && fact < norm[1]
                            ? dataDiameter[i]['trueFact'] = factType[j]['diameter']
                            : dataDiameter[i]['falseFact'] = factType[j]['diameter']
                    }
                }
            }
        }

        data['dataDiameter'] = dataDiameter








        // Получить данные (в момент времени 'techTargetTimeStamp')
        let minDiameter, maxDiameter, inconstancy, dimension, pressure, speed
        let factDiameter
        // Данные по отсечке времени для графика "Диаметр"
        dataDiameter.forEach(item => {
            if (item['date'] === techTargetTimeStamp) {
                minDiameter = item['norm'][0]
                maxDiameter = item['norm'][1]
                factDiameter = item['fact']
            }
        })

        // Данные по отсечке времени для графика "Непостоянство-размерность"
        dataInconstancyDimension.forEach(item => {
            if (item['date'] === techTargetTimeStamp) {
                inconstancy = item['inconstancy']
                dimension = item['dimension']
            }
        })
        // Данные по отсечке времени для графика "Давление-скорость"
        datapPessureSpeed.forEach(item => {
            if (item['date'] === techTargetTimeStamp) {
                pressure = item['pressure']
                speed = item['speed']
            }
        })
        // Технология (в момент времени 'techTargetTimeStamp')
        const technology = {
            minDiameter,
            maxDiameter,
            inconstancy,
            dimension,
            pressure,
            speed
        }
        // Факт (в момент времени 'techTargetTimeStamp')
        const fact = {
            factDiameter
        }

        return (
            <App
                data={data}
                techType={techType}
                technology={technology}
                fact={fact}
                techTargetMenu={techTargetMenu}
                techTargetTimeStamp={techTargetTimeStamp}
                handleClickMenu={this.handleClickMenu}
                handleClickTimeStamp={this.handleClickTimeStamp}
                handleClickChangeTechType={this.handleClickChangeTechType}
            />
        )
    }
}

function mapStateToProps(store) {
    return {
        ...store.techTargetMenuReducer,
        ...store.techTargetTimeStampReducer,
        ...store.techTechnologyReducer,
        ...store.techShpFactReducer,
        ...store.techTypeReducer
    }
}

const mapDispatchToProps = {
    changeTechTargetMenu,
    changeTechTargetTimeStamp,
    changeTechDrawerVisible,
    changeType
}
export default connect(mapStateToProps, mapDispatchToProps)(Content)






function converTechnologyToDate(str) {
    const dd = str.split(' ')[0].split('.')[0]
    const mm = str.split(' ')[0].split('.')[1]
    const yyyy = str.split(' ')[0].split('.')[2]
    let hours = str.split(' ')[1].split(':')[0]
    const minutes = str.split(' ')[1].split(':')[1]
    return new Date(yyyy, mm, dd, hours, minutes)    
}

function converFactToDate(obj) {
    const dd = obj['date'].split('.')[0]
    const mm = obj['date'].split('.')[1]
    const yyyy = obj['date'].split('.')[2]
    let hours = obj['measurementTime'].split('.')[0]
    const minutes = obj['measurementTime'].split('.')[1]
    return new Date(yyyy, mm, dd, hours, minutes)  
}