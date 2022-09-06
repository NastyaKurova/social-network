import React, { FC, useState } from 'react'
import styles from './UserInfo.module.scss'
import { ContactsProfileType, ProfileDataType } from '../../../types/types'
import { ProfileForm } from './ProfileForm'

type UserDataPropsType = {
  profile: ProfileDataType
  isOwner: boolean
  saveProfile: (data: ProfileDataType) => void
}
export const UserData: FC<UserDataPropsType> = ({
  profile,
  isOwner,
  saveProfile,
}) => {
  const contactsNames = Object.keys(profile.contacts)
  const [editMode, setEditMode] = useState(false)
  const activateEditMode = () => {
    setEditMode(true)
  }
  return (
    <div className={styles.userData}>
      {isOwner && !editMode ? (
        <button className={styles.editButton} onClick={activateEditMode}>
          Edit
        </button>
      ) : null}
      {editMode ? (
        <ProfileForm
          profile={profile}
          saveProfile={saveProfile}
          setEditMode={setEditMode}
        />
      ) : (
        <UserText profile={profile} contactsNames={contactsNames} />
      )}
    </div>
  )
}

type ContactsPropsType = {
  contacts: ContactsProfileType
  name: string
}

export const Contacts: FC<ContactsPropsType> = ({ contacts, name }) => {
  return (
    <div className={styles.userDataItem}>
      <span>{name}: </span> <span>{contacts[name]}</span>
    </div>
  )
}

type UserTextPropsType = {
  profile: ProfileDataType
  contactsNames: string[]
}
export const UserText: FC<UserTextPropsType> = ({ profile, contactsNames }) => {
  return (
    <>
      <div className={styles.userDataItem}>
        <strong>Full name: </strong>
        {profile.fullName}
      </div>
      <div className={styles.userDataItem}>
        <strong>About me: </strong>
        {profile.aboutMe}
      </div>
      <div className={styles.userDataItem}>
        <strong>Job description: </strong>
        {profile.lookingForAJobDescription}
      </div>
      <div className={styles.userDataItem}>
        <strong>Contacts: </strong>
        <div className={styles.userDataContacts}>
          {contactsNames.map((name, index) => (
            <Contacts key={index} contacts={profile.contacts} name={name} />
          ))}
        </div>
      </div>
    </>
  )
}
