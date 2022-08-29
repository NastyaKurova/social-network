import React, {FC} from 'react';
// @ts-ignore
import styles from "./Message.module.scss";

type MessagePropsType = { text: string }

export const Message: FC<MessagePropsType> = ({text}) => {
    return <div className={styles.messageItem}>{text}</div>
}