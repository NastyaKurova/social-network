import React from 'react';
import styles from './Profile.module.scss';
import {UserInfo} from "./UserInfo/UserInfo";
import MyPostsContainer from "../MyPosts/MyPostsContainer";

export const Profile = ({profile}) => {
    return (
        <div className={styles.profile}>

            <UserInfo profile={profile}/>
            <MyPostsContainer/>

        </div>
    );
};

