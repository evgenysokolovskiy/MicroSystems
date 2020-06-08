import { _LAB_SOURCE } from '../constants'
const { types, init } = _LAB_SOURCE
const { LAB_SOURCE } = types

export default function labSourceReducer(state = init, action) {
    switch (action.type) {
        case LAB_SOURCE:
            return { ...state, labSource: action.payload }

        default:
            return state
    }
}
