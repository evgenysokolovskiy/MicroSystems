import {
    _TECH_DIAMETER,
    _TECH_INCONSTANCY_DIMENSION,
    _TECH_PRESSURE_SPEED,
    _TECH_CARDS,
    _TECH_JOIN_TECHNOLOGY_FACT,
    _TECH_MTIME,
    _TECH_QUALITY_PRODUCTION,
    _TECH_TYPES
} from '../constants'

const { TECH_DIAMETER } = _TECH_DIAMETER['types']
const { TECH_INCONSTANCY_DIMENSION } = _TECH_INCONSTANCY_DIMENSION['types']
const { TECH_PRESSURE_SPEED } = _TECH_PRESSURE_SPEED['types']
const { TECH_CARDS } = _TECH_CARDS['types']
const { TECH_JOIN_TECHNOLOGY_FACT } = _TECH_JOIN_TECHNOLOGY_FACT['types']
const { TECH_MTIME } = _TECH_MTIME['types']
const { TECH_QUALITY_PRODUCTION } = _TECH_QUALITY_PRODUCTION['types']
const { TECH_TYPES } = _TECH_TYPES['types']

export function changeDiameterAction(data) {
    return {
        type: TECH_DIAMETER,
        payload: data
    }
}

export function changeInconstancyDimensionAction(data) {
    return {
        type: TECH_INCONSTANCY_DIMENSION,
        payload: data
    }
}

export function changePressureSpeedAction(data) {
    return {
        type: TECH_PRESSURE_SPEED,
        payload: data
    }
}

export function changeCards(cards) {
    return {
        type: TECH_CARDS,
        payload: cards
    }
}

export function changeTechJoinTechnologyFact(join) {
    return {
        type: TECH_JOIN_TECHNOLOGY_FACT,
        payload: join
    }
}

export function changeMtime(mtime) {
    return {
        type: TECH_MTIME,
        payload: mtime
    }
}

export function changeTechQualityProduction(data) {
    return {
        type: TECH_QUALITY_PRODUCTION,
        payload: data
    }
}

export function changeTypes(types) {
    return {
        type: TECH_TYPES,
        payload: types
    }
}
