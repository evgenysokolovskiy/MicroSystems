import { _ACCESS } from '../constants'
const { types, init } = _ACCESS
const { ACCESS } = types

export default function accessReducer(state = init, action) {
    switch (action.type) {
        case ACCESS:
            return { ...state, access: action.payload }

        default:
            return state
    }
}
