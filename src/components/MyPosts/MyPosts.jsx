import React from 'react';
import styles from './MyPosts.module.scss';
import {Post} from "./Post";
import {PostForm} from "./PostForm";
import "../forms.module.scss";

export const MyPosts = ({postData, addPost}) => {

    return (
        <div className={styles.myPosts}>
            <h2>My posts</h2>
            <div className={styles.postForm}>
                <PostForm addPost={addPost}/>
            </div>
            {postData.map(({id, text, time, likes}, index) => <Post key={index} text={text} time={time}
                                                                    likes={likes}/>)}

        </div>
    );
};