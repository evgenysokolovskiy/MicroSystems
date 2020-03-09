// Экшены
import { changeTechJoinTechnologyFact } from '../../store/tech/actions/techJoinTechnologyFactAction'
// URL
import { technology, shpFact } from '../urls/data'

// Получить с сервера данные из таблицы Excel
// Записать в стор
export function fetchJoinTechnologyFactMiddleware() {

	async function getData(technology, shpFact) {
		let res1 = await fetch(technology)
		let res2 = await fetch(shpFact)
		const tech = await res1.json()
		const fact = await res2.json()

		// Добавить к технологии факт
		Object.entries(tech).forEach(item => {
			Object.entries(item[1]).forEach(val => {
				const factItem = fact[item[0]][val[0]]
				if (factItem) item[1][val[0]]['fact'] = factItem
			})
		})
		
		return tech
	}

    return dispatch => {
    	getData(technology, shpFact)
    		.then(data => {
    			dispatch(changeTechJoinTechnologyFact({ ...data }))
    		})
    }
}