import { changePercent } from '../../store/laboratory/actions/labPercentAction'

export function fetchLabPercentMiddleware(url, self) {
    return dispatch => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                dispatch(changePercent(data))
            })
            .then(() => self.setState({ isLoadedPercent: true }))
            .catch(error => console.log(error))
    }
}
