import { _LAB_LAST_SHSP } from '../constants'
const { LAB_LAST_SHSP } = _LAB_LAST_SHSP['types']

export function changeLastShsp(data) {
    return {
        type: LAB_LAST_SHSP,
        payload: data
    }
}
