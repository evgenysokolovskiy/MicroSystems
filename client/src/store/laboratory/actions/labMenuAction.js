import { _LAB_TARGET_MENU, _LAB_TARGET_TOTAL_TABLE_MENU } from '../constants'

const { LAB_TARGET_MENU } = _LAB_TARGET_MENU['types']
const { LAB_TARGET_TOTAL_TABLE_MENU } = _LAB_TARGET_TOTAL_TABLE_MENU['types']

export function changeLabTargetMenu(target) {
    return {
        type: LAB_TARGET_MENU,
        payload: target
    }
}

export function changeLabTargetTotalTableMenu(target) {
    return {
        type: LAB_TARGET_TOTAL_TABLE_MENU,
        payload: target
    }
}
