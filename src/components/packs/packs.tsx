import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getPackTC} from "./paskReducer";
import {TypeResponsePacks} from "../../api/auth-api";
import {AppRootStateType} from "../../store/store";
import {TypeStatus} from "../registration/registrationReducer";
import Preloader from "../../common/preloader";
import s from "../registration/Registration.module.css";

const Packs = () => {
    const dispatch = useDispatch()
    const status = useSelector<AppRootStateType, TypeStatus>(state => state.packs.status)
    const error = useSelector<AppRootStateType, string>(state => state.packs.error)
    const packs = useSelector<AppRootStateType, TypeResponsePacks | null>(state => state.packs.packs)
    useEffect(() => {
        dispatch(getPackTC())
    }, [dispatch])
    return <>
        {status === "loading" ? <Preloader/> :
            <div>
                Count Packs :{packs && packs.cardPacksTotalCount}
                Packs : {packs && packs.cardPacks.map(pack => {
                return <div>
                    {pack.name}
                </div>
            })}
                <div style={{color:'red'}}>
                    {error}
                </div>
            </div>

        }

    </>
}

export default Packs;
