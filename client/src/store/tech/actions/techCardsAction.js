import { _TECH_CARDS } from '../constants'
const { TECH_CARDS } = _TECH_CARDS['types']

export function changeCards(cards) {
    return {
        type: TECH_CARDS,
        payload: cards
    }
}
