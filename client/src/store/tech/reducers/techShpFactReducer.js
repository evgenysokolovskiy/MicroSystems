import { _TECH_SHP_FACT } from '../constants'
const { types, init } = _TECH_SHP_FACT
const { TECH_SHP_FACT } = types

export default function techShpFactReducer(state = init, action) {
    switch (action.type) {
        case TECH_SHP_FACT:
            return { ...state, techShpFact: action.payload }

        default:
            return state
    }
}
