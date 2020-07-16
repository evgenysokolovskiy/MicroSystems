import { changeAmount } from '../../store/laboratory/actions/labAmountAction'

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
