import React, {FC} from 'react';
import styles from './DialogItem.module.scss';
import {NavLink} from "react-router-dom";

type DialogItemPropsType = {
    id: number, name: string
}
export const DialogItem: FC<DialogItemPropsType> = ({id, name}) => {
    return <div className={styles.dialogItem + " " + styles.dialogItemActive}>
        <NavLink to={`/dialogs/${id}`}> {name}</NavLink></div>
}