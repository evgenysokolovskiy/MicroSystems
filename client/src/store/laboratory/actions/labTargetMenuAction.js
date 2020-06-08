import { _LAB_TARGET_MENU } from '../constants'
const { LAB_TARGET_MENU } = _LAB_TARGET_MENU['types']

export function changeLabTargetMenu(target) {
    return {
        type: LAB_TARGET_MENU,
        payload: target
    }
}
