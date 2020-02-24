import { _TECH_TECHNOLOGY } from '../constants'
const { TECH_TECHNOLOGY } = _TECH_TECHNOLOGY['types']

export function changeTechTechnology(technology) {
    return {
        type: TECH_TECHNOLOGY,
        payload: technology
    }
}
