import { _TECH_QUALITY_PRODUCTION } from '../constants'
const { types, init } = _TECH_QUALITY_PRODUCTION
const { TECH_QUALITY_PRODUCTION } = types

export default function techQualityProductionReducer(state = init, action) {
    switch (action.type) {
        case TECH_QUALITY_PRODUCTION:
            return { ...state, techQualityProduction: action.payload }

        default:
            return state
    }
}
