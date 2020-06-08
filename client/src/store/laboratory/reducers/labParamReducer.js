import { _LAB_PARAM } from '../constants'
const { types, init } = _LAB_PARAM
const { LAB_PARAM } = types

export default function labParamReducer(state = init, action) {
    switch (action.type) {
        case LAB_PARAM:
            return { ...state, labParam: action.payload }

        default:
            return state
    }
}
