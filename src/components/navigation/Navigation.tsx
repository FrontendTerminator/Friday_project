import React from 'react';
import {NavLink} from 'react-router-dom';
import s from "./Navigation.module.css"

export const Navigation = () => {
    return (
        <div className={s.navigationBlock}>
            <NavLink to={"/login"}>login</NavLink>
            <NavLink to={"/registration"}>registration</NavLink>
            <NavLink to={"/profile"}>profile</NavLink>
            <NavLink to={"/page404"}>page 404</NavLink>
            <NavLink to={"/passwordRecovery"}>password recovery</NavLink>
            <NavLink to={"/newPassword"}>new password</NavLink>
            <NavLink to={"/testPage"}>test page</NavLink>
        </div>
    )
}