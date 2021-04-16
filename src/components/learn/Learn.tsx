import React, {useState} from 'react'
import s from './Learn.module.css'

export const Learn = () => {

    const [editMode, setEditMode] = useState(false)

    const kobaApiThunk = () => {

    }

    return (
        <div className={s.learnBlock}>
            <span>Question</span>
            <div>
                <button>1</button>
                <button>2</button>
                <button>3</button>
                <button>4</button>
                <button>5</button>
            </div>
            {editMode && <span>Answer</span>}
            <button onClick={() => setEditMode(true)}>Show answer</button>
        </div>
    )
}