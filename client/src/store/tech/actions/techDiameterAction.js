import { _TECH_DIAMETER } from '../constants'
const { TECH_DIAMETER } = _TECH_DIAMETER['types']

export function techDiameterAction(data) {
    return {
        type: TECH_DIAMETER,
        payload: data
    }
}
