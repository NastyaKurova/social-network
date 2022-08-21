import React from 'react';
import styles from './Dialogs.module.scss';
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {DialogsForm} from "./DialogsForm";


export const Dialogs = ({dialogsData, messagesData, addMessage}) => {

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
                    <DialogsForm addMessage={addMessage}/>
                </div>
            </div>
        </div>
    );
};
