import React from 'react';
import styles from './Profile.module.scss';
import {MyPosts} from "../MyPosts/MyPosts";
import {UserInfo} from "./UserInfo/UserInfo";

export const Profile = () => {
    return (
        <div className={styles.profile}>

            <UserInfo/>
            <MyPosts/>

        </div>
    );
};

