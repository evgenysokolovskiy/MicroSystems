import { _GREET_MENU } from '../constants'
const { GREET_MENU } = _GREET_MENU['types']

export function changeGreetMenu(target) {
    return {
        type: GREET_MENU,
        payload: target
    }
}
