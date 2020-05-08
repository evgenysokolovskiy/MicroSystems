import { _TECH_PRESSURE_SPEED } from '../constants'
const { types, init } = _TECH_PRESSURE_SPEED
const { TECH_PRESSURE_SPEED } = types

export default function techPressureSpeedReducer(state = init, action) {
    switch (action.type) {
        case TECH_PRESSURE_SPEED:
            return { ...state, techPressureSpeed: action.payload }

        default:
            return state
    }
}
