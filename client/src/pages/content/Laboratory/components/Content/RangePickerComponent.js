import React from 'react'
import { DatePicker } from 'antd'
import moment from 'moment'
import 'moment/locale/ru'

moment.locale('ru')
const { RangePicker } = DatePicker

export default class RangePickerComponent extends React.Component {
    onChange = (value, dateString) => {
        this.props.handleClickRangeDate(dateString)
    }

    render() {
        return (
            <>
                <RangePicker
                    defaultValue={[
                        moment('14.10.1902', 'DD.MM.YYYY'),
                        moment('15.12.1902', 'DD.MM.YYYY')
                    ]}
                    size="large"
                    separator="-"
                    onChange={this.onChange}
                />
            </>
        )
    }
}
