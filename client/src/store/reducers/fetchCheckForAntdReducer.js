import { _FETCH_CHECK_FOR_ANTD } from '../constants'
const { types, init } = _FETCH_CHECK_FOR_ANTD
const { FETCH_CHECK_FOR_ANTD } = types

export default function fetchCheckForAntdReducer(state = init, action) {
    switch (action.type) {
        case FETCH_CHECK_FOR_ANTD:
            return { ...state, checkForAntd: action.payload }

        default:
            return state
    }
}
