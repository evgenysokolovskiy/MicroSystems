import { _LAB_AMOUNT } from '../constants'
const { types, init } = _LAB_AMOUNT
const { LAB_AMOUNT } = types

export default function labAmountReducer(state = init, action) {
    switch (action.type) {
        case LAB_AMOUNT:
            return { ...state, labAmount: action.payload }

        default:
            return state
    }
}
