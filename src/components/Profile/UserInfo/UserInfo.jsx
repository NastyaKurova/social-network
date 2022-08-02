import React from 'react';
import styles from "./UserInfo.module.scss";


export const UserInfo = () => {
    return <div className={styles.userInfo}>
        <div className={styles.blockImg}>
            <img className={styles.bgImg}
                 src="https://media.istockphoto.com/photos/sunrise-landscape-great-smoky-mountains-national-park-gatlinburg-tn-picture-id178377795?b=1&k=20&m=178377795&s=170667a&w=0&h=9uV0JxVk-TS_eet66XPd_v4tlO4dRT452MqS0u80M90="
                 alt=""/>
            <div className={styles.userBlock}>
                <img className={styles.userImg}
                     src="https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_1280.png"
                     alt="profile"/>
                <div className={styles.userName}>User User</div>
                <div className={styles.userStatus}>Future is now, here it comes. Future is now, here it comes.
                    Future is now, here it comes
                </div>
            </div>
        </div>

    </div>
}