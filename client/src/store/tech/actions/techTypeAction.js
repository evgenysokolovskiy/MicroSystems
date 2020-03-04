import { _TECH_TYPE } from '../constants'
const { TECH_TYPE } = _TECH_TYPE['types']

export function changeType(type) {
    return {
        type: TECH_TYPE,
        payload: type
    }
}
