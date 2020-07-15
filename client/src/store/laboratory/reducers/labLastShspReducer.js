import { _LAB_LAST_SHSP } from '../constants'
const { types, init } = _LAB_LAST_SHSP
const { LAB_LAST_SHSP } = types

export default function labLastShspReducer(state = init, action) {
    switch (action.type) {
        case LAB_LAST_SHSP:
            return { ...state, labLastShsp: action.payload }

        default:
            return state
    }
}
