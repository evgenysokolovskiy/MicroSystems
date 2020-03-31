import clonedeep from 'lodash.clonedeep'
import { convertStringToDateBatchLoadingTime } from './calculateDates'

// Определить номера карт для выбранного типа подшипника
export function getCards({ fact: f }) {
    const fact = clonedeep(f)
    // Карты, для которых из фактических данных определено время загрузки
    const hasBatchLoadingTime = {}
    Object.entries(fact).forEach(item => {
        item[1].forEach(arr => {
            const batchLoadingTime = convertStringToDateBatchLoadingTime(arr['batchLoadingTime'])
            if (batchLoadingTime) hasBatchLoadingTime[item[0]] = batchLoadingTime
        })
    })

    // Карты, для которых из фактических данных не определено время загрузки
    const notBatchLoadingTime = Object.keys(fact).filter(
        item => !Object.keys(hasBatchLoadingTime).some(val => val === item)
    )

    return {
        hasBatchLoadingTime: ['Сводная', ...Object.keys(hasBatchLoadingTime)],
        notBatchLoadingTime
    }
}
