import { _LAB_CHANGED_RANGEDATE } from '../constants'
const { LAB_CHANGED_RANGEDATE } = _LAB_CHANGED_RANGEDATE['types']

export function changeRangeDate(range) {
    return {
        type: LAB_CHANGED_RANGEDATE,
        payload: range
    }
}
