import React, { FC } from 'react'
import { Field, Form, Formik } from 'formik'
import '../../styles/forms.module.scss'
import styles from './login.module.scss'

type LoginFormPropsType = {
  captureUrl: string
  loginUser: (values: {
    email: string
    password: string
    capture: string
  }) => void
}

export const LoginForm: FC<LoginFormPropsType> = ({
  loginUser,
  captureUrl,
}) => {
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
          onSubmit={loginUser}>
          <Form>
            <label htmlFor="email">Email</label>
            <Field id="email" name="email" type="email" />
            <label htmlFor="password">Password</label>
            <Field id="password" name="password" type="password" />
            {captureUrl && <img src={captureUrl} alt="capture" />}
            {captureUrl && (
              <>
                <label htmlFor="capture">Capture</label>
                <Field id="capture" name="capture" type="text" />
              </>
            )}
            <button type="submit">Log in</button>
          </Form>
        </Formik>
      </div>
    </div>
  )
}
