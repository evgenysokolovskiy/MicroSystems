import { _TECH_JOIN_TECHNOLOGY_FACT } from '../constants'
const { TECH_JOIN_TECHNOLOGY_FACT } = _TECH_JOIN_TECHNOLOGY_FACT['types']

export function fetchTechJoinTechnologyFact(join) {
    return {
        type: TECH_JOIN_TECHNOLOGY_FACT,
        payload: join
    }
}
