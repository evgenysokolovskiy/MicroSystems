import { _TECH_DIAMETER } from '../constants'
const { types, init } = _TECH_DIAMETER
const { TECH_DIAMETER } = types

export default function techDiameterReducer(state = init, action) {
    switch (action.type) {
        case TECH_DIAMETER:
            return { ...state, techDiameter: action.payload }

        default:
            return state
    }
}
