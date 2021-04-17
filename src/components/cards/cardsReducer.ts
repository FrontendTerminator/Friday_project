import {cardsApi, CardType} from "../../api/auth-api";
import {Dispatch} from "redux";

export type InitialStateType = {
    cards: Array<CardType>
    serverAnswerStatus: boolean
    currentPacksId: string
}
const initialState: InitialStateType = {
    cards: [],
    serverAnswerStatus: false,
    currentPacksId: ""
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
        case "cards/ADD_CURRENT_PACKS_ID":
            return {...state, currentPacksId: action.packsId}
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
export const addCurrentPacksIdAC = (packsId: string) => ({type: "cards/ADD_CURRENT_PACKS_ID", packsId} as const)

/*Thunks*/
export const getCardsTC = (packsId: string) => (dispatch: Dispatch<cardsReducerActionType>) => {
    dispatch(changeServerAnswerStatusAC(true))
    cardsApi.getCards(packsId)
        .then(res => {
            dispatch(setCardsAC(res.cards))
            dispatch(changeServerAnswerStatusAC(false))
        })
        .catch(error => {
            dispatch(changeServerAnswerStatusAC(false))
            alert(error)
        })
}
export const addCardTC = (cardsPackId: string, newTitle: string) => (dispatch: Dispatch<cardsReducerActionType>) => {
    dispatch(changeServerAnswerStatusAC(true))
    cardsApi.addCard(cardsPackId, newTitle)
        .then(res => {
            dispatch(changeServerAnswerStatusAC(false))
            dispatch(addNewCardAC(res.newCard))
        })
        .catch(error => {
            dispatch(changeServerAnswerStatusAC(false))
            console.log(error)
            alert(error)
        })
}
export const deleteCardTC = (cardId: string) => (dispatch: Dispatch<cardsReducerActionType>) => {
    dispatch(changeServerAnswerStatusAC(true))
    cardsApi.deleteCard(cardId)
        .then(res => {
            dispatch(deleteCardAC(cardId))
            dispatch(changeServerAnswerStatusAC(false))
            console.log(res)
        })
        .catch(error => {
            dispatch(changeServerAnswerStatusAC(false))
            alert(error)
        })
}
export const updateCardTC = (cardId: string, newTitle: string) => (dispatch: Dispatch<cardsReducerActionType>) => {
    dispatch(changeServerAnswerStatusAC(true))
    cardsApi.updateCard(cardId, newTitle)
        .then(res => {
            console.log(res)
            dispatch(updateCardAC(cardId, newTitle))
            dispatch(changeServerAnswerStatusAC(false))
        })
        .catch(error => {
            dispatch(changeServerAnswerStatusAC(false))
            alert(error)
        })
}
export const sendGradeTC = (grade: number,cardId: string ) => (dispatch: Dispatch<cardsReducerActionType>) => {
    dispatch(changeServerAnswerStatusAC(true))
    cardsApi.sendGrade(grade,cardId, )
        .then(res => {
            dispatch(changeServerAnswerStatusAC(false))
        })
        .catch(error => {
            dispatch(changeServerAnswerStatusAC(false))
            alert(error)
        })
}


type cardsReducerActionType =
    | ReturnType<typeof setCardsAC>
    | ReturnType<typeof changeServerAnswerStatusAC>
    | ReturnType<typeof addNewCardAC>
    | ReturnType<typeof deleteCardAC>
    | ReturnType<typeof updateCardAC>
    | ReturnType<typeof addCurrentPacksIdAC>


