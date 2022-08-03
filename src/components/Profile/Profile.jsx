import React from 'react';
import styles from './Profile.module.scss';
import {MyPosts} from "../MyPosts/MyPosts";
import {UserInfo} from "./UserInfo/UserInfo";

export const Profile = ({postData,addPost}) => {
    return (
        <div className={styles.profile}>

            <UserInfo/>
            <MyPosts postData={postData} addPost={addPost}/>

        </div>
    );
};

