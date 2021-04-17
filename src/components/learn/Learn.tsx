import React, {MouseEvent, useState} from 'react'
import s from './Learn.module.css'
import {useDispatch, useSelector} from "react-redux";
import {sendGradeTC} from "../cards/cardsReducer";
import {AppRootStateType} from "../../store/store";

export const Learn = () => {
    const [editMode, setEditMode] = useState(false)
    const serverAnswerStatus = useSelector<AppRootStateType, boolean>(state => state.cards.serverAnswerStatus)

    const dispatch = useDispatch()

    const sendGrade = (e: MouseEvent<HTMLButtonElement>) => {
        const grade: number = Number(e.currentTarget.dataset.grade)
        dispatch(sendGradeTC("607ad78179ef4d0004bfc026", grade)) // Сюда первым параметром нужно будет передать id текущей карточки, чтобы пошол запрос на сервак
    }

    return (
        <div className={s.learnBlock}>
            <span>Question</span>
            <div>
                <button onClick={sendGrade} data-grade={1} disabled={serverAnswerStatus}>1</button>
                <button onClick={sendGrade} data-grade={2} disabled={serverAnswerStatus}>2</button>
                <button onClick={sendGrade} data-grade={3} disabled={serverAnswerStatus}>3</button>
                <button onClick={sendGrade} data-grade={4} disabled={serverAnswerStatus}>4</button>
                <button onClick={sendGrade} data-grade={5} disabled={serverAnswerStatus}>5</button>
            </div>
            {editMode && <span>Answer</span>}
            <button onClick={() => setEditMode(true)}>Show answer</button>
        </div>
    )
}