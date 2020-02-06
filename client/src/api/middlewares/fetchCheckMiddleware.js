// Экшены
import { fetchCheck } from '../../store/actions/fetchCheckAction'
// URL
import { check } from '../urls/data'

// Получить с сервера данные из таблицы Excel
// Записать в стор
export function fetchCheckMiddleware() {
    fetchCheck({ ...check })
    return dispatch => {
        fetch(check)
            .then(res => res.json())
            .then(c => {
                dispatch(fetchCheck({ ...c }))
            })
            .catch(error => console.log(error))
    }
}
