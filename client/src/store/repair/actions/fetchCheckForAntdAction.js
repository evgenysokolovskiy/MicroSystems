import { _FETCH_CHECK_FOR_ANTD } from '../constants'
const { FETCH_CHECK_FOR_ANTD } = _FETCH_CHECK_FOR_ANTD['types']

export function fetchCheckForAntd(checkForAntd) {
    return {
        type: FETCH_CHECK_FOR_ANTD,
        payload: checkForAntd
    }
}
