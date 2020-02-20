import { _TECH_TARGET_TIME_STAMP } from '../constants'
const { types, init } = _TECH_TARGET_TIME_STAMP
const { TECH_TARGET_TIME_STAMP } = types

export default function techTargetTimeStampReducer(state = init, action) {
    switch (action.type) {
        case TECH_TARGET_TIME_STAMP:
            return { ...state, techTargetTimeStamp: action.payload }

        default:
            return state
    }
}
