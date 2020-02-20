import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import App from '../components/Content/App'
import { changeTechTargetMenu } from '../../../../store/tech/actions/techTargetMenuAction'
import { changeTechTargetTimeStamp } from '../../../../store/tech/actions/techTargetTimeStampAction'
import { changeTechDrawerVisible } from '../../../../store/tech/actions/techDrawerAction'
// Входящие данные
import { dataDiameter, dataInconstancyDimension, datapPessureSpeed } from '../data'

export class Content extends PureComponent {
    handleClickMenu = item => {
        this.props.changeTechTargetMenu(item)
    }

    handleClickTimeStamp = item => {
        this.props.changeTechTargetTimeStamp(item)
        this.props.changeTechDrawerVisible(true)
    }

    render() {
        const { techTargetMenu, techTargetTimeStamp } = this.props
        // Исходные данные для графиков
        const data = { dataDiameter, dataInconstancyDimension, datapPessureSpeed }
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
                technology={technology}
                fact={fact}
                techTargetMenu={techTargetMenu}
                techTargetTimeStamp={techTargetTimeStamp}
                handleClickMenu={this.handleClickMenu}
                handleClickTimeStamp={this.handleClickTimeStamp}
            />
        )
    }
}

function mapStateToProps(store) {
    return {
        ...store.techTargetMenuReducer,
        ...store.techTargetTimeStampReducer
    }
}

const mapDispatchToProps = {
    changeTechTargetMenu,
    changeTechTargetTimeStamp,
    changeTechDrawerVisible
}
export default connect(mapStateToProps, mapDispatchToProps)(Content)
