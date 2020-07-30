import { _LAB_PARAM, _LAB_PROP, _LAB_EQUIPMENT_NUMBER, _LAB_CHANGED_RANGEDATE } from '../constants'

const { LAB_PARAM } = _LAB_PARAM['types']
const { LAB_PROP } = _LAB_PROP['types']
const { LAB_EQUIPMENT_NUMBER } = _LAB_EQUIPMENT_NUMBER['types']
const { LAB_CHANGED_RANGEDATE } = _LAB_CHANGED_RANGEDATE['types']

export function changeParam(param) {
    return {
        type: LAB_PARAM,
        payload: param
    }
}

export function changeProp(prop) {
    return {
        type: LAB_PROP,
        payload: prop
    }
}

export function changeEquipmentNumber(equipmentNumber) {
    return {
        type: LAB_EQUIPMENT_NUMBER,
        payload: equipmentNumber
    }
}

export function changeRangeDate(range) {
    return {
        type: LAB_CHANGED_RANGEDATE,
        payload: range
    }
}
