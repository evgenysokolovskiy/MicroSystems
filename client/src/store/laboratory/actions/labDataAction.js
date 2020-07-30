import {
    _LAB_ALL,
    _LAB_AMOUNT,
    _LAB_PERCENT,
    _LAB_SOURCE,
    _LAB_LAST_SHP,
    _LAB_LAST_SHSP,
    _LAB_LAST_SOG
} from '../constants'

const { LAB_ALL } = _LAB_ALL['types']
const { LAB_AMOUNT } = _LAB_AMOUNT['types']
const { LAB_PERCENT } = _LAB_PERCENT['types']
const { LAB_SOURCE } = _LAB_SOURCE['types']
const { LAB_LAST_SHP } = _LAB_LAST_SHP['types']
const { LAB_LAST_SHSP } = _LAB_LAST_SHSP['types']
const { LAB_LAST_SOG } = _LAB_LAST_SOG['types']

export function changeAll(data) {
    return {
        type: LAB_ALL,
        payload: data
    }
}

export function changeAmount(amount) {
    return {
        type: LAB_AMOUNT,
        payload: amount
    }
}

export function changePercent(percent) {
    return {
        type: LAB_PERCENT,
        payload: percent
    }
}

export function changeSource(source) {
    return {
        type: LAB_SOURCE,
        payload: source
    }
}

export function changeLastShp(data) {
    return {
        type: LAB_LAST_SHP,
        payload: data
    }
}

export function changeLastShsp(data) {
    return {
        type: LAB_LAST_SHSP,
        payload: data
    }
}

export function changeLastSog(data) {
    return {
        type: LAB_LAST_SOG,
        payload: data
    }
}
