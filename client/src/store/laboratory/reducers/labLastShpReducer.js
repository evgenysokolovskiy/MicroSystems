import { _LAB_LAST_SHP } from '../constants'
const { types, init } = _LAB_LAST_SHP
const { LAB_LAST_SHP } = types

export default function labLastShpReducer(state = init, action) {
    switch (action.type) {
        case LAB_LAST_SHP:
            return { ...state, labLastShp: action.payload }

        default:
            return state
    }
}
