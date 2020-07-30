import {
    changeDiameterAction,
    changeInconstancyDimensionAction,
    changePressureSpeedAction,
    changeCards,
    changeTechJoinTechnologyFact,
    changeMtime,
    changeTechQualityProduction,
    changeTypes
} from '../../../store/tech/actions/techDataAction'

import { mtime, qualityProduction } from '../../urls/'

export function fetchDiameterMiddleware(url, self) {
    return (dispatch) => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                dispatch(changeDiameterAction([...data]))
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
                dispatch(changeInconstancyDimensionAction([...data]))
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
                dispatch(changePressureSpeedAction([...data]))
            })
            .then(() => self.setState({ isLoadedPressureSpeed: true }))
            .catch((error) => console.log(error))
    }
}

export function fetchJoinTechnologyFactMiddleware(url, self) {
    return (dispatch) => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                dispatch(changeTechJoinTechnologyFact({ ...data }))
            })
            .then(() => self.setState({ isLoadedJoinTechnologyFact: true }))
            .catch((error) => console.log(error))
    }
}

export function fetchCardsMiddleware(url, self) {
    return (dispatch) => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                dispatch(changeCards(data))
            })
            .then(() => self.setState({ isLoadedCards: true }))
            .catch((error) => console.log(error))
    }
}

export function fetchMtimeMiddleware(self) {
    return (dispatch) => {
        fetch(mtime)
            .then((res) => res.json())
            .then((time) => {
                dispatch(changeMtime(time))
            })
            .then(() => self.setState({ isLoadedMtime: true }))
            .catch((error) => console.log(error))
    }
}

export function fetchQualityProductionMiddleware(self) {
    return (dispatch) => {
        fetch(qualityProduction)
            .then((res) => res.json())
            .then((data) => {
                dispatch(changeTechQualityProduction({ ...data }))
            })
            .then(() => self.setState({ isLoadedQualityProduction: true }))
            .catch((error) => console.log(error))
    }
}

export function fetchTypesMiddleware(url, self) {
    return (dispatch) => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                dispatch(changeTypes([...data]))
            })
            .then(() => self.setState({ isLoadedTypes: true }))
            .catch((error) => console.log(error))
    }
}
