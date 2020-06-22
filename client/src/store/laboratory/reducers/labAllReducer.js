import { _LAB_ALL } from '../constants'
const { types, init } = _LAB_ALL
const { LAB_ALL } = types

export default function labAllReducer(state = init, action) {
    switch (action.type) {
        case LAB_ALL:
            return { ...state, labAll: action.payload }

        default:
            return state
    }
}
