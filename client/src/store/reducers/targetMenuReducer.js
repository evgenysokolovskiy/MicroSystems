import { _TARGET_MENU } from '../constants'
const { types, init } = _TARGET_MENU
const { TARGET_MENU } = types

export default function targetMenuReducer(state = init, action) {
    switch (action.type) {
        case TARGET_MENU:
            return { ...state, targetMenu: action.payload }

        default:
            return state
    }
}
