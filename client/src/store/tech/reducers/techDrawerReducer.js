import { _TECH_DRAWER_VISIBLE } from '../constants'
const { types, init } = _TECH_DRAWER_VISIBLE
const { TECH_DRAWER_VISIBLE } = types

export default function techDrawerReducer(state = init, action) {
    switch (action.type) {
        case TECH_DRAWER_VISIBLE:
            return { ...state, techDrawerVisible: action.payload }

        default:
            return state
    }
}
