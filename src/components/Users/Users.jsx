import React from 'react';
import styles from './Users.module.scss';
import userDefault from "../../assets/userDefault.png";
import {Link} from "react-router-dom";

export const Users = ({
                          users,
                          currentPage,
                          totalPages,
                          pageSize,
                          selectPage,
                          selectPrevPage,
                          selectNextPage,
                          followUser,
                          unFollowUser
                      }) => {

    let pageCount = Math.ceil(totalPages / pageSize)
    let pages = [];
    if (currentPage === 1) {
        pages = [currentPage, currentPage + 1, currentPage + 2]
    } else if (currentPage === pageCount) {
        pages = [currentPage - 1, currentPage - 2, currentPage]
    } else pages = [currentPage - 1, currentPage, currentPage + 1]

    // for (let i = 1; i <= pageCount; i++) {
    //     pages.push(i)
    // }

    return (
        <div>
            <div>
                <span className={styles.pagination} onClick={selectPrevPage}>{'<'}</span>
                {pages.map((page, index) => <span
                    className={`${currentPage === page ? styles.currentPage : ''} ${styles.pagination}`}
                    key={index} onClick={() => selectPage(page)}>{page}</span>)}
                <span className={styles.pagination} onClick={selectNextPage}>{'>'}</span>

            </div>
            {users.map(user => <User key={user.id} user={user} followUser={followUser}
                                     unFollowUser={unFollowUser}/>)}
        </div>
    );
}


const User = ({user, followUser, unFollowUser}) => {
    const clickFollowButton = () => user.followed ? unFollowUser(user.id) : followUser(user.id)

    return <div className={styles.user}>
        <div className={styles.userInfo}>
            <div className={styles.userImg}>
                <img src={user.photos.small ? user.photos.small : userDefault} alt="user"/>
            </div>
            <div>
                <Link to={`/profile/${user.id}`}><strong>{user.name}</strong></Link>
                <div>{user.status}</div>
                {/*<span>{user.location.country}, </span><span>{user.location.city}</span>*/}
            </div>
        </div>

        <div>
            <button onClick={clickFollowButton}>{user.followed ? 'Unfollow' : 'Follow'}</button>
        </div>

    </div>
}
