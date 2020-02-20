import { _TECH_TARGET_TIME_STAMP } from '../constants'
const { TECH_TARGET_TIME_STAMP } = _TECH_TARGET_TIME_STAMP['types']

export function changeTechTargetTimeStamp(target) {
    return {
        type: TECH_TARGET_TIME_STAMP,
        payload: target
    }
}
