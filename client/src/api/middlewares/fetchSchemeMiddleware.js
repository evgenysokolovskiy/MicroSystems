// Экшены
import { fetchScheme } from '../../store/actions/fetchSchemeAction'
// URL
import { scheme } from '../urls/data'

// Получить с сервера данные из таблицы Excel
// Записать в стор
export function fetchSchemeMiddleware() {
    return dispatch => {
        let requests = scheme.map(url => fetch(url))
        Promise.all(requests)
            .then(res => Promise.all(res.map(r => r.json())))
            .then(data => dispatch(fetchScheme({ ...data })))
            .catch(error => console.log(error))
    }
}
