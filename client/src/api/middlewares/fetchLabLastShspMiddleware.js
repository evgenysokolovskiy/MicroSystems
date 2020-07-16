import { changeLastShsp } from '../../store/laboratory/actions/labLastShspAction'

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
