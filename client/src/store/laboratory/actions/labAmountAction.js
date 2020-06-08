import { _LAB_AMOUNT } from '../constants'
const { LAB_AMOUNT } = _LAB_AMOUNT['types']

export function changeAmount(amount) {
    return {
        type: LAB_AMOUNT,
        payload: amount
    }
}
