import { _LOADING } from '../constants'
const { types, init } = _LOADING
const { LOADING } = types

export default function loadingReducer(state = init, action) {
    switch (action.type) {
        case LOADING:
            return { ...state, loading: action.payload }

        default:
            return state
    }
}
