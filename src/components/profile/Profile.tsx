import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {authMe, signOut, UserDataType} from "../login/auth-reducer";
import {AppRootStateType} from "../../store/store";
import {Redirect} from "react-router-dom";
import {PATH} from "../../App";
import SuperButton1 from "../superComponents/c2-SuperButton/SuperButton1";
import style from './Profile.module.css'
import Preloader from "../../common/preloader";

export const Profile = () => {

    const dispatch = useDispatch()

    const clickHandler = () => {
        dispatch(signOut())
    }

    const isAuth = useSelector<AppRootStateType, boolean>(state => state.auth.isAuthSuccess)

    const userData = useSelector<AppRootStateType, UserDataType>(state => state.auth.userData)

    const isLoading = useSelector<AppRootStateType, boolean>(state => state.auth.isLoading)

    useEffect(() => {
        dispatch(authMe())
    }, [dispatch])

    return (
        <>
            {isAuth
                ? <div className={style.container}>
                    {isLoading
                        ? <div>
                            <div className={style.loading}>Loading...</div>
                            <Preloader/>
                        </div>
                        : <>
                            <p>Avatar: {userData.avatar}</p>
                            <p>Name: {userData.name}</p>
                            <p>Email: {userData.email}</p>
                            <p>Card packs: {userData.publicCardPacksCount}</p>
                            <SuperButton1 onClick={clickHandler}>Sign out</SuperButton1>
                        </>
                    }
                </div>

                : <Redirect to={PATH.login}/>
            }
        </>
    )
}