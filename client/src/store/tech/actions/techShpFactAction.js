import { _TECH_SHP_FACT } from '../constants'
const { TECH_SHP_FACT } = _TECH_SHP_FACT['types']

export function changeTechShpFact(shpFact) {
    return {
        type: TECH_SHP_FACT,
        payload: shpFact
    }
}
