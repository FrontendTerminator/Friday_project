import React, {
    MouseEvent,
    ChangeEvent,
    useEffect,
    useState
} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deletePackTC, getPackTC, setPackTC, updatePackTC} from "./paskReducer";
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
    const [packValue,setPackValue] = useState<string>('')
    const [modal,setModal] = useState<boolean>(false)
    const addPack = () => {
        setModal(true)

    }
    const setPack = ()=>{
        dispatch(setPackTC(packValue))
        setModal(false)

    }
    const deletePack = (event: MouseEvent<HTMLButtonElement>) => {
        dispatch(deletePackTC(event.currentTarget.dataset.id))
    }
    const updatePack = (event:MouseEvent<HTMLButtonElement>) => {
        dispatch(updatePackTC(event.currentTarget.dataset.id))
    }
    const changeValuePack = (event:ChangeEvent<HTMLInputElement>)=>{
        setPackValue(event.currentTarget.value)
    }
    useEffect(() => {
        dispatch(getPackTC())
    }, [dispatch])

    return <>
        <div style={{color: 'red'}}>{error && error}</div>
        <div className={modal?s.popup:s.hide}  >
            <div className={s.popupContent}>
                <input value={packValue} onChange={changeValuePack} type="text"/>
                <SuperButton1 onClick={setPack}>Add</SuperButton1>
            </div>
        </div>
        {status === "loading" ? <Preloader/> :

            <div className={s.table}>

                <div className={s.header}>
                    <div className={s.cell}>Name</div>
                    <div className={s.cell}>Cards count</div>
                    <div className={s.cell}>Updated</div>
                    <div className={s.cell}>Url</div>
                    <div className={s.cell}>
                        <button onClick={addPack}>Add</button>
                    </div>
                </div>
                <div className={s.gridTable}>
                    {packs && packs.cardPacks && packs.cardPacks.map((cardPack: TypeCards) => {
                            return (
                                <div className={s.tableRow} key={cardPack.updated}>
                                    <div className={s.cell}>{cardPack.name}</div>
                                    <div className={s.cell}>{cardPack.cardsCount}</div>
                                    <div className={s.cell}>{cardPack.updated}</div>
                                    <div className={s.cell}>{cardPack.path}</div>
                                    <div className={s.cell}>
                                        <button data-id={cardPack._id} onClick={deletePack}>Delete</button>
                                        <button data-id={cardPack._id} onClick={updatePack}>Update</button>
                                        <a href="">Cards</a>
                                    </div>
                                </div>
                            )
                        }
                    )
                    }
                </div>

            </div>
        }  </>
}

export default Packs;
