import { qualityProduction } from '../urls/data'
import { fetchTechQualityProduction } from '../../store/tech/actions/techQualityProductionAction'

export function fetchQualityProductionMiddleware() {
    return dispatch => {
        fetch(qualityProduction)
            .then(res => res.json())
            .then(data => {
                dispatch(fetchTechQualityProduction({ ...data }))
            })
            .catch(error => console.log(error))
    }
}
