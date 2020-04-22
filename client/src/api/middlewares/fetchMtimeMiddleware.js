import { mtime } from '../urls/data'
import { fetchMtime } from '../../store/tech/actions/techMtimeAction'

export function fetchMtimeMiddleware() {
    return dispatch => {
        fetch(mtime)
            .then(res => res.json())
            .then(time => {
                dispatch(fetchMtime(time))
            })
            .catch(error => console.log(error))
    }
}
