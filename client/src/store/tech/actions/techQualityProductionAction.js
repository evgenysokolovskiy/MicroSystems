import { _TECH_QUALITY_PRODUCTION } from '../constants'
const { TECH_QUALITY_PRODUCTION } = _TECH_QUALITY_PRODUCTION['types']

export function fetchTechQualityProduction(data) {
    return {
        type: TECH_QUALITY_PRODUCTION,
        payload: data
    }
}
