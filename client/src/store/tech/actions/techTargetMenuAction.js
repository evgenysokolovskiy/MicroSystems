import { _TECH_TARGET_MENU } from '../constants'
const { TECH_TARGET_MENU } = _TECH_TARGET_MENU['types']

export function changeTechTargetMenu(target) {
    return {
        type: TECH_TARGET_MENU,
        payload: target
    }
}
