import { changeCards } from '../../store/tech/actions/techCardsAction'

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
