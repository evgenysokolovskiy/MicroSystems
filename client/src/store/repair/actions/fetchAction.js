import { _FETCH } from '../constants'
const { FETCH_DATA } = _FETCH['types']

export function fetchData(data) {
    return {
        type: FETCH_DATA,
        payload: data
    }
}
