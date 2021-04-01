import React from 'react';
import kot from './../../images/kot.jpg'
import s from './Page404.module.css'

export const Page404 = () => {

    const photo404 = {
        backgroundImage: `url(${kot})`
    }

    return (
        <div className={s.mainBlock}>
            <h2>Page not found 404</h2>
            <div style={photo404} className={s.image}></div>
        </div>
    )
}