// Экшены
import { fetchCheckForGeneralUse } from '../../store/actions/fetchCheckForGeneralUseAction'
import { fetchCheck } from '../../store/actions/fetchCheckAction'
// URL
import { checkForGeneralUse, checkForAntd } from '../urls/data'

// Получить с сервера данные из таблицы Excel
// Записать в стор
export function fetchCheckForGeneralUseMiddleware() {
    return dispatch => {
        let requests = checkForGeneralUse.map(url => fetch(url))
        Promise.all(requests)
            .then(res => Promise.all(res.map(r => r.json())))
            .then(data => dispatch(fetchCheckForGeneralUse({ ...data })))
            .catch(error => console.log(error))
    }
}

export function fetchCheckForAntdMiddleware() {
    return dispatch => {
        let requests = checkForAntd.map(url => fetch(url))
        Promise.all(requests)
            .then(res => Promise.all(res.map(r => r.json())))
            .then(data => dispatch(fetchCheck({ ...data })))
            .catch(error => console.log(error))
    }
}
