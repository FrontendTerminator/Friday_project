import React, {useEffect} from 'react'
import s from "./Cards.module.css"
import {useDispatch, useSelector} from "react-redux"
import {AppRootStateType} from "../../store/store"
import {CardType} from "../../api/auth-api"
import Preloader from "../../common/preloader"
import {addCardTC, deleteCardTC, getCardsTC, updateCardTC} from "./cardsReducer"
import {useParams} from 'react-router-dom'

export const Cards = () => {

    const dispatch = useDispatch()
    const cards = useSelector<AppRootStateType, Array<CardType> | []>(state => state.cards.cards)
    const serverAnswerStatus = useSelector<AppRootStateType, boolean>(state => state.cards.serverAnswerStatus)

    const addCard = () => {
        debugger
        let newTitle = prompt("Enter title", "New question")
        if (newTitle !== null) {
            dispatch(addCardTC(id, newTitle))
        }
    }
    const deleteCard = (cardId: string) => {
        dispatch(deleteCardTC(cardId))
    }
    const updateCard = (cardId: string) => {
        let newTitle = prompt("Enter new title", "Some question")
        if (newTitle !== null) {
            dispatch(updateCardTC(cardId, newTitle))
        }
    }

    const {id} = useParams<{ id: string }>()

    useEffect(() => {
        dispatch(getCardsTC(id))
    }, [id])

    return <div className={s.cards}>
        {serverAnswerStatus
            ? <div className={s.preloader}>
                <Preloader/>
            </div>
            : <div className={s.table}>
                <div className={s.header}>
                    <div className={s.cell}>Question</div>
                    <div className={s.cell}>Answer</div>
                    <div className={s.cell}>Grade</div>
                    <div className={s.cell}>Updated</div>
                    <div className={s.cell}>
                        <button onClick={addCard}>Add</button>
                    </div>
                </div>
                <div className={s.gridTable}>
                    {cards.map((card: CardType) => {
                        return (
                            <div className={s.tableRow} key={card._id}>
                                <div className={s.cell}>{card.question}</div>
                                <div className={s.cell}>{card.answer}</div>
                                <div className={s.cell}>{card.grade}</div>
                                <div className={s.cell}>{card.updated}</div>
                                <div className={s.cell}>
                                    <button onClick={() => deleteCard(card._id)}>Delete</button>
                                    <button onClick={() => updateCard(card._id)}>Update</button>
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
            </div>


        }
    </div>
}