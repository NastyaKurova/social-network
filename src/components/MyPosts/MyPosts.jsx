import React from 'react';
import styles from './MyPosts.module.scss';
import {Post} from "../Post/Post";

export const MyPosts = ({postData, newPostText, addPost, onPostChange}) => {

    const handleChange = (e) => {
        return onPostChange(e.target.value)
    }

    return (
        <div className={styles.myPosts}>
            <h2>My posts</h2>
            <div className={styles.postForm}>
                <textarea name="" id="" cols="30" rows="10" value={newPostText}
                          onChange={handleChange}></textarea>
                <div className={styles.buttonSend}>
                    <button onClick={addPost}>Add post</button>
                </div>

            </div>
            {postData.map(({id, text}, index) => <Post key={index} text={text}/>)}

        </div>
    );
};