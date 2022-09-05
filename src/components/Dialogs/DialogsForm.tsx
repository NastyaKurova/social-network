import React, { FC } from 'react'
import { Field, Form, Formik } from 'formik'

type DialogsPropsType = {
  addMessage: (data: { dialogsText: string }) => void
}
export const DialogsForm: FC<DialogsPropsType> = ({ addMessage }) => {
  return (
    <Formik
      initialValues={{
        dialogsText: '',
      }}
      onSubmit={addMessage}>
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
