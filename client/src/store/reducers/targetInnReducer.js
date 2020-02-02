import { _TARGET_INN } from '../constants'
const { types, init } = _TARGET_INN
const { TARGET_INN } = types

export default function targetInnReducer(state = init, action) {
    switch (action.type) {
        case TARGET_INN:
            return { ...state, targetInn: action.payload }

        default:
            return state
    }
}
