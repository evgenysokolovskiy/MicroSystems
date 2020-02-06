import { _FETCH_CHECK } from '../constants'
const { types, init } = _FETCH_CHECK
const { FETCH_CHECK } = types

export default function fetchCheckReducer(state = init, action) {
    switch (action.type) {
        case FETCH_CHECK:
            return { ...state, check: action.payload }

        default:
            return state
    }
}
