import React from 'react';
import styles from './Dialogs.module.scss';
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";


export const Dialogs = ({dialogsData, messagesData, newMessageText, addMessage, onMessageChange}) => {
    const handleChange = (e) => {
        return onMessageChange(e.target.value)
    }

    return (
        <div className={styles.dialogsWrapper}>
            <h2>Dialogs</h2>
            <div className={styles.dialogs}>
                <div className={styles.dialogItems}>
                    {dialogsData.map(({id, name}) => <DialogItem id={id} name={name} key={id}/>)}
                </div>
                <div className={styles.dialogMessages}>
                    {messagesData.map(({id, text}) => <Message text={text} key={id}/>)}
                </div>
                <div>
                    <textarea name="" id="" cols="30" rows="10" value={newMessageText}
                              onChange={handleChange}></textarea>
                    <button onClick={addMessage}>Send</button>
                </div>
            </div>
        </div>
    );
};
