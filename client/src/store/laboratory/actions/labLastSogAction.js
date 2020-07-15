import { _LAB_LAST_SOG } from '../constants'
const { LAB_LAST_SOG } = _LAB_LAST_SOG['types']

export function changeLastSog(data) {
    return {
        type: LAB_LAST_SOG,
        payload: data
    }
}
