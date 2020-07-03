import React from 'react'
import { DatePicker } from 'antd'
import moment from 'moment'
import 'moment/locale/ru'

moment.locale('ru')
const { RangePicker } = DatePicker

const dateFormat = 'DD.MM.YYYY'

export default class RangePickerComponent extends React.Component {
    onChange = (value, dateString) => {
        this.props.handleClickRangeDate([
            stringToMsDate(dateString[0]),
            stringToMsDate(dateString[1])
        ])
    }

    render() {
        const { range } = this.props

        const startDate = msDateToString(range[0])
        const endDate = msDateToString(range[1])

        return (
            <>
                <RangePicker
                    format={dateFormat}
                    value={[moment(startDate, dateFormat), moment(endDate, dateFormat)]}
                    size="large"
                    separator="-"
                    onChange={this.onChange}
                />
            </>
        )
    }
}

// Преобразовать миллисекунды в строку
function msDateToString(ms) {
    const date = new Date(ms)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    return `${String(day).padStart(2, '0')}.${String(month).padStart(2, '0')}.${String(year)}`
}

function stringToMsDate(str) {
    const newStr = [...str.split('.')]
    const date = new Date(newStr[2], newStr[1] - 1, newStr[0]).getTime()
    return new Date(date).getTime()
}
