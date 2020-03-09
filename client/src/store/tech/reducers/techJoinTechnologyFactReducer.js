import { _TECH_JOIN_TECHNOLOGY_FACT } from '../constants'
const { types, init } = _TECH_JOIN_TECHNOLOGY_FACT
const { TECH_JOIN_TECHNOLOGY_FACT } = types

export default function techJoinTechnologyFactReducer(state = init, action) {
    switch (action.type) {
        case TECH_JOIN_TECHNOLOGY_FACT:
            return { ...state, techJoinTechnologyFact: action.payload }

        default:
            return state
    }
}
