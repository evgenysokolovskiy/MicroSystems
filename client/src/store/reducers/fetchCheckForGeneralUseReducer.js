import { _FETCH_CHECK_FOR_GENERAL_USE } from '../constants'
const { types, init } = _FETCH_CHECK_FOR_GENERAL_USE
const { FETCH_CHECK_FOR_GENERAL_USE } = types

export default function fetchCheckForGeneralUseReducer(state = init, action) {
    switch (action.type) {
        case FETCH_CHECK_FOR_GENERAL_USE:
            return { ...state, checkForGeneralUse: action.payload }

        default:
            return state
    }
}
