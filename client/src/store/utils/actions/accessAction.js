import { _ACCESS } from '../constants'

const { ACCESS } = _ACCESS['types']

export function changeAccess(access) {
    return {
        type: ACCESS,
        payload: access
    }
}
