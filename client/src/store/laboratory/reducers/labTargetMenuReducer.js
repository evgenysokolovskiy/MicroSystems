import { _LAB_TARGET_MENU } from '../constants'
const { types, init } = _LAB_TARGET_MENU
const { LAB_TARGET_MENU } = types

export default function labTargetMenuReducer(state = init, action) {
    switch (action.type) {
        case LAB_TARGET_MENU:
            return { ...state, labTargetMenu: action.payload }

        default:
            return state
    }
}
