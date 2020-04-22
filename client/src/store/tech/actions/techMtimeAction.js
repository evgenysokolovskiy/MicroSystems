import { _TECH_MTIME } from '../constants'
const { TECH_MTIME } = _TECH_MTIME['types']

export function fetchMtime(mtime) {
    return {
        type: TECH_MTIME,
        payload: mtime
    }
}
