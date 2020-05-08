import { _TECH_PRESSURE_SPEED } from '../constants'
const { TECH_PRESSURE_SPEED } = _TECH_PRESSURE_SPEED['types']

export function techPressureSpeedAction(data) {
    return {
        type: TECH_PRESSURE_SPEED,
        payload: data
    }
}
