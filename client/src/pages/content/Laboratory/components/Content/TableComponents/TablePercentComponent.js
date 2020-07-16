import React, { PureComponent } from 'react'
import shpPercentTable from './columns/percent/shpPercentTable'
import shspPercentTable from './columns/percent/shspPercentTable'
import sogPercentTable from './columns/percent/sogPercentTable'

export default class TablePercentComponent extends PureComponent {
    handleChangeParam = (record) => {
        this.props.handleClickParam(record['name'])
    }

    handleChangeProp = (column) => {
        this.props.handleClickProp(column['name'])
    }

    render() {
        const { percent, rowTotal, columnTotal, menu, param, prop } = this.props

        let table
        if (menu === 'shp') {
            table = shpPercentTable({
                percent,
                param,
                prop,
                rowTotal,
                columnTotal,
                handleChangeProp: this.handleChangeProp,
                handleChangeParam: this.handleChangeParam
            })
        } else if (menu === 'shsp') {
            table = shspPercentTable({
                percent,
                param,
                prop,
                rowTotal,
                columnTotal,
                handleChangeProp: this.handleChangeProp,
                handleChangeParam: this.handleChangeParam
            })
        } else if (menu === 'sog') {
            table = sogPercentTable({
                percent,
                param,
                prop,
                rowTotal,
                columnTotal,
                handleChangeProp: this.handleChangeProp,
                handleChangeParam: this.handleChangeParam
            })
        }

        return (
            <>
                <h4 style={{ paddingTop: 20, paddingLeft: 20 }}>
                    Журнал регистрации анализов нефтепродуктов
                </h4>
                {table}
            </>
        )
    }
}
