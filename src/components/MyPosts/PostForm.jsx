import React from 'react';
import {Field, Form, Formik} from "formik";
import styles from './MyPosts.module.scss';


export const PostForm = ({addPost}) => {
    return (
        <Formik
            initialValues={{
                postText: '',
            }}
            onSubmit={addPost}
        >
            <Form>
                <Field
                    as="textarea"
                    id="postText"
                    name="postText"
                    placeholder="text"
                    type="text"
                />
                <button className={styles.buttonSend} type="submit">Add Post</button>
            </Form>
        </Formik>
    )
}