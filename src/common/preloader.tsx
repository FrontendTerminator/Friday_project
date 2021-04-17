import React from 'react';
import preloader from "../images/tms-loading.gif";
import s from './preloader.module.css'
import {LinearProgress} from "@material-ui/core";

const Preloader = ()=>{
    return<div className={s.preloader}>
        <LinearProgress  />
        {/*<img src={preloader} alt={'Preloader'}/>*/}
    </div>
}
export default  Preloader;