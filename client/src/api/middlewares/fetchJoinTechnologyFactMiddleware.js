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

		// Создать новый объект, включающий технологию и факт

		// Добавить технологию
		let obj = {}
		Object.keys(tech).forEach(key => {
			const obj1 = {}
			Object.entries(tech[key]).forEach(item => {
				obj1[item[0]]= item[1]
			})

			const obj2 = {}
			Object.entries(obj1).forEach(val => {
				obj2[val[0]] = {
					technology: val[1]
				}
			})
			obj[key] = obj2
		})

		// Добавить факт
		Object.entries(obj).forEach(item => {
			Object.entries(item[1]).forEach(type => {
				const factItem = fact[item[0]][type[0]]
				if (factItem) item[1][type[0]]['fact'] = factItem
			})
		})


		Object.entries(obj).forEach(item => {
			Object.entries(item[1]).forEach(type => {
				const cards = {}
				type[1]['fact'] && type[1]['fact'].forEach(card => {
					const c = cards[card['cardNumber']]
					cards[card['cardNumber']] = c ? [...c, card] : [card]
				})
				item[1][type[0]]['fact'] = cards
			})
		})
		return obj
	}

    return dispatch => {
    	getData(technology, shpFact)
    		.then(data => {
    			dispatch(changeTechJoinTechnologyFact({ ...data }))
    		})
    }
}