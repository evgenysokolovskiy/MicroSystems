import { _LAB_DRAWER_VISIBLE } from '../constants'
const { types, init } = _LAB_DRAWER_VISIBLE
const { LAB_DRAWER_VISIBLE } = types

export default function labDrawerReducer(state = init, action) {
    switch (action.type) {
        case LAB_DRAWER_VISIBLE:
            return { ...state, labDrawerVisible: action.payload }

        default:
            return state
    }
}
