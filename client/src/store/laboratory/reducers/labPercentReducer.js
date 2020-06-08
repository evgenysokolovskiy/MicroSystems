import { _LAB_PERCENT } from '../constants'
const { types, init } = _LAB_PERCENT
const { LAB_PERCENT } = types

export default function labPercentReducer(state = init, action) {
    switch (action.type) {
        case LAB_PERCENT:
            return { ...state, labPercent: action.payload }

        default:
            return state
    }
}
