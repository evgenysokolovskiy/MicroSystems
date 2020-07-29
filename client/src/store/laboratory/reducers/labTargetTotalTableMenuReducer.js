import { _LAB_TARGET_TOTAL_TABLE_MENU } from '../constants'
const { types, init } = _LAB_TARGET_TOTAL_TABLE_MENU
const { LAB_TARGET_TOTAL_TABLE_MENU } = types

export default function labTargetTotalTableMenuReducer(state = init, action) {
    switch (action.type) {
        case LAB_TARGET_TOTAL_TABLE_MENU:
            return { ...state, labTargetTotalTableMenu: action.payload }

        default:
            return state
    }
}
