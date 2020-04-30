import { _TECH_TYPES } from '../constants'
const { TECH_TYPES } = _TECH_TYPES['types']

export function changeTypes(types) {
    return {
        type: TECH_TYPES,
        payload: types
    }
}
