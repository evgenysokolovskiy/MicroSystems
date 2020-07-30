import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import clonedeep from 'lodash.clonedeep'
// Компонент
import App from '../components/Content/App'

// * FETCH
// Основные Данные
import {
    fetchLabAllMiddleware,
    fetchLabPercentMiddleware,
    fetchLabAmountMiddleware,
    fetchLabSourceMiddleware,
    fetchLabLastShpMiddleware,
    fetchLabLastShspMiddleware,
    fetchLabLastSogMiddleware
} from '../../../../api/middlewares/laboratory/'

// * ACTIONS
// Изменение основных данных
import {
    changeAll,
    changeAmount,
    changePercent,
    changeSource
} from '../../../../store/laboratory/actions/labDataAction'
// Меню
import {
    changeLabTargetMenu,
    changeLabTargetTotalTableMenu
} from '../../../../store/laboratory/actions/labMenuAction'
// Основной функционал
import {
    changeParam,
    changeProp,
    changeEquipmentNumber,
    changeRangeDate
} from '../../../../store/laboratory/actions/labMainFunctionalityAction'
// Всплывающее окно
import { changeLabDrawerVisible } from '../../../../store/laboratory/actions/labDrawerAction'

// URLs
import {
    laboratoryLastShp,
    laboratoryAllShp,
    laboratoryPercentShp,
    laboratoryAmountShp,
    laboratorySourceShp,
    laboratoryLastShsp,
    laboratoryAllShsp,
    laboratoryPercentShsp,
    laboratoryAmountShsp,
    laboratorySourceShsp,
    laboratoryLastSog,
    laboratoryAllSog,
    laboratoryPercentSog,
    laboratoryAmountSog,
    laboratorySourceSog
} from '../../../../api/urls/'

// Вспомогательные функции
import calculateDataShp from '../helpers/shp/'
import calculateDataShsp from '../helpers/shsp/'
import calculateDataSog from '../helpers/sog/'

class Content extends PureComponent {
    state = {
        isLoadedLastShp: false,
        isLoadedLastShsp: false,
        isLoadedLastSog: false,
        isLoadedAll: false,
        isLoadedPercent: false,
        isLoadedAmount: false,
        isLoadedSource: false
    }

    componentDidMount(prevProps) {
        const {
            fetchLabSourceMiddleware,
            fetchLabLastShpMiddleware,
            fetchLabLastShspMiddleware,
            fetchLabLastSogMiddleware,
            changeLabTargetTotalTableMenu
        } = this.props

        fetchLabSourceMiddleware(laboratorySourceSog, this)
        fetchLabLastShpMiddleware(laboratoryLastShp, this)
        fetchLabLastShspMiddleware(laboratoryLastShsp, this)
        fetchLabLastSogMiddleware(laboratoryLastSog, this)

        this.setState({ isLoadedLastShp: false })
    }

    // Событие по меню (выбор операции в сводном отчёте)
    handleClickTotalTableMenu = (target) => {
        const { fetchLabSourceMiddleware } = this.props

        if (target === 'shp') {
            fetchLabSourceMiddleware(laboratorySourceShp, this)
            this.setState({ isLoadedLastShp: false })
        }

        if (target === 'shsp') {
            fetchLabSourceMiddleware(laboratorySourceShsp, this)
            this.setState({ isLoadedLastShsp: false })
        }

        if (target === 'sog') {
            fetchLabSourceMiddleware(laboratorySourceSog, this)
            this.setState({ isLoadedLastSog: false })
        }
        this.props.changeLabTargetTotalTableMenu(target)

        // Перевести в false состояние для новых загрузок
        this.setState({
            isLoadedSource: false
        })
    }

    handleClickRowTotalTable = (item) => {
        const { changeParam, changeProp, changeEquipmentNumber } = this.props

        changeParam(item['param'])
        changeProp(item['prop'])
        changeEquipmentNumber(item['equipment'])
    }

    // Событие по меню (выбора операции)
    handleClickMenu = (item) => {
        const {
            fetchLabAmountMiddleware,
            fetchLabPercentMiddleware,
            fetchLabSourceMiddleware,
            fetchLabAllMiddleware,
            changeLabTargetMenu
        } = this.props

        if (item === 'shp') {
            fetchLabAmountMiddleware(laboratoryAmountShp, this)
            fetchLabPercentMiddleware(laboratoryPercentShp, this)
            fetchLabSourceMiddleware(laboratorySourceShp, this)
            fetchLabAllMiddleware(laboratoryAllShp, this)
            this.setState({ isLoadedLastShp: false })
        }

        if (item === 'shsp') {
            fetchLabAmountMiddleware(laboratoryAmountShsp, this)
            fetchLabPercentMiddleware(laboratoryPercentShsp, this)
            fetchLabSourceMiddleware(laboratorySourceShsp, this)
            fetchLabAllMiddleware(laboratoryAllShsp, this)
            this.setState({ isLoadedLastShsp: false })
        }

        if (item === 'sog') {
            fetchLabAmountMiddleware(laboratoryAmountSog, this)
            fetchLabPercentMiddleware(laboratoryPercentSog, this)
            fetchLabSourceMiddleware(laboratorySourceSog, this)
            fetchLabAllMiddleware(laboratoryAllSog, this)
            this.setState({ isLoadedLastSog: false })
        }

        changeLabTargetMenu(item)

        // Перевести в false состояние для новых загрузок
        this.setState({
            isLoadedAll: false,
            isLoadedPercent: false,
            isLoadedAmount: false,
            isLoadedSource: false
        })
    }

    handleClickParam = (item) => {
        const { changeParam, changeEquipmentNumber } = this.props
        changeParam(item)
        changeEquipmentNumber('Сводная')
    }

    handleClickProp = (item) => {
        const { changeProp, changeEquipmentNumber } = this.props
        changeProp(item)
        changeEquipmentNumber('Сводная')
    }

    handleClickEquipment = (item) => {
        this.props.changeEquipmentNumber(item)
    }

    handleClickRangeDate = (range) => {
        const {
            labAll,
            labTargetMenu: menu,
            changeAll,
            changePercent,
            changeAmount,
            changeSource,
            changeParam,
            changeProp,
            changeRangeDate
        } = this.props

        const defaultData = clonedeep(labAll['default'])
        const technology = defaultData['technology']
        const dateIndex = defaultData['dateIndex']
        const fact =
            defaultData['data'] &&
            defaultData['data'].filter(
                (item) => item[dateIndex] > range[0] && item[dateIndex] < range[1]
            )

        let current
        if (menu === 'shp') current = calculateDataShp({ fact, technology })
        if (menu === 'shsp') current = calculateDataShsp({ fact, technology })
        if (menu === 'sog') current = calculateDataSog({ fact, technology })

        changeRangeDate(range)

        Object.entries(current['source']).forEach((item) => {
            if (Object.keys(item[1])[0]) {
                changeParam(item[0])
                changeProp(Object.keys(item[1])[0])
            }
        })

        changePercent(current['percent'])
        changeAmount(current['amount'])
        changeSource(current['source'])
        changeAll({ default: defaultData, current })
    }

    handleClickOpenDrawer = (item) => this.props.changeLabDrawerVisible(true)

    render() {
        const {
            greetMenu,
            labLastShp: lastShp,
            labLastShsp: lastShsp,
            labLastSog: lastSog,
            labAll: all,
            labPercent: percent,
            labAmount: amount,
            labSource: source,
            labTargetMenu: menu,
            labParam: param,
            labProp: prop,
            labEquipmentNumber: equipment,
            labChangedRangeDate: range
        } = this.props
        const {
            isLoadedLastShp,
            isLoadedLastShsp,
            isLoadedLastSog,
            isLoadedAll,
            isLoadedPercent,
            isLoadedAmount,
            isLoadedSource
        } = this.state
        const defaultStart = all && all['default']['defaultStart']

        const rowTotal = {}
        amount &&
            Object.entries(amount).forEach((item) => {
                let t = 0
                let f = 0
                rowTotal[item[0]] = {}

                Object.values(item[1]).forEach((val) => {
                    t += val['true']
                    f += val['false']
                })

                rowTotal[item[0]]['true'] = t
                rowTotal[item[0]]['false'] = f
                rowTotal[item[0]]['all'] = t + f
                rowTotal[item[0]]['percentTrue'] = ((t / (t + f)) * 100).toFixed()
            })

        const columnTotal = {}
        amount &&
            Object.values(amount).forEach((item) => {
                Object.entries(item).forEach((val) => {
                    if (!columnTotal[val[0]]) columnTotal[val[0]] = { true: 0, false: 0 }
                    columnTotal[val[0]]['true'] += val[1]['true']
                    columnTotal[val[0]]['false'] += val[1]['false']
                    columnTotal[val[0]]['percentTrue'] = (
                        (columnTotal[val[0]]['true'] /
                            (columnTotal[val[0]]['true'] + columnTotal[val[0]]['false'])) *
                        100
                    ).toFixed()
                })
            })

        return (
            <App
                greetMenu={greetMenu}
                lastShp={lastShp}
                lastShsp={lastShsp}
                lastSog={lastSog}
                menu={menu}
                range={range}
                defaultStart={defaultStart}
                param={param}
                prop={prop}
                equipment={equipment}
                percent={percent}
                amount={amount}
                source={source}
                rowTotal={rowTotal}
                columnTotal={columnTotal}
                isLoadedLastShp={isLoadedLastShp}
                isLoadedLastShsp={isLoadedLastShsp}
                isLoadedLastSog={isLoadedLastSog}
                isLoadedAll={isLoadedAll}
                isLoadedPercent={isLoadedPercent}
                isLoadedAmount={isLoadedAmount}
                isLoadedSource={isLoadedSource}
                handleClickTotalTableMenu={this.handleClickTotalTableMenu}
                handleClickMenu={this.handleClickMenu}
                handleClickParam={this.handleClickParam}
                handleClickProp={this.handleClickProp}
                handleClickEquipment={this.handleClickEquipment}
                handleClickRangeDate={this.handleClickRangeDate}
                handleClickRowTotalTable={this.handleClickRowTotalTable}
                handleClickOpenDrawer={this.handleClickOpenDrawer}
            />
        )
    }
}

function mapStateToProps(store) {
    return {
        ...store.greetMenuReducer,
        ...store.labLastShpReducer,
        ...store.labLastShspReducer,
        ...store.labLastSogReducer,
        ...store.labAllReducer,
        ...store.labPercentReducer,
        ...store.labAmountReducer,
        ...store.labSourceReducer,
        ...store.labTargetTotalTableMenuReducer,
        ...store.labTargetMenuReducer,
        ...store.labParamReducer,
        ...store.labPropReducer,
        ...store.labEquipmentNumberReducer,
        ...store.labChangedRangeDateReducer,
        ...store.labDrawerReducer
    }
}

const mapDispatchToProps = {
    fetchLabLastShpMiddleware,
    fetchLabLastShspMiddleware,
    fetchLabLastSogMiddleware,
    fetchLabAllMiddleware,
    fetchLabPercentMiddleware,
    fetchLabAmountMiddleware,
    fetchLabSourceMiddleware,
    changeLabTargetTotalTableMenu,
    changeLabTargetMenu,
    changeAll,
    changePercent,
    changeAmount,
    changeSource,
    changeParam,
    changeProp,
    changeEquipmentNumber,
    changeRangeDate,
    changeLabDrawerVisible
}

export default connect(mapStateToProps, mapDispatchToProps)(Content)
