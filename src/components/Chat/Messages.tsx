import React, {FC, useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {getChatMessages} from "../../State/selectors/chatSelectors";
import {ChatMessageType} from "../../types/types";
import styles from "./Chat.module.scss";

export const Messages: FC = () => {
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
    }, [messages, isAutoScroll])

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