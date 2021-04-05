import React from 'react';
import preloader from "../images/tms-loading.gif";
import s from './preloader.module.css'

const Preloader = ()=>{
    return<div className={s.preloader}>
        <img src={preloader} alt={'Preloader'}/>
    </div>
}
export default  Preloader;