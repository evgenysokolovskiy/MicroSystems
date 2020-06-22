import { _LAB_ALL } from '../constants'
const { LAB_ALL } = _LAB_ALL['types']

export function changeAll(data) {
    return {
        type: LAB_ALL,
        payload: data
    }
}
