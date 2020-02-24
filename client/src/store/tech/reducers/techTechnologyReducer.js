import { _TECH_TECHNOLOGY } from '../constants'
const { types, init } = _TECH_TECHNOLOGY
const { TECH_TECHNOLOGY } = types

export default function techTechnologyReducer(state = init, action) {
    switch (action.type) {
        case TECH_TECHNOLOGY:
            return { ...state, techTechnology: action.payload }

        default:
            return state
    }
}
