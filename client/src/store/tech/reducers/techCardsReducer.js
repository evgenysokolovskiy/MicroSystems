import { _TECH_CARDS } from '../constants'
const { types, init } = _TECH_CARDS
const { TECH_CARDS } = types

export default function techCardsReducer(state = init, action) {
    switch (action.type) {
        case TECH_CARDS:
            return { ...state, techCards: action.payload }

        default:
            return state
    }
}
