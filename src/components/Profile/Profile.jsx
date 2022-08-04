import React from 'react';
import styles from './Profile.module.scss';
import {MyPosts} from "../MyPosts/MyPosts";
import {UserInfo} from "./UserInfo/UserInfo";
import {MyPostsContainer} from "../MyPosts/MyPostsContainer";

export const Profile = ({store}) => {
    return (
        <div className={styles.profile}>

            <UserInfo/>
            <MyPostsContainer store={store}/>

        </div>
    );
};

