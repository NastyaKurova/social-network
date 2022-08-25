import React from 'react';
import styles from "./UserInfo.module.scss";
import userDefault from "../../../assets/userDefault.png";
import {Loader} from "../../common/Loader/Loader";
import ProfileStatus from "./ProfileStatus";
import updateIco from "../../../assets/icos/update.svg";
import {UserData} from "./UserData";

export const UserInfo = ({profile, status, updateProfileStatus, isOwner, savePhoto,saveProfile}) => {
    if (!profile) return <Loader/>
    const changePhoto = (event) => {
        const fileArr = event.target.files
        if (fileArr.length) savePhoto(fileArr[0])
    }
    return <div className={styles.userInfo}>
        <div className={styles.blockImg}>
            <img className={styles.bgImg}
                 src="https://media.istockphoto.com/photos/sunrise-landscape-great-smoky-mountains-national-park-gatlinburg-tn-picture-id178377795?b=1&k=20&m=178377795&s=170667a&w=0&h=9uV0JxVk-TS_eet66XPd_v4tlO4dRT452MqS0u80M90="
                 alt=""/>
            <div className={styles.userBlock}>
                <div className={styles.userBlockImg}>
                    <img className={styles.userImg}
                         src={profile.photos.large ? profile.photos.large : userDefault}
                         alt="profile"/>
                    {isOwner ? <div className={styles.userImgOverload}>

                        <label htmlFor="file" className={styles.userImgLabel}>
                            <div className={styles.userImgLabelIco}><img src={updateIco} alt=""/></div>
                            <input className={styles.userImgInput} type="file" onChange={changePhoto}/>
                        </label>

                    </div> : null}

                </div>

            </div>
            <ProfileStatus status={status} updateProfileStatus={updateProfileStatus}/>
        </div>
        <UserData profile={profile} isOwner={isOwner} saveProfile={saveProfile}/>
    </div>
}