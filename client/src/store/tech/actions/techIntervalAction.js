import { _TECH_INTERVAL } from '../constants'
const { TECH_INTERVAL } = _TECH_INTERVAL['types']

export function fetchInterval(interval) {
    return {
        type: TECH_INTERVAL,
        payload: interval
    }
}
