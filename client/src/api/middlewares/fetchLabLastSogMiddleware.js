import { changeLastSog } from '../../store/laboratory/actions/labLastSogAction'

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
