import { _TECH_TARGET_MENU } from '../constants'
const { types, init } = _TECH_TARGET_MENU
const { TECH_TARGET_MENU } = types

export default function techTargetMenuReducer(state = init, action) {
    switch (action.type) {
        case TECH_TARGET_MENU:
            return { ...state, techTargetMenu: action.payload }

        default:
            return state
    }
}
