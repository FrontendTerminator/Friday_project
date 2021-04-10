import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getPackTC} from "./paskReducer";
import {TypeCards, TypeResponsePacks} from "../../api/auth-api";
import {AppRootStateType} from "../../store/store";
import {TypeStatus} from "../registration/registrationReducer";
import Preloader from "../../common/preloader";
import s from "./packs.module.css";
import SuperButton1 from "../superComponents/c2-SuperButton/SuperButton1";

const Packs = () => {
    const dispatch = useDispatch()
    const status = useSelector<AppRootStateType, TypeStatus>(state => state.packs.status)
    const error = useSelector<AppRootStateType, string>(state => state.packs.error)
    const packs = useSelector<AppRootStateType, TypeResponsePacks | null>(state => state.packs.packs)
    const cardPacks = useSelector<AppRootStateType, TypeCards[] | undefined>(state => state.packs.packs?.cardPacks)

    useEffect(() => {
        dispatch(getPackTC())
    }, [dispatch])

    return <>
        {status === "loading" ? <Preloader/> :
            <div>
                Count Packs : {packs && packs.cardPacksTotalCount}
                Packs : {packs && packs.cardPacks.map(pack => {
                return <div>{pack.name}</div>
            })}
                <div style={{color: 'red'}}>
                    {error}
                </div>
            </div>
        }
        Table
        <div className={s.table}>
            <div className={s.header}>
                <div className={s.cell}>Name</div>
                <div className={s.cell}>Cards count</div>
                <div className={s.cell}>Updated</div>
                <div className={s.cell}>Url</div>
                <div className={s.cell}>
                    <button>Add</button>
                </div>
            </div>
            <div className={s.gridTable}>
                {cardPacks && cardPacks.map((cardPack: TypeCards) => {
                        return (
                            <div className={s.tableRow}>
                                <div className={s.cell}>{cardPack.name}</div>
                                <div className={s.cell}>{cardPack.cardsCount}</div>
                                <div className={s.cell}>{cardPack.updated}</div>
                                <div className={s.cell}>{cardPack.path}</div>
                                <div className={s.cell}>
                                    <button>Delete</button>
                                    <button>Update</button>
                                    <a href="">Cards</a>
                                </div>
                            </div>
                        )
                    }
                )
                }
            </div>
        </div>
    </>
}

export default Packs;
