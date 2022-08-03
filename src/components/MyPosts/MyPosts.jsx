import React, {useRef} from 'react';
import styles from './MyPosts.module.scss';
import {Post} from "../Post/Post";

export const MyPosts = ({postData, addPost}) => {
    return (
        <div className={styles.myPosts}>
            <h2>My posts</h2>
            <div className={styles.postForm}>
                <textarea name="" id="" cols="30" rows="10"></textarea>
                <div className={styles.buttonSend}>
                    <button onClick={()=>addPost('text')}>Add post</button>
                </div>

            </div>
            {postData.map(({id, text},index) => <Post key={index} text={text}/>)}

        </div>
    );
};