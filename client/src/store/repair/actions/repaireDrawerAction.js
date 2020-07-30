import { _DRAWER } from '../constants'
const { DRAWER } = _DRAWER['types']

export function changeDrawerVisible(visible) {
    return {
        type: DRAWER,
        payload: visible
    }
}
