// Экшены
import { changeTechTechnology } from '../../store/tech/actions/techTechnologyAction'
// URL
import { technology } from '../urls/data'

// Получить с сервера данные из таблицы Excel
// Записать в стор
export function fetchTechnologyMiddleware() {
    //changeTechTechnology({ ...technology })
    return dispatch => {
        fetch(technology)
            .then(res => res.json())
            .then(d => {
                dispatch(changeTechTechnology({ ...d }))
            })
            .catch(error => console.log(error))
    }
}
