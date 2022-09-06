import { ProfileDataType } from '../../../types/types'
import React, { FC } from 'react'
import { Field, Form, Formik } from 'formik'

type ProfileFormPropsType = {
  profile: ProfileDataType
  saveProfile: (data: ProfileDataType) => void
  setEditMode: (value: boolean) => void
}
export const ProfileForm: FC<ProfileFormPropsType> = ({
  profile,
  saveProfile,
  setEditMode,
}) => {
  const onsubmitForm = values => {
    values.contacts = {
      github: values.github,
      website: values.website,
    }
    saveProfile(values)
    setEditMode(false)
  }
  return (
    <div>
      <Formik
        initialValues={{
          fullName: profile?.fullName || '',
          aboutMe: profile?.aboutMe || '',
          lookingForAJobDescription: profile?.lookingForAJobDescription || '',
          github: profile?.contacts.github || '',
          website: profile?.contacts.website || '',
        }}
        onSubmit={values => onsubmitForm(values)}>
        <Form>
          <label htmlFor="fullName">Full name </label>
          <Field id="fullName" name="fullName" type="text" />

          <label htmlFor="aboutMe">About me</label>
          <Field id="aboutMe" name="aboutMe" type="text" />

          <label htmlFor="lookingForAJobDescription">Job description</label>
          <Field
            id="lookingForAJobDescription"
            name="lookingForAJobDescription"
            type="text"
          />

          <label htmlFor="github">Github</label>
          <Field id="github" name="github" type="text" />

          <label htmlFor="website">Resumes</label>
          <Field id="website" name="website" type="text" />

          <button type="submit">Save</button>
        </Form>
      </Formik>
    </div>
  )
}
