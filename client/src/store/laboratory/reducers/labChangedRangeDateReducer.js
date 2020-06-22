import { _LAB_CHANGED_RANGEDATE } from '../constants'
const { types, init } = _LAB_CHANGED_RANGEDATE
const { LAB_CHANGED_RANGEDATE } = types

export default function labChangedRangeDateReducer(state = init, action) {
    switch (action.type) {
        case LAB_CHANGED_RANGEDATE:
            return { ...state, labChangedRangeDate: action.payload }

        default:
            return state
    }
}
