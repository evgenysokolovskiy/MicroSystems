import { _LAB_LAST_SHP } from '../constants'
const { LAB_LAST_SHP } = _LAB_LAST_SHP['types']

export function changeLastShp(data) {
    return {
        type: LAB_LAST_SHP,
        payload: data
    }
}
