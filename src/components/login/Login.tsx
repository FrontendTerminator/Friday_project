import React, {ChangeEvent, useState} from 'react'
import style from './Login.module.css'
import SuperButton1 from "../superComponents/c2-SuperButton/SuperButton1";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {NavLink, Redirect} from "react-router-dom";
import {PATH} from "../../App";
import {signIn} from "./auth-reducer";
import Preloader from "../../common/preloader";

export type AuthDataType = {
    email: string
    password: string
    rememberMe: boolean
}

export const Login = () => {
    const [formData, setFormData] = useState<AuthDataType>({email: '', password: '', rememberMe: false})
    const dispatch = useDispatch()

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.currentTarget
        const value = target.type === 'checkbox' ? target.checked : target.value
        setFormData({...formData, [target.name]: value})
    }

    const clickHandler = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        dispatch(signIn(formData))
    }

    const isLoading = useSelector<AppRootStateType, boolean>(state => state.auth.isLoading)
    const error = useSelector<AppRootStateType, null | string>(state => state.auth.error)
    const isAuthSuccess = useSelector<AppRootStateType, boolean>(state => state.auth.isAuthSuccess)

    return (
        <>
            {isAuthSuccess
                ? <Redirect to={PATH.profile}/>
                : <form name="login" className={style.container}>
                    {isLoading
                        ? <div>
                            <div className={style.loading}>Loading...</div>
                            <Preloader/>
                        </div>
                        : <>
                            <h3>Sign in</h3>
                            <input name='email'
                                   type="text"
                                   placeholder='email'
                                   className={style.input}
                                   onChange={changeHandler}
                            />
                            <input name='password'
                                   type="password"
                                   placeholder='password'
                                   className={style.input}
                                   onChange={changeHandler}
                            />
                            {error && <span className={style.error}>{error}</span>}
                            <div>
                                <input name='rememberMe'
                                       type="checkbox"
                                       className={style.checkbox}
                                       onChange={changeHandler}
                                />
                                <span>Remember me</span>
                            </div>
                            <SuperButton1 onClick={clickHandler}
                                          className={style.button}
                                          disabled={isLoading}
                            >
                                Sign in
                            </SuperButton1>
                            <NavLink to={PATH.passwordRecovery}>Forgot Password?</NavLink>
                            <NavLink to={PATH.registration}>Sign up</NavLink>
                        </>
                    }
                </form>
            }
        </>
    )
}