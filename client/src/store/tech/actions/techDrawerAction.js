import { _TECH_DRAWER_VISIBLE } from '../constants'
const { TECH_DRAWER_VISIBLE } = _TECH_DRAWER_VISIBLE['types']

export function changeTechDrawerVisible(visible) {
    return {
        type: TECH_DRAWER_VISIBLE,
        payload: visible
    }
}
