import { _GREET_MENU } from '../constants'
const { types, init } = _GREET_MENU
const { GREET_MENU } = types

export default function greetMenuReducer(state = init, action) {
    switch (action.type) {
        case GREET_MENU:
            return { ...state, greetMenu: action.payload }

        default:
            return state
    }
}
