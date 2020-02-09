// Экшены
import { fetchCheck } from '../../store/actions/fetchCheckAction'
// URL
import { check } from '../urls/data'

// Получить с сервера данные из таблицы Excel
// Записать в стор
export function fetchCheckMiddleware() {
    return dispatch => {
        let requests = check.map(url => fetch(url))
        Promise.all(requests)
            .then(res => Promise.all(res.map(r => r.json())))
            .then(data => dispatch(fetchCheck({ ...data })))
            .catch(error => console.log(error))
    }
}
