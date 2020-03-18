import { _TECH_TARGET_TIME_STAMP_DATA } from '../constants'
const { types, init } = _TECH_TARGET_TIME_STAMP_DATA
const { TECH_TARGET_TIME_STAMP_DATA } = types

export default function techTargetTimeStampDataReducer(state = init, action) {
    switch (action.type) {
        case TECH_TARGET_TIME_STAMP_DATA:
            return { ...state, techTargetTimeStampData: action.payload }

        default:
            return state
    }
}
