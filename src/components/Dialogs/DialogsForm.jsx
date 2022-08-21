import React from 'react';
import {Field, Form, Formik} from "formik";


export const DialogsForm = ({addMessage}) => {
    return (
        <Formik
            initialValues={{
                dialogsText: '',
            }}
            onSubmit={addMessage}
        >
            <Form>
                <Field
                    as="textarea"
                    id="dialogsText"
                    name="dialogsText"
                    placeholder="text"
                    type="text"
                />
                <button type="submit">Add Message</button>
            </Form>
        </Formik>
    )
}