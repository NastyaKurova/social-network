import React, {FC, useEffect} from 'react';
import styles from "./Chat.module.scss";
import {startMessageListening, stopMessageListening} from "../../State/reducers/chatReducer";
import {useDispatch, useSelector} from "react-redux";
import {getWsStatus} from "../../State/selectors/chatSelectors";
import {Dispatch} from "redux";
import {AddMessageForm} from "./AddMessageForm";
import {Messages} from "./Messages";
import {Navigate} from "react-router-dom";
import {getAuthUserId} from "../../State/selectors/profileSelectors";

const ChatPage: FC = () => {
    const authUserId = useSelector(getAuthUserId)

    if (!authUserId) return <Navigate to={"/login"}/>

    return <div className={styles.chat}>
        <h1>Chat</h1>
        <Chat/>
    </div>
}

const Chat: FC = () => {
    const status = useSelector(getWsStatus)
    const dispatch: Dispatch<any> = useDispatch()

    useEffect(() => {
        dispatch(startMessageListening())
        return () => {
            dispatch(stopMessageListening())
        }
    }, [dispatch])

    return <div>
        {status === 'error' ? <div>Some error</div> : null}
        <Messages/>
        <AddMessageForm/>

    </div>
}


export default ChatPage