import { changeLastShp } from '../../store/laboratory/actions/labLastShpAction'

export function fetchLabLastShpMiddleware(url, self) {
    return dispatch => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                dispatch(
                    changeLastShp(data)
                )
            })
            .then(() => self.setState({ isLoadedLastShp: true }))
            .catch(error => console.log(error))
    }
}
