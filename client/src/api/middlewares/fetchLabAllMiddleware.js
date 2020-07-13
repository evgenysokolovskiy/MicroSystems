import { changeAll } from '../../store/laboratory/actions/labAllAction'
import { changeRangeDate } from '../../store/laboratory/actions/labChangedRangeDateAction'

export function fetchLabAllMiddleware(url, self) {
    return dispatch => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                dispatch(
                    changeAll({
                        default: data,
                        current: null
                    })
                )

                dispatch(changeRangeDate([data['defaultStart'], new Date().getTime()]))
            })
            .then(() => self.setState({ isLoadedAll: true }))
            .catch(error => console.log(error))
    }
}
