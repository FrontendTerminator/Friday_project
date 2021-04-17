import React from 'react';
import {NavLink} from 'react-router-dom';
import s from "./Navigation.module.css"
import {PATH} from "../../App";

export const Navigation = () => {
    return (
        <div className={s.navigationBlock}>
            <NavLink to={PATH.login}>login</NavLink>
            <NavLink to={PATH.registration}>registration</NavLink>
            <NavLink to={PATH.profile}>profile</NavLink>
            <NavLink to={PATH.page404}>page 404</NavLink>
            <NavLink to={PATH.passwordRecovery}>password recovery</NavLink>
            <NavLink to={PATH.newPassword}>new password</NavLink>
            <NavLink to={PATH.packs}>Packs</NavLink>
            <NavLink to={PATH.testPage}>test page</NavLink>
        </div>
    )
}