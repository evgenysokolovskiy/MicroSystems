import { _LAB_PARAM } from '../constants'
const { LAB_PARAM } = _LAB_PARAM['types']

export function changeParam(param) {
    return {
        type: LAB_PARAM,
        payload: param
    }
}
