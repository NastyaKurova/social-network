import React, {FC} from 'react';
// @ts-ignore
import styles from './Users.module.scss';
// @ts-ignore
import userDefault from "../../assets/userDefault.png";
import {Link} from "react-router-dom";
import {Pagination} from "../Pagination/Pagination";
import {UsersType} from "../../types/types";

type UsersPropsType = {
    users: UsersType[]
    currentPage: number
    totalPages: number
    followedProgressArr: number[]
    pageSize: number
    selectPage: (page: number) => void
    selectPrevPage: () => void
    selectNextPage: () => void
    followUser: (userId: number) => void
    unFollowUser: (userId: number) => void
}
export const Users: FC<UsersPropsType> = ({
                                              users,
                                              currentPage,
                                              totalPages,
                                              followedProgressArr,
                                              pageSize,
                                              selectPage,
                                              selectPrevPage,
                                              selectNextPage,
                                              followUser,
                                              unFollowUser
                                          }) => {


    return (
        <div>
            <Pagination totalPages={totalPages} pageSize={pageSize} currentPage={currentPage} selectPage={selectPage}
                        selectNextPage={selectNextPage} selectPrevPage={selectPrevPage}/>
            {users.map(user => <User key={user.id} user={user} followedProgressArr={followedProgressArr}
                                     followUser={followUser}
                                     unFollowUser={unFollowUser}/>)}
        </div>
    );
}


const User = ({user, followedProgressArr, followUser, unFollowUser}) => {
    const clickFollowButton = () => user.followed ? unFollowUser(user.id) : followUser(user.id)
    return <div className={styles.user}>
        <div className={styles.userInfo}>
            <div className={styles.userImg}>
                <img src={user.photos.small ? user.photos.small : userDefault} alt="user"/>
            </div>
            <div>
                <Link to={`/profile/${user.id}`}><strong>{user.name}</strong></Link>
                <div>{user.status}</div>
            </div>
        </div>
        <div>
            <button disabled={followedProgressArr.some(id => id === user.id)}
                    onClick={clickFollowButton}>{user.followed ? 'Unfollow' : 'Follow'}</button>
        </div>

    </div>
}
