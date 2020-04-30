import { changeTypes } from '../../store/tech/actions/techTypesAction'

export function fetchTypesMiddleware(url, self) {
    return dispatch => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                dispatch(changeTypes([...data]))
            })
            .then(() => self.setState({ isLoadedTypes: true }))
            .catch(error => console.log(error))
    }
}
