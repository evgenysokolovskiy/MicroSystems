import { _CARD_NUMBER } from '../constants'
const { CARD_NUMBER } = _CARD_NUMBER['types']

export function changeCardNumber(cardNumber) {
    return {
        type: CARD_NUMBER,
        payload: cardNumber
    }
}
