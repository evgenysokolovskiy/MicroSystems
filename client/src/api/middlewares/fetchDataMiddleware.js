// Экшены
import { fetchData } from '../../store/repair/actions/fetchAction'
// URL
import { data } from '../urls/data'

// Получить с сервера данные из таблицы Excel
// Записать в стор
export function fetchDataMiddleware() {
    fetchData({ ...data })
    return dispatch => {
        fetch(data)
            .then(res => res.json())
            .then(d => {
                dispatch(fetchData({ ...d }))
            })
            .catch(error => console.log(error))
    }
}
