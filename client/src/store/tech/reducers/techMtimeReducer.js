import { _TECH_MTIME } from '../constants'
const { types, init } = _TECH_MTIME
const { TECH_MTIME } = types

export default function techMtimeReducer(state = init, action) {
    switch (action.type) {
        case TECH_MTIME:
            return { ...state, techMtime: action.payload }

        default:
            return state
    }
}
