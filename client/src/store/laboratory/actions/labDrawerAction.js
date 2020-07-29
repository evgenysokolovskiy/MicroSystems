import { _LAB_DRAWER_VISIBLE } from '../constants'
const { LAB_DRAWER_VISIBLE } = _LAB_DRAWER_VISIBLE['types']

export function changeLabDrawerVisible(visible) {
    return {
        type: LAB_DRAWER_VISIBLE,
        payload: visible
    }
}
