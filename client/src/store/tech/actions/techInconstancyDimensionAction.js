import { _TECH_INCONSTANCY_DIMENSION } from '../constants'
const { TECH_INCONSTANCY_DIMENSION } = _TECH_INCONSTANCY_DIMENSION['types']

export function techInconstancyDimensionAction(data) {
    return {
        type: TECH_INCONSTANCY_DIMENSION,
        payload: data
    }
}
