import {
    changeData,
    changeScheme,
    chengeCheckForGeneralUse,
    chengeCheckForAntd
} from '../../../store/repair/actions/repaireDataAction'
import { data, scheme, checkForGeneralUse, checkForAntd } from '../../urls/'

export function fetchDataMiddleware() {
    return (dispatch) => {
        fetch(data)
            .then((res) => res.json())
            .then((d) => {
                dispatch(changeData({ ...d }))
            })
            .catch((error) => console.log(error))
    }
}

export function fetchSchemeMiddleware() {
    return (dispatch) => {
        let requests = scheme.map((url) => fetch(url))
        Promise.all(requests)
            .then((res) => Promise.all(res.map((r) => r.json())))
            .then((data) => dispatch(changeScheme({ ...data })))
            .catch((error) => console.log(error))
    }
}

export function fetchCheckForGeneralUseMiddleware() {
    return (dispatch) => {
        let requests = checkForGeneralUse.map((url) => fetch(url))
        Promise.all(requests)
            .then((res) => Promise.all(res.map((r) => r.json())))
            .then((data) => dispatch(chengeCheckForGeneralUse(...data)))
            .catch((error) => console.log(error))
    }
}

export function fetchCheckForAntdMiddleware() {
    return (dispatch) => {
        let requests = checkForAntd.map((url) => fetch(url))
        Promise.all(requests)
            .then((res) => Promise.all(res.map((r) => r.json())))
            .then((data) => dispatch(chengeCheckForAntd({ ...data })))
            .catch((error) => console.log(error))
    }
}
