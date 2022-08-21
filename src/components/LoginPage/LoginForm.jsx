import React from 'react';
import {Field, Form, Formik} from "formik";

export const LoginForm = ({loginUser}) => {
    return (
        <div>
            <h1>Log in</h1>
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
    )
}