import {
    _CARD_NUMBER,
    _TECH_TYPE,
    _TECH_TARGET_TIME_STAMP,
    _TECH_TARGET_TIME_STAMP_DATA
} from '../constants'

const { CARD_NUMBER } = _CARD_NUMBER['types']
const { TECH_TYPE } = _TECH_TYPE['types']
const { TECH_TARGET_TIME_STAMP } = _TECH_TARGET_TIME_STAMP['types']
const { TECH_TARGET_TIME_STAMP_DATA } = _TECH_TARGET_TIME_STAMP_DATA['types']

export function changeCardNumber(cardNumber) {
    return {
        type: CARD_NUMBER,
        payload: cardNumber
    }
}

export function changeType(type) {
    return {
        type: TECH_TYPE,
        payload: type
    }
}

export function changeTechTargetTimeStamp(target) {
    return {
        type: TECH_TARGET_TIME_STAMP,
        payload: target
    }
}

export function changeTechTargetTimeStampData(data) {
    return {
        type: TECH_TARGET_TIME_STAMP_DATA,
        payload: data
    }
}
