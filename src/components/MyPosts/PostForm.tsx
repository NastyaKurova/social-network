import React, {FC} from 'react';
import {Field, Form, Formik} from "formik";
import styles from './MyPosts.module.scss';

type PostFormPropsType = { addPost: ({postText}: { postText: string }) => void }

export const PostForm: FC<PostFormPropsType> = ({addPost}) => {
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
                <button type="submit">Add Post</button>
            </Form>
        </Formik>
    )
}