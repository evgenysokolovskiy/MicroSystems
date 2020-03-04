import { _TECH_TYPE } from '../constants'
const { types, init } = _TECH_TYPE
const { TECH_TYPE } = types

export default function techTypeReducer(state = init, action) {
    switch (action.type) {
        case TECH_TYPE:
            return { ...state, techType: action.payload }

        default:
            return state
    }
}
