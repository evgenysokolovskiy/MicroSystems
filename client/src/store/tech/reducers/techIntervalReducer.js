import { _TECH_INTERVAL } from '../constants'
const { types, init } = _TECH_INTERVAL
const { TECH_INTERVAL } = types

export default function techIntervalReducer(state = init, action) {
    switch (action.type) {
        case TECH_INTERVAL:
            return { ...state, techInterval: action.payload }

        default:
            return state
    }
}
