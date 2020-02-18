import { _FETCH } from '../constants'
const { types, init } = _FETCH
const { FETCH_DATA } = types

export default function fetchReducer(state = init, action) {
    switch (action.type) {
        case FETCH_DATA:
            return { ...state, data: action.payload }

        default:
            return state
    }
}
