import React from 'react';
import styles from './MyPosts.module.scss';
import {Post} from "../Post/Post";
import {PostForm} from "./PostForm";

export const MyPosts = ({postData, addPost}) => {

    return (
        <div className={styles.myPosts}>
            <h2>My posts</h2>
            <div className={styles.postForm}>
                <PostForm addPost={addPost}/>
            </div>
            {postData.map(({id, text}, index) => <Post key={index} text={text}/>)}

        </div>
    );
};