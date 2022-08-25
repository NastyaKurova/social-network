import React from 'react';
import {Field, Form, Formik} from "formik";
import "../forms.module.scss";
import styles from "./login.module.scss";

export const LoginForm = ({loginUser, captureUrl}) => {
    return (
        <div>
            <h1 className={styles.loginHeader}>Log in</h1>
            <div className={styles.loginForm}>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                        capture: '',
                    }}
                    onSubmit={(values) => loginUser(values)}
                >
                    <Form>
                        <label htmlFor="email">Email</label>
                        <Field id="email" name="email" type="email"
                        />
                        <label htmlFor="password">Password</label>
                        <Field id="password" name="password" type="password"/>
                        {captureUrl && <img src={captureUrl} alt="capture"/>}
                        {captureUrl && <>
                            <label htmlFor="capture">Capture</label>
                            <Field id="capture" name="capture" type="text"/>
                        </>}
                        <button type="submit">Log in</button>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}