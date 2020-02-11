import { _FETCH_SCHEME } from '../constants'
const { FETCH_SCHEME } = _FETCH_SCHEME['types']

export function fetchScheme(scheme) {
    return {
        type: FETCH_SCHEME,
        payload: scheme
    }
}
