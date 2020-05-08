import { _TECH_INCONSTANCY_DIMENSION } from '../constants'
const { types, init } = _TECH_INCONSTANCY_DIMENSION
const { TECH_INCONSTANCY_DIMENSION } = types

export default function techInconstancyDimensionReducer(state = init, action) {
    switch (action.type) {
        case TECH_INCONSTANCY_DIMENSION:
            return { ...state, techInconstancyDimension: action.payload }

        default:
            return state
    }
}
