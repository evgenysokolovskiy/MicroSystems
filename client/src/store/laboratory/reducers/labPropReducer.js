import { _LAB_PROP } from '../constants'
const { types, init } = _LAB_PROP
const { LAB_PROP } = types

export default function labPropReducer(state = init, action) {
    switch (action.type) {
        case LAB_PROP:
            return { ...state, labProp: action.payload }

        default:
            return state
    }
}
