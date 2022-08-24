import React from 'react';
import {Field, Form, Formik} from "formik";
import "../forms.module.scss";
import styles from "./login.module.scss";

export const LoginForm = ({loginUser}) => {
    return (
        <div>
            <h1 className={styles.loginHeader}>Log in</h1>
            <div className={styles.loginForm}>


                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    onSubmit={(values) => loginUser(values)}
                >
                    <Form>
                        <label htmlFor="email">Email</label>
                        <Field
                            id="email"
                            name="email"
                            placeholder="jane@acme.com"
                            type="email"
                        />
                        <label htmlFor="password">Password</label>
                        <Field id="password" name="password" type="password"/>
                        <button type="submit">Log in</button>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}