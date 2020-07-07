import { changeSource } from '../../store/laboratory/actions/labSourceAction'

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
