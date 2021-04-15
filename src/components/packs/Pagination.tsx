import React, {MouseEvent} from 'react';
import {useDispatch, useSelector} from "react-redux";
import s from "./packs.module.css";
import {getPackTC, setPageAC} from "./paskReducer";
import {AppRootStateType} from "../../store/store";


const Pagination = ()=>{
    const dispatch = useDispatch()
    const page = useSelector<AppRootStateType,number>(state => state.packs.page)
    const clickPage = (event:MouseEvent<HTMLButtonElement>)=>{
        dispatch(setPageAC(+event.currentTarget.innerHTML))
        dispatch(getPackTC())
    }
const arr = [];
    for (let i = 1; i <= 10; i++) {
        arr.push(i)
    }
    return (
        <div>
            <span style={{fontWeight:'bold'}}>Pages:</span>   {arr.map((pages,id)=>{
               return <span key={id}  className={`${page-1===id ? s.active:""} ${s.page}` } onClick={clickPage }  >{pages}</span>
            })}
        </div>
    )
}

export default Pagination;