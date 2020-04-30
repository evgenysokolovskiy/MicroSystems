import { _TECH_TYPES } from '../constants'
const { types, init } = _TECH_TYPES
const { TECH_TYPES } = types

export default function techTypesReducer(state = init, action) {
    switch (action.type) {
        case TECH_TYPES:
            return { ...state, techTypes: action.payload }

        default:
            return state
    }
}
