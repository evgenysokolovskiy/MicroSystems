import { _DRAWER } from '../constants'
const { types, init } = _DRAWER
const { DRAWER } = types

export default function drawerReducer(state = init, action) {
    switch (action.type) {
        case DRAWER:
            return { ...state, visible: action.payload }

        default:
            return state
    }
}
