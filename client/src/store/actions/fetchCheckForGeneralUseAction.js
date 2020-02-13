import { _FETCH_CHECK_FOR_GENERAL_USE } from '../constants'
const { FETCH_CHECK_FOR_GENERAL_USE } = _FETCH_CHECK_FOR_GENERAL_USE['types']

export function fetchCheckForGeneralUse(checkForGeneralUse) {
    return {
        type: FETCH_CHECK_FOR_GENERAL_USE,
        payload: checkForGeneralUse
    }
}
