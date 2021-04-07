import React, {useEffect, useState} from 'react';
import s from './Registration.module.css'
import SuperInputText from "../superComponents/c1-SuperInputText/SuperInputText";
import SuperButton from "../superComponents/c2-SuperButton/SuperButton1";
import {useDispatch, useSelector} from "react-redux";
import {registerTC, registrIsAuthTC, setErrorAC, TypeStatus} from "./registrationReducer";
import {AppRootStateType} from "../../store/store";
import {NavLink, Redirect} from "react-router-dom";
import {PATH} from "../../App";
import Preloader from "../../common/preloader";
import style from "../login/Login.module.css";

export const Registration = () => {
    const [emailValue, setEmailValue] = useState<string>('')
    const [passwordOneValue, setPasswordOneValue] = useState<string>('')
    const [passwordTwoValue, setPasswordTwoValue] = useState<string>('')
    const dispatch = useDispatch()
    const status = useSelector<AppRootStateType, TypeStatus>(state => state.register.status)
    const isRegister = useSelector<AppRootStateType, boolean>(state => state.register.isRegister)
    const error = useSelector<AppRootStateType, string>(state => state.register.error)
    useEffect(()=>{
        dispatch(registrIsAuthTC())
    },[dispatch])

    const onChangeTextEmail = (value: string) => {
        setEmailValue(value)
    }
    const onChangePasswordOne = (value: string) => {
        setPasswordOneValue(value)
    }
    const onChangePasswordTwo = (value: string) => {
        setPasswordTwoValue(value)
    }

    const sendForm = () => {
        if (passwordOneValue !== passwordTwoValue) {
            dispatch(setErrorAC('Password confirmation does not match'))
            return
        }

        dispatch(registerTC(emailValue, passwordOneValue))
    }

    return <>
        {isRegister && <Redirect to={PATH.profile}/>}
        <div className={s.container}>
            {status === "loading" ? <Preloader/> :
                <div>
                    <h3>Registration</h3>
                    <form className={s.form}>
                        <div>

                            <SuperInputText  className={style.input}   placeholder='email' onChangeText={onChangeTextEmail}
                                            value={emailValue}/>
                        </div>
                        <div>

                            <SuperInputText type={'password'}    placeholder='password'  className={style.input} onChangeText={onChangePasswordOne}
                                            value={passwordOneValue}/>
                        </div>
                        <div>
                            <SuperInputText type={'password'}   placeholder='password'  className={style.input} onChangeText={onChangePasswordTwo}
                                            value={passwordTwoValue}/>
                        </div>

                        <div className={s.button}>
                            <SuperButton onClick={sendForm}>Register</SuperButton>
                        </div>

                        <div className={s.error}>
                            {error}
                        </div>
                    </form>

                </div>}
          <div className={s.signIn}>
              <NavLink to={PATH.login}>Sign in</NavLink>
          </div>

        </div>
    </>


}