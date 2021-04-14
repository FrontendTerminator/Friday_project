import {cardsApi, CardType} from "../../api/auth-api";
import {Dispatch} from "redux";

export type InitialStateType = {
    cards: Array<CardType>
    serverAnswerStatus: boolean
}
const initialState: InitialStateType = {
    cards: [],
    serverAnswerStatus: true
}

export const cardsReducer = (state: InitialStateType = initialState, action: cardsReducerActionType): InitialStateType => {
    switch (action.type) {
        case "cards/SET_CARDS":
            return {...state, cards: action.cards}
        case "cards/CHANGE-SERVER-ANSWER STATUS":
            return {...state, serverAnswerStatus: action.status}
        case "cards/ADD_NEW_CARD":
            return {...state, cards: [...state.cards, action.newCard]}
        default: {
            return state
        }
    }
}

export const setCardsAC = (cards: CardType[]) => ({type: "cards/SET_CARDS", cards} as const)
export const changeServerAnswerStatusAC = (status: boolean) => ({
    type: "cards/CHANGE-SERVER-ANSWER STATUS", status
} as const)
export const addNewCardAC = (newCard: CardType) => ({type: "cards/ADD_NEW_CARD", newCard} as const)

export const getCardsTC = (packsId: string) => (dispatch: Dispatch<cardsReducerActionType>) => {
    dispatch(changeServerAnswerStatusAC(false))
    cardsApi.getCards(packsId)
        .then(res => {
            dispatch(setCardsAC(res.cards))
            dispatch(changeServerAnswerStatusAC(true))
        })
        .catch(error => {
            dispatch(changeServerAnswerStatusAC(true))
            alert(error)
        })
}
export const addCardTC = (cardsPackId: string) => (dispatch: Dispatch<cardsReducerActionType>) => {
    dispatch(changeServerAnswerStatusAC(false))
    cardsApi.addCard(cardsPackId)
        .then(res => {
            dispatch(changeServerAnswerStatusAC(true))
            dispatch(addNewCardAC(res.newCard))
        })
}

type cardsReducerActionType =
    | ReturnType<typeof setCardsAC>
    | ReturnType<typeof changeServerAnswerStatusAC>
    | ReturnType<typeof addNewCardAC>


