import React, {FC} from 'react';
// @ts-ignore
import styles from './MyPosts.module.scss';
import {PostDataItemType} from "../../types/types";

export const Post:FC<PostDataItemType> = ({text, time, likes}) => {
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