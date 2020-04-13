import { interval } from '../urls/data'
import { fetchInterval } from '../../store/tech/actions/techIntervalAction'

export function fetchIntervalMiddleware() {
    return dispatch => {
        fetch(interval)
            .then(res => res.json())
            .then(num => {
                dispatch(fetchInterval(num))
            })
            .catch(error => console.log(error))
    }
}
