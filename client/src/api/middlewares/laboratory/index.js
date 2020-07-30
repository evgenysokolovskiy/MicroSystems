import {
    changeAll,
    changeAmount,
    changePercent,
    changeSource,
    changeLastShp,
    changeLastShsp,
    changeLastSog
} from '../../../store/laboratory/actions/labDataAction'
import { changeRangeDate } from '../../../store/laboratory/actions/labMainFunctionalityAction'

export function fetchLabAllMiddleware(url, self) {
    return (dispatch) => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                dispatch(
                    changeAll({
                        default: data,
                        current: null
                    })
                )

                dispatch(changeRangeDate([data['defaultStart'], new Date().getTime()]))
            })
            .then(() => self.setState({ isLoadedAll: true }))
            .catch((error) => console.log(error))
    }
}

export function fetchLabAmountMiddleware(url, self) {
    return (dispatch) => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                dispatch(changeAmount(data))
            })
            .then(() => self.setState({ isLoadedAmount: true }))
            .catch((error) => console.log(error))
    }
}

export function fetchLabPercentMiddleware(url, self) {
    return (dispatch) => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                dispatch(changePercent(data))
            })
            .then(() => self.setState({ isLoadedPercent: true }))
            .catch((error) => console.log(error))
    }
}

export function fetchLabSourceMiddleware(url, self) {
    return (dispatch) => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                dispatch(changeSource(data))
            })
            .then(() => self.setState({ isLoadedSource: true }))
            .catch((error) => console.log(error))
    }
}

export function fetchLabLastShpMiddleware(url, self) {
    return (dispatch) => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                dispatch(changeLastShp(data))
            })
            .then(() => self.setState({ isLoadedLastShp: true }))
            .catch((error) => console.log(error))
    }
}

export function fetchLabLastShspMiddleware(url, self) {
    return (dispatch) => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                dispatch(changeLastShsp(data))
            })
            .then(() => self.setState({ isLoadedLastShsp: true }))
            .catch((error) => console.log(error))
    }
}

export function fetchLabLastSogMiddleware(url, self) {
    return (dispatch) => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                dispatch(changeLastSog(data))
            })
            .then(() => self.setState({ isLoadedLastSog: true }))
            .catch((error) => console.log(error))
    }
}
