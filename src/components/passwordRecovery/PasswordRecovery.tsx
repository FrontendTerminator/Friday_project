import React, {ChangeEvent, useState} from 'react';
import { useDispatch } from 'react-redux';
import s from './PasswordRecovery.module.css'
import {passwordRecoveryTC} from "./passwordRecoveryReducer";


export const PasswordRecovery = () => {

    const dispatch = useDispatch()

    const [inputValue, setInputValue] = useState<string>("")

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }
    const onButtonClick = () => {
        dispatch(passwordRecoveryTC(inputValue))
    }

    return (
        <div className={s.pageBlock}>
            <div>password recovery</div>
            <input type="text"
                   placeholder={'your email'}
                   onChange={onInputChange}
                   value={inputValue}
            />
            <button onClick={onButtonClick}>send</button>
        </div>
    )
}