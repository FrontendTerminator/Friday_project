import React from 'react'
import s from "./Cards.module.css"
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {CardType} from "../../api/auth-api";
import Preloader from "../../common/preloader";
import {addCardTC} from "./cardsReducer";

export const Cards = () => {

    const dispatch = useDispatch()

    const cards = useSelector<AppRootStateType, Array<CardType> | []>(state => state.cards.cards)
    const serverAnswerStatus = useSelector<AppRootStateType, boolean>(state => state.cards.serverAnswerStatus)
    const id =  useSelector<AppRootStateType, string | undefined>(state => state.packs.packs?.cardPacks[0]._id)

    const addCard = () => {
        dispatch(addCardTC(id!))
    }

    return <div className={s.cards}>
        {serverAnswerStatus
            ? <div className={s.table}>
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
                                    <button>Delete</button>
                                    <button>Update</button>
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
            : <Preloader/>
        }
    </div>
}