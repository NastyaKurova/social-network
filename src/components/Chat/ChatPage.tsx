import React, {FC, useEffect, useRef, useState} from 'react';
import {Field, Form, Formik} from "formik";
import styles from "./Chat.module.scss";
import {ChatMessageType} from "../../types/types";
import {sendMessage, startMessageListening, stopMessageListening} from "../../State/reducers/chatReducer";
import {useDispatch, useSelector} from "react-redux";
import {getChatMessages, getWsStatus} from "../../State/selectors/chatSelectors";
import {Dispatch} from "redux";

const ChatPage: FC = () => {
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
            console.log('leave')
            dispatch(stopMessageListening())
        }
    }, [])

    return <div>
        {status === 'error' ? <div>Some error</div> : null}
        <Messages/>
        <AddMessageForm/>

    </div>
}

const Messages: FC = () => {
    const messages = useSelector(getChatMessages)
    const messagesRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setAutoScroll] = useState(true)
    const scrollHandler = (e) => {
        const element = e.currentTarget
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.scrollHeight) < 300) {
            !isAutoScroll && setAutoScroll(true)
        } else {
            isAutoScroll && setAutoScroll(false)
        }
    }
    useEffect(() => {
        if (isAutoScroll) {
            messagesRef.current?.scrollIntoView({behavior: "smooth"})
        }
    }, [messages])

    return <div onScroll={scrollHandler}>
        {messages.map((message, index) => <Message key={index} message={message}/>)}
        <div ref={messagesRef}></div>
    </div>
}

const Message: FC<{ message: ChatMessageType }> = React.memo(({message}) => {
    return <div className={styles.message}>
        <div className={styles.messageSender}>
            <img src={message.photo} alt=""/>
            <span className={styles.messageSenderName}>{message.userName}</span>
        </div>
        <div className={styles.messageText}>{message.message}</div>
    </div>

})

const AddMessageForm: FC = () => {
    const status = useSelector(getWsStatus)
    const sendMessageHandler = (values) => {
        sendMessage(values)
    }
    return <div className={styles.form}>
        <Formik
            initialValues={{
                message: '',
            }}
            onSubmit={sendMessageHandler}
            enableReinitialize={true}
        >
            <Form>
                <Field
                    id="message"
                    name="message"
                    type="text"
                    placeholder="message text"
                />
                <button type="submit" disabled={status !== 'ready'}>Send</button>
            </Form>
        </Formik>
    </div>
}

export default ChatPage