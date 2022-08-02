import React from 'react';
import styles from './DialogItem.module.scss';
import {NavLink} from "react-router-dom";


export const DialogItem=({id, name})=>{
    return  <div className={styles.dialogItem +" "+styles.dialogItemActive}>
        <NavLink to={`/dialogs/${id}`}> {name}</NavLink></div>
}