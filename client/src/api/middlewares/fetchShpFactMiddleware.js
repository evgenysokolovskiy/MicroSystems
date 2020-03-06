// Экшены
import { changeTechShpFact } from '../../store/tech/actions/techShpFactAction'
// URL
import { shpFact } from '../urls/data'

// Получить с сервера данные из таблицы Excel
// Записать в стор
export function fetchShpFactMiddleware() {
    //changeTechShpFact({ ...shpFact })
    return dispatch => {
        fetch(shpFact)
            .then(res => res.json())
            .then(d => {
                dispatch(changeTechShpFact({ ...d }))
            })
            .catch(error => console.log(error))
    }
}
