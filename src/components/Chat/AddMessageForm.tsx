import React, {FC} from "react";
import {useSelector} from "react-redux";
import {getWsStatus} from "../../State/selectors/chatSelectors";
import {sendMessage} from "../../State/reducers/chatReducer";
import styles from "./Chat.module.scss";
import {Field, Form, Formik} from "formik";

export const AddMessageForm: FC = () => {
    const status = useSelector(getWsStatus)
    const sendMessageHandler = (values) => {
        sendMessage(values)
    }
    return <div className={styles.formChat}>
        <Formik
            initialValues={{
                message: '',
            }}
            onSubmit={sendMessageHandler}
            enableReinitialize={true}
        >
            <Form className={styles.form}>
                <Field
                    id="message"
                    name="message"
                    type="text"
                    placeholder="message text"
                    as="textarea"
                />
                <button type="submit" disabled={status !== 'ready'}>Send</button>
            </Form>
        </Formik>
    </div>
}