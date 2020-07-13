import { qualityProduction } from '../urls/data'
import { fetchTechQualityProduction } from '../../store/tech/actions/techQualityProductionAction'

export function fetchQualityProductionMiddleware(self) {
    return dispatch => {
        fetch(qualityProduction)
            .then(res => res.json())
            .then(data => {
                dispatch(fetchTechQualityProduction({ ...data }))
            })
            .then(() => self.setState({ isLoadedQualityProduction: true }))
            .catch(error => console.log(error))
    }
}
