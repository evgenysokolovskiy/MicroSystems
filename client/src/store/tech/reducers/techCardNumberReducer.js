import { _CARD_NUMBER } from '../constants'
const { types, init } = _CARD_NUMBER
const { CARD_NUMBER } = types

export default function techCardNumberReducer(state = init, action) {
    switch (action.type) {
        case CARD_NUMBER:
            return { ...state, techCardNumber: action.payload }

        default:
            return state
    }
}
