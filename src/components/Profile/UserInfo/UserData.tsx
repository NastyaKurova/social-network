import React, {FC, useState} from 'react';
// @ts-ignore
import styles from "./UserInfo.module.scss";
import {Field, Form, Formik} from "formik";
import {ContactsProfileType, ProfileDataType} from "../../../types/types";

type UserDataPropsType = {
    profile: ProfileDataType,
    isOwner: boolean,
    saveProfile: (data: ProfileDataType) => void
}
export const UserData: FC<UserDataPropsType> = ({profile, isOwner, saveProfile}) => {
    const contactsNames = Object.keys(profile.contacts)
    const [editMode, setEditMode] = useState(false);
    const activateEditMode = () => {
        setEditMode(true)
    }
    return (
        <div className={styles.userData}>

            {isOwner && !editMode ?
                <button className={styles.editButton} onClick={activateEditMode}>Edit</button> : null}
            {editMode ? <UserForm profile={profile} saveProfile={saveProfile} setEditMode={setEditMode}/> :
                <UserText profile={profile} contactsNames={contactsNames}/>}
        </div>
    )
}

type ContactsPropsType = {
    contacts: ContactsProfileType,
    name: string
}

export const Contacts: FC<ContactsPropsType> = ({contacts, name}) => {
    return <div className={styles.userDataItem}>
        <span>{name}: </span> <span>{contacts[name]}</span>
    </div>
}

type UserTextPropsType = {
    profile: ProfileDataType,
    contactsNames: string[]
}
export const UserText:FC<UserTextPropsType> = ({profile, contactsNames}) => {
    return (
        <>
            <div className={styles.userDataItem}><strong>Full name: </strong>{profile.fullName}</div>
            <div className={styles.userDataItem}><strong>About me: </strong>{profile.aboutMe}</div>
            <div className={styles.userDataItem}><strong>Job description: </strong>{profile.lookingForAJobDescription}
            </div>
            <div className={styles.userDataItem}><strong>Contacts: </strong>
                <div className={styles.userDataContacts}>
                    {
                        contactsNames.map((name, index) => <Contacts key={index} contacts={profile.contacts}
                                                                     name={name}/>)
                    }
                </div>
            </div>
        </>
    )
}

type UserFormPropsType = {
    profile: ProfileDataType,
    saveProfile: (data: ProfileDataType) => void,
    setEditMode:(value:boolean)=>void
}
export const UserForm:FC<UserFormPropsType> = ({profile, saveProfile, setEditMode}) => {
    const onsubmitForm = (values) => {
        values.contacts = {
            github: values.github,
            website: values.website
        }
        saveProfile(values)
        setEditMode(false)
    }
    return <div>
        <Formik
            initialValues={{
                fullName: profile?.fullName || '',
                aboutMe: profile?.aboutMe || '',
                lookingForAJobDescription: profile?.lookingForAJobDescription || '',
                github: profile?.contacts.github || '',
                website: profile?.contacts.website || '',
            }}
            onSubmit={(values) => onsubmitForm(values)}
        >
            <Form>
                <label htmlFor="fullName">Full name </label>
                <Field id="fullName" name="fullName" type="text"/>

                <label htmlFor="aboutMe">About me</label>
                <Field id="aboutMe" name="aboutMe" type="text"/>

                <label htmlFor="lookingForAJobDescription">Job description</label>
                <Field id="lookingForAJobDescription" name="lookingForAJobDescription" type="text"/>

                <label htmlFor="github">Github</label>
                <Field id="github" name="github" type="text"/>

                <label htmlFor="website">Resumes</label>
                <Field id="website" name="website" type="text"/>

                <button type="submit">Save</button>
            </Form>
        </Formik>
    </div>
}