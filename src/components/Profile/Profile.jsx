import React from 'react';
import styles from './Profile.module.scss';
import {UserInfo} from "./UserInfo/UserInfo";
import MyPostsContainer from "../MyPosts/MyPostsContainer";

export const Profile = ({profile,status,updateProfileStatus,isOwner,savePhoto}) => {

    return (
        <div className={styles.profile}>

            <UserInfo profile={profile} status={status} updateProfileStatus={updateProfileStatus} isOwner={isOwner} savePhoto={savePhoto}/>
            <MyPostsContainer/>

        </div>
    );
};

