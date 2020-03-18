import { _TECH_TARGET_TIME_STAMP_DATA } from '../constants'
const { TECH_TARGET_TIME_STAMP_DATA } = _TECH_TARGET_TIME_STAMP_DATA['types']

export function changeTechTargetTimeStampData(data) {
    return {
        type: TECH_TARGET_TIME_STAMP_DATA,
        payload: data
    }
}
