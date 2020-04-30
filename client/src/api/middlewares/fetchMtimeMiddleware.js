import { mtime } from '../urls/data'
import { fetchMtime } from '../../store/tech/actions/techMtimeAction'

export function fetchMtimeMiddleware(self) {
    return dispatch => {
        fetch(mtime)
            .then(res => res.json())
            .then(time => {
                dispatch(fetchMtime(time))
            })
            .then(() => self.setState({ isLoadedMtime: true }))
            .catch(error => console.log(error))
    }
}
