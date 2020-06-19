import { _LAB_EQUIPMENT_NUMBER } from '../constants'
const { types, init } = _LAB_EQUIPMENT_NUMBER
const { LAB_EQUIPMENT_NUMBER } = types

export default function labEquipmentNumberReducer(state = init, action) {
    switch (action.type) {
        case LAB_EQUIPMENT_NUMBER:
            return { ...state, labEquipmentNumber: action.payload }

        default:
            return state
    }
}
