import { _FETCH_SCHEME } from '../constants'
const { types, init } = _FETCH_SCHEME
const { FETCH_SCHEME } = types

export default function fetchSchemeReducer(state = init, action) {
    switch (action.type) {
        case FETCH_SCHEME:
            return { ...state, scheme: action.payload }

        default:
            return state
    }
}
