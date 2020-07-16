import { fetchTechJoinTechnologyFact } from '../../store/tech/actions/techJoinTechnologyFactAction'
import { techDiameterAction } from '../../store/tech/actions/techDiameterAction'
import { techInconstancyDimensionAction } from '../../store/tech/actions/techInconstancyDimensionAction'
import { techPressureSpeedAction } from '../../store/tech/actions/techPressureSpeedAction'

export function fetchJoinTechnologyFactMiddleware(url, self) {
    return (dispatch) => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                dispatch(fetchTechJoinTechnologyFact({ ...data }))
            })
            .then(() => self.setState({ isLoadedJoinTechnologyFact: true }))
            .catch((error) => console.log(error))
    }
}

export function fetchDiameterMiddleware(url, self) {
    return (dispatch) => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                dispatch(techDiameterAction([...data]))
            })
            .then(() => self.setState({ isLoadedDiameter: true }))
            .catch((error) => console.log(error))
    }
}

export function fetchInconstancyDimensionMiddleware(url, self) {
    return (dispatch) => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                dispatch(techInconstancyDimensionAction([...data]))
            })
            .then(() => self.setState({ isLoadedInconstancyDimension: true }))
            .catch((error) => console.log(error))
    }
}

export function fetchPressureSpeedMiddleware(url, self) {
    return (dispatch) => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                dispatch(techPressureSpeedAction([...data]))
            })
            .then(() => self.setState({ isLoadedPressureSpeed: true }))
            .catch((error) => console.log(error))
    }
}
