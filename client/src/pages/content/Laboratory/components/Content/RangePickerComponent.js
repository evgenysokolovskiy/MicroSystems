import React from 'react'
import { DatePicker } from 'antd'
/*
import ruRU from 'antd/es/locale/ru_RU'
import moment from 'moment'
//import 'moment/locale/ru-ru'
moment.locale('bg')
const { RangePicker } = DatePicker

const  locale = {
  lang: {
    placeholder: "Избери дата",
    rangePlaceholder: [
      "Начална дата",
      "Крайна дата"
    ],
    today: 'Днес',
    now: 'Сега',
    backToToday: 'Към днес',
    ok: 'Добре',
    clear: 'Изчистване',
    month: 'Месец',
    year: 'Година',
    timeSelect: 'Избор на час',
    dateSelect: 'Избор на дата',
    monthSelect: 'Избор на месец',
    yearSelect: 'Избор на година',
    decadeSelect: 'Десетилетие',
    previousMonth: 'Предишен месец (PageUp)',
    nextMonth: 'Следващ месец (PageDown)',
    previousYear: 'Последна година (Control + left)',
    nextYear: 'Следваща година (Control + right)',
    previousDecade: 'Предишно десетилетие',
    nextDecade: 'Следващо десетилетие',
    previousCentury: 'Последен век',
    nextCentury: 'Следващ век',
    yearFormat: 'YYYY',
    dateFormat: 'D M YYYY',
    dayFormat: 'D',
    dateTimeFormat: 'D M YYYY HH:mm:ss',
    monthBeforeYear: true
  },
  timePickerLocale: {
    placeholder: 'Избор на час'
  }
}
*/

import moment from 'moment'
import 'moment/locale/ru'
moment.locale('ru')
const { RangePicker } = DatePicker

export default class RangePickerComponent extends React.Component {
    onChange = (value, dateString) => {
        console.log(dateString)
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
