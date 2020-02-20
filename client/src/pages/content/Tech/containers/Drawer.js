import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { App } from '../components/Drawer/App'
import { changeTechDrawerVisible } from '../../../../store/tech/actions/techDrawerAction'
import { changeTechTargetTimeStamp } from '../../../../store/tech/actions/techTargetTimeStampAction'

// Входящие данные
import { dataDiameter, dataInconstancyDimension, datapPessureSpeed } from '../data'

export class Drawer extends PureComponent {
    handleClickCloseTechDrawer = () => this.props.changeTechDrawerVisible(false)

    render() {
        const { techDrawerVisible: visible, techTargetTimeStamp } = this.props

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
            <>
                <App
                    technology={technology}
                    fact={fact}
                    techTargetTimeStamp={techTargetTimeStamp}
                    visible={visible}
                    handleClickCloseTechDrawer={this.handleClickCloseTechDrawer}
                    changeTechTargetTimeStamp={this.props.changeTechTargetTimeStamp}
                />
            </>
        )
    }
}

function mapStateToProps(store) {
    return {
        ...store.techDrawerReducer,
        ...store.techTargetTimeStampReducer
    }
}

const mapDispatchToProps = {
    changeTechDrawerVisible,
    changeTechTargetTimeStamp
}

export default connect(mapStateToProps, mapDispatchToProps)(Drawer)
