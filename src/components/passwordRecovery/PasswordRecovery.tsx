import React, {ChangeEvent, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import s from './PasswordRecovery.module.css'
import {passwordRecoveryTC, ServerRequestStatusType, setErrorAC} from "./passwordRecoveryReducer";
import {AppRootStateType} from "../../store/store";
import {Redirect} from "react-router-dom";
import {PATH} from "../../App";
import Preloader from "../../common/preloader";


export const PasswordRecovery = () => {

    const [inputValue, setInputValue] = useState<string>("")

    const dispatch = useDispatch()
    const error = useSelector<AppRootStateType, string>(state => state.passwordRecovery.error)
    const serverResponseStatus = useSelector<AppRootStateType, boolean>(state => state.passwordRecovery.serverResponseStatus)
    const serverRequestStatus = useSelector<AppRootStateType, ServerRequestStatusType>(state => state.passwordRecovery.serverRequestStatus)

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }

    const OnButtonClick = () => {
        let validator = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (validator.test(inputValue) == false) {
            dispatch(setErrorAC('Please, enter correct email'))
        } else {
            const currentPageDomain = window.location.host
            dispatch(passwordRecoveryTC(inputValue, currentPageDomain))
        }
    }

    return (
        <>
            {serverResponseStatus && <Redirect to={PATH.newPassword}/>}
            <div className={s.pageBlock}>
                {serverRequestStatus === 'active'
                    ? <Preloader/>
                    : <div className={s.secondBlock}>
                        <h3>Password recovery</h3>
                        <input type="text"
                               placeholder={'your email'}
                               onChange={onInputChange}
                               value={inputValue}
                               className={s.input}
                        />
                        <div className={s.error}>{error}</div>
                        <button onClick={OnButtonClick}>send</button>
                    </div>
                }
            </div>
        </>
    )
}