import React from 'react';
import styles from "./Message.module.scss";


export const Message=({text})=>{
    return  <div className={styles.messageItem}>{text}</div>
}