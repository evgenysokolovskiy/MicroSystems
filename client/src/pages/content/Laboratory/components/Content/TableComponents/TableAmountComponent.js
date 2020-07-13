import React, { PureComponent } from 'react'
import shpAmountTable from './columns/amount/shpAmountTable'
import shspAmountTable from './columns/amount/shspAmountTable'
import sogAmountTable from './columns/amount/sogAmountTable'

export default class TableAmountComponent extends PureComponent {
    handleChangeParam = record => {
        this.props.handleClickParam(record['name'])
    }

    handleChangeProp = column => {
        this.props.handleClickProp(column['name'])
    }

    render() {
        const { menu, amount, rowTotal, columnTotal, param, prop } = this.props

        let table
        if (menu === 'shp') {
            table = shpAmountTable({
                amount,
                param,
                prop,
                rowTotal,
                columnTotal,
                handleChangeProp: this.handleChangeProp,
                handleChangeParam: this.handleChangeParam
            })
        } else if (menu === 'shsp') {
            table = shspAmountTable({
                amount,
                param,
                prop,
                rowTotal,
                columnTotal,
                handleChangeProp: this.handleChangeProp,
                handleChangeParam: this.handleChangeParam
            })
        } else if (menu === 'sog') {
            table = sogAmountTable({
                amount,
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
