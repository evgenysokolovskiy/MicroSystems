import { _LAB_SOURCE } from '../constants'
const { LAB_SOURCE } = _LAB_SOURCE['types']

export function changeSource(source) {
    return {
        type: LAB_SOURCE,
        payload: source
    }
}
