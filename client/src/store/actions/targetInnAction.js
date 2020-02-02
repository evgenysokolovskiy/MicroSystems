import { _TARGET_INN } from '../constants'
const { TARGET_INN } = _TARGET_INN['types']

export function changeTargetInn(target) {
    return {
        type: TARGET_INN,
        payload: target
    }
}
