import {
    addCurrentPacksIdAC,
    addNewCardAC,
    cardsReducer,
    changeServerAnswerStatusAC,
    deleteCardAC,
    InitialStateType,
    setCardsAC, updateCardAC
} from "./cardsReducer";
import {CardType} from "../../api/auth-api";

let initialState: InitialStateType

beforeEach(() => {
    initialState = {
        cards: [
            {
                answer: "no answer",
                cardsPack_id: "6076b34bfe48cd0004cdcde3",
                comments: "",
                created: "2021-04-14T09:24:23.916Z",
                grade: 2.823931367869897,
                more_id: "606822c85ebc7e0004aaf46f",
                question: "new 2.0!",
                questionImg: "some img",
                questionVideo: "",
                rating: 0,
                shots: 0,
                type: "card",
                updated: "2021-04-14T09:24:23.916Z",
                user_id: "606822c85ebc7e0004aaf46f",
                __v: 0,
                _id: "6076b4c7fe48cd0004cdcde7"
            },
            {
                answer: "no answer",
                cardsPack_id: "6076b34bfe48cd0004cdcde3",
                comments: "",
                created: "2021-04-14T09:24:21.579Z",
                grade: 3.286910764167824,
                more_id: "606822c85ebc7e0004aaf46f",
                question: "new 2.0!",
                questionImg: "some img",
                questionVideo: "",
                rating: 0,
                shots: 0,
                type: "card",
                updated: "2021-04-14T09:24:21.579Z",
                user_id: "606822c85ebc7e0004aaf46f",
                __v: 0,
                _id: "6076b4c5fe48cd0004cdcde6"
            }
        ],
        serverAnswerStatus: true,
        currentPacksId: ""
    }
})

test("cards/SET_CARDS", () => {

    const endState = cardsReducer(initialState, setCardsAC(initialState.cards))

    expect(endState.cards.length).toBe(2)
})

test("cards/CHANGE-SERVER-ANSWER STATUS", () => {
    const endState = cardsReducer(initialState, changeServerAnswerStatusAC(false))

    expect(endState.serverAnswerStatus).toBe(false)
    expect(initialState.serverAnswerStatus).toBe(true)
})

test("cards/ADD_NEW_CARD", () => {
    const newCard: CardType = {
        answer: "no answer",
        cardsPack_id: "6076b34bfe48cd0004cdcde3",
        comments: "",
        created: "2021-04-14T09:24:21.579Z",
        grade: 3.286910764167824,
        more_id: "606822c85ebc7e0004aaf46f",
        question: "new 2.0!",
        questionImg: "some img",
        questionVideo: "",
        rating: 0,
        shots: 0,
        type: "card",
        updated: "2021-04-14T09:24:21.579Z",
        user_id: "606822c85ebc7e0004aaf46f",
        __v: 0,
        _id: "6076b4c5fe48cd0004cdcde6"
    }

    const endState = cardsReducer(initialState, addNewCardAC(newCard))

    expect(endState.cards.length).toBe(3)
})

test("cards/DELETE_CARD", () => {
    const cardId = initialState.cards[0]._id

    const endState = cardsReducer(initialState, deleteCardAC(cardId))

    expect(endState.cards.length).toBe(1)
    expect(endState.cards[0]).not.toBe(cardId)
})

test("cards/UPDATE_CARD", () => {
    const cardId = initialState.cards[0]._id
    const newQuestion = "New 3.0 test title"

    const endState = cardsReducer(initialState, updateCardAC(cardId,newQuestion))

    expect(endState.cards.length).toBe(2)
    expect(endState.cards[0]._id).toBe(cardId)
    expect(endState.cards[0].question).toBe(newQuestion)
    expect(initialState.cards[0].question).toBe("new 2.0!")
})

test("cards/ADD_CURRENT_CARD_ID", () => {
    const cardId = "someId"

    const endState = cardsReducer(initialState, addCurrentPacksIdAC(cardId))

    expect(endState.currentPacksId).toBe(cardId)
    expect(initialState.currentPacksId).toBe("")
})
