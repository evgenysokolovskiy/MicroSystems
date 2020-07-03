import { changeAll } from '../../store/laboratory/actions/labAllAction'

export function fetchLabAllMiddleware(url, self) {
    return dispatch => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                dispatch(
                    changeAll({
                        default: data,
                        current: null
                    })
                )
            })
            .then(() => self.setState({ isLoadedAll: true }))
            .catch(error => console.log(error))
    }
}
