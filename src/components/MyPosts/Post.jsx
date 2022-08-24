import React from 'react';
import styles from './MyPosts.module.scss';

export const Post = ({text, time, likes}) => {
    return (
        <div className={styles.post}>
            <div className={styles.postContent}>
                <div className={styles.postText}>
                    <div>{text}</div>
                    <div>
                        <div> {time}</div>
                        <div>likes: {likes}</div>
                    </div>
                </div>


            </div>
        </div>
    );
};