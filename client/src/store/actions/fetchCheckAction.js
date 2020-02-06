import { _FETCH_CHECK } from '../constants'
const { FETCH_CHECK } = _FETCH_CHECK['types']

export function fetchCheck(check) {
    return {
        type: FETCH_CHECK,
        payload: check
    }
}
