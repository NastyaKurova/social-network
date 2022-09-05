import React, {FC} from 'react';
import styles from './Dialogs.module.scss';
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {DialogsForm} from "./DialogsForm";
import {DialogsDataType, MessagesDataType} from "../../types/types";
import {useDispatch, useSelector} from "react-redux";
import {getDialogsData, getMessagesData} from "../../State/selectors/dialogSelectors";
import {actions} from "../../State/reducers/dialogsReducer";


const DialogsPage: FC = () => {
    const dispatch = useDispatch()
    const sendMessage = (values: { dialogsText: string }) => {
        dispatch(actions.addMessage(values))
    }
    const dialogsData: DialogsDataType[] = useSelector(getDialogsData)
    const messagesData: MessagesDataType[] = useSelector(getMessagesData)
    return (
        <div className={styles.dialogsWrapper}>
            <h2>Dialogs</h2>
            <div className={styles.dialogs}>
                <div>
                    {dialogsData.map(({id, name}) => <DialogItem id={id} name={name} key={id}/>)}
                </div>
                <div>
                    {messagesData.map(({id, text}) => <Message text={text} key={id}/>)}
                </div>
                <div>
                    <DialogsForm addMessage={sendMessage}/>
                </div>
            </div>
        </div>
    );
};
export default DialogsPage