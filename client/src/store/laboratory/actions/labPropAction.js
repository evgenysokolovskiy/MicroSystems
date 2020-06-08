import { _LAB_PROP } from '../constants'
const { LAB_PROP } = _LAB_PROP['types']

export function changeProp(prop) {
    return {
        type: LAB_PROP,
        payload: prop
    }
}
