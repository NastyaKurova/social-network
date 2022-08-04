import React from 'react';
import styles from './MyPosts.module.scss';
import {Post} from "../Post/Post";
import {addPostAction, updatePostTextAction} from "../../State/reducers/profileReducer";

export const MyPosts = ({profilePage, dispatch}) => {

    const addPost = () => {
        return dispatch(addPostAction())
    }
    const handleChange = (e) => {
        return dispatch(updatePostTextAction(e.target.value))
    }

    return (
        <div className={styles.myPosts}>
            <h2>My posts</h2>
            <div className={styles.postForm}>
                <textarea name="" id="" cols="30" rows="10" value={profilePage.newPostText}
                          onChange={handleChange}></textarea>
                <div className={styles.buttonSend}>
                    <button onClick={addPost}>Add post</button>
                </div>

            </div>
            {profilePage.postData.map(({id, text}, index) => <Post key={index} text={text}/>)}

        </div>
    );
};