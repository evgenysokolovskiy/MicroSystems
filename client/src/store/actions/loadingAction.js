import { _LOADING } from '../constants'
const { LOADING } = _LOADING['types']

export function changeStateLoading(loading) {
    return {
        type: LOADING,
        payload: loading
    }
}
