import {
    _FETCH,
    _FETCH_SCHEME,
    _FETCH_CHECK_FOR_GENERAL_USE,
    _FETCH_CHECK_FOR_ANTD
} from '../constants'

const { FETCH_DATA } = _FETCH['types']
const { FETCH_SCHEME } = _FETCH_SCHEME['types']
const { FETCH_CHECK_FOR_GENERAL_USE } = _FETCH_CHECK_FOR_GENERAL_USE['types']
const { FETCH_CHECK_FOR_ANTD } = _FETCH_CHECK_FOR_ANTD['types']

export function changeData(data) {
    return {
        type: FETCH_DATA,
        payload: data
    }
}

export function changeScheme(scheme) {
    return {
        type: FETCH_SCHEME,
        payload: scheme
    }
}

export function chengeCheckForGeneralUse(checkForGeneralUse) {
    return {
        type: FETCH_CHECK_FOR_GENERAL_USE,
        payload: checkForGeneralUse
    }
}

export function chengeCheckForAntd(checkForAntd) {
    return {
        type: FETCH_CHECK_FOR_ANTD,
        payload: checkForAntd
    }
}
