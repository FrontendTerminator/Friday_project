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
        case "cards/DELETE_CARD":
            return {
                ...state,
                cards: state.cards.filter(card => card._id !== action.cardId)
            }
        case "cards/UPDATE_CARD":
            return {
                ...state,
                cards: state.cards.map(card => {
                    if (card._id === action.cardId) {
                        let newCard = {...card}
                        newCard.question = action.newTitle
                        return newCard
                    } else {
                        return card
                    }
                })
            }
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
export const deleteCardAC = (cardId: string) => ({type: "cards/DELETE_CARD", cardId} as const)
export const updateCardAC = (cardId: string, newTitle: string) => ({
    type: "cards/UPDATE_CARD", cardId, newTitle
} as const)

/*Thunks*/
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
export const addCardTC = (cardsPackId: string, newTitle: string) => (dispatch: Dispatch<cardsReducerActionType>) => {
    dispatch(changeServerAnswerStatusAC(false))
    cardsApi.addCard(cardsPackId, newTitle)
        .then(res => {
            dispatch(changeServerAnswerStatusAC(true))
            dispatch(addNewCardAC(res.newCard))
        })
        .catch(error => {
            dispatch(changeServerAnswerStatusAC(true))
            console.log(error)
            alert(error)
        })
}
export const deleteCardTC = (cardId: string) => (dispatch: Dispatch<cardsReducerActionType>) => {
    dispatch(changeServerAnswerStatusAC(false))
    cardsApi.deleteCard(cardId)
        .then(res => {
            dispatch(deleteCardAC(cardId))
            dispatch(changeServerAnswerStatusAC(true))
            console.log(res)
        })
        .catch(error => {
            dispatch(changeServerAnswerStatusAC(true))
            alert(error)
        })
}
export const updateCardTC = (cardId: string, newTitle: string) => (dispatch: Dispatch<cardsReducerActionType>) => {
    dispatch(changeServerAnswerStatusAC(false))
    cardsApi.updateCard(cardId, newTitle)
        .then(res => {
            console.log(res)
            dispatch(updateCardAC(cardId, newTitle))
            dispatch(changeServerAnswerStatusAC(true))
        })
        .catch(error => {
            dispatch(changeServerAnswerStatusAC(true))
            alert(error)
        })
}


type cardsReducerActionType =
    | ReturnType<typeof setCardsAC>
    | ReturnType<typeof changeServerAnswerStatusAC>
    | ReturnType<typeof addNewCardAC>
    | ReturnType<typeof deleteCardAC>
    | ReturnType<typeof updateCardAC>


