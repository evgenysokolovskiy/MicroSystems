import { _LAB_EQUIPMENT_NUMBER } from '../constants'
const { LAB_EQUIPMENT_NUMBER } = _LAB_EQUIPMENT_NUMBER['types']

export function changeEquipmentNumber(equipmentNumber) {
    return {
        type: LAB_EQUIPMENT_NUMBER,
        payload: equipmentNumber
    }
}
