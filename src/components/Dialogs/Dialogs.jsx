import React from 'react';
import styles from './Dialogs.module.scss';
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {addMessageAction, updateMessageTextAction} from "../../State/State";


export const Dialogs = ({dialogPage, dispatch}) => {
    const addMessage = () => {
        return dispatch(addMessageAction())
    }
    const handleChange = (e) => {
        return dispatch(updateMessageTextAction(e.target.value))
    }
    return (
        <div className={styles.dialogsWrapper}>
            <h2>Dialogs</h2>
            <div className={styles.dialogs}>
                <div className={styles.dialogItems}>
                    {dialogPage.dialogsData.map(({id, name}) => <DialogItem id={id} name={name} key={id}/>)}
                </div>
                <div className={styles.dialogMessages}>
                    {dialogPage.messagesData.map(({id, text}) => <Message text={text} key={id}/>)}
                </div>
                <div>
                    <textarea name="" id="" cols="30" rows="10" value={dialogPage.newMessageText}
                              onChange={handleChange}></textarea>
                    <button onClick={addMessage}>Send</button>
                </div>
            </div>
        </div>
    );
};
