import React from 'react';
import styles from "./UserInfo.module.scss";
import userDefault from "../../../assets/userDefault.png";
import {Loader} from "../../common/Loader/Loader";
import ProfileStatus from "./ProfileStatus";

export const UserInfo = ({profile,status,updateProfileStatus}) => {
    if (!profile) return <Loader/>
    return <div className={styles.userInfo}>
        <div className={styles.blockImg}>
            <img className={styles.bgImg}
                 src="https://media.istockphoto.com/photos/sunrise-landscape-great-smoky-mountains-national-park-gatlinburg-tn-picture-id178377795?b=1&k=20&m=178377795&s=170667a&w=0&h=9uV0JxVk-TS_eet66XPd_v4tlO4dRT452MqS0u80M90="
                 alt=""/>
            <div className={styles.userBlock}>
                <img className={styles.userImg}
                     src={profile.photos.large ? profile.photos.large : userDefault}
                     alt="profile"/>
                <div className={styles.userName}>{profile.fullName}</div>
                <div className={styles.userStatus}>{profile.lookingForAJobDescription}</div>
                <ProfileStatus status={status} updateProfileStatus={updateProfileStatus}/>
            </div>
        </div>

    </div>
}