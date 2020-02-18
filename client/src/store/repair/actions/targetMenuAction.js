import { _TARGET_MENU } from '../constants'
const { TARGET_MENU } = _TARGET_MENU['types']

export function changeTargetMenu(target) {
    return {
        type: TARGET_MENU,
        payload: target
    }
}
