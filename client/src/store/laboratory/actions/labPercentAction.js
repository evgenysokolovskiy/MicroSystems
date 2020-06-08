import { _LAB_PERCENT } from '../constants'
const { LAB_PERCENT } = _LAB_PERCENT['types']

export function changePercent(percent) {
    return {
        type: LAB_PERCENT,
        payload: percent
    }
}
