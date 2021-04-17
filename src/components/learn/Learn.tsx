import React, {MouseEvent, useEffect, useState} from 'react'
import s from './Learn.module.css'
import {useDispatch, useSelector} from "react-redux";
import {getCardsTC, sendGradeTC} from "../cards/cardsReducer";
import {AppRootStateType} from "../../store/store";
import {useParams} from "react-router-dom";
import {CardType} from "../../api/auth-api";
import SimpleCard from "../../common/windowCard";

export const Learn = () => {
    const [first, setFirst] = useState<boolean>(true)
    const [card, setCard] = useState<CardType|null>(null);
    const cards = useSelector<AppRootStateType, Array<CardType>>(state => state.cards.cards)
    const {id} = useParams<{ id: string }>()
    const dispatch = useDispatch()
    useEffect(() => {
        if (first) {
            dispatch(getCardsTC(id))
            setFirst(false)
        }
        if (cards.length > 0) {
            setCard(getCard(cards))
        }

    }, [dispatch, id, cards, first])
    const sendGrade = (e: MouseEvent<HTMLButtonElement>, id: string) => {
        const grade: number = Number(e.currentTarget.dataset.grade)
        dispatch(sendGradeTC(grade, id))
        setCard(getCard(cards))
    }
    const getCard = (cards: CardType[]) => {
        const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
        const rand = Math.random() * sum;
        const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
                const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
                return {sum: newSum, id: newSum < rand ? i : acc.id}
            }
            , {sum: 0, id: -1});
        return cards[res.id + 1];
    }
    return (
        <div className={s.learnBlock}>

            <div>
                <SimpleCard name={card&&card.question} sendGrade={sendGrade} card={card}/>

            </div>

        </div>
    )
}