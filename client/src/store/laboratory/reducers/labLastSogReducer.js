import { _LAB_LAST_SOG } from '../constants'
const { types, init } = _LAB_LAST_SOG
const { LAB_LAST_SOG } = types

export default function labLastSogReducer(state = init, action) {
    switch (action.type) {
        case LAB_LAST_SOG:
            return { ...state, labLastSog: action.payload }

        default:
            return state
    }
}
