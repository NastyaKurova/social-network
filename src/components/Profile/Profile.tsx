import React, {FC} from 'react';
import styles from './Profile.module.scss';
import {UserInfo} from "./UserInfo/UserInfo";
import MyPostsContainer from "../MyPosts/MyPostsContainer";
import {ProfileDataType} from "../../types/types";

type ProfilePropsType = {
    profile: ProfileDataType,
    status: string,
    isOwner: boolean,
    updateProfileStatus: (status: string) => void,
    savePhoto: (photo: File) => void,
    saveProfile: (data: ProfileDataType) => void

}
export const Profile: FC<ProfilePropsType> = ({
                                                  profile,
                                                  status,
                                                  updateProfileStatus,
                                                  isOwner,
                                                  savePhoto,
                                                  saveProfile
                                              }) => {

    return (
        <div className={styles.profile}>

            <UserInfo profile={profile} status={status} updateProfileStatus={updateProfileStatus} isOwner={isOwner}
                      savePhoto={savePhoto} saveProfile={saveProfile}/>
            <MyPostsContainer/>

        </div>
    );
};

