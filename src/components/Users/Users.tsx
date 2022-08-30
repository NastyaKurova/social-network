import React, {FC, useEffect} from 'react';
import styles from './Users.module.scss';
import userDefault from "../../assets/userDefault.png";
import {Link} from "react-router-dom";
import {Pagination} from "../Pagination/Pagination";
import {UsersFilterType} from "../../types/types";
import {UsersFormFilter} from "./UsersFormFilter";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getFollowedProgressArr,
    getPageSize,
    getTotalPages,
    getUsers, getUsersFilter
} from "../../State/selectors/userSelectors";
import {followUser, requestUsers, unFollowUser} from "../../State/reducers/usersReducer";
import {Dispatch} from "redux";

export const Users: FC = () => {
    const users = useSelector(getUsers)
    const currentPage = useSelector(getCurrentPage)
    const totalPages = useSelector(getTotalPages)
    const pageSize = useSelector(getPageSize)
    const followedProgressArr = useSelector(getFollowedProgressArr)
    const filter = useSelector(getUsersFilter)
    const dispatch: Dispatch<any> = useDispatch()
    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, filter))
    }, [])

    const selectPage = (page) => {
        dispatch(requestUsers(page, pageSize, filter))
    }

    const selectPrevPage = () => {
        const page = currentPage - 1;
        dispatch(requestUsers(page, pageSize, filter))
    }

    const selectNextPage = () => {
        const page = currentPage + 1;
        dispatch(requestUsers(page, pageSize, filter))
    }

    const findUsers = (filter: UsersFilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }

    return (
        <div>
            <Pagination totalPages={totalPages} pageSize={pageSize} currentPage={currentPage} selectPage={selectPage}
                        selectNextPage={selectNextPage} selectPrevPage={selectPrevPage}/>
            <UsersFormFilter findUsers={findUsers} filter={filter}/>
            {users.map(user => <User key={user.id} user={user} followedProgressArr={followedProgressArr}
                                     followUser={followUser}
                                     unFollowUser={unFollowUser}/>)}
        </div>
    );
}


const User = ({user, followedProgressArr, followUser, unFollowUser}) => {
    const dispatch = useDispatch()

    const clickFollowButton = () => user.followed ? dispatch(unFollowUser(user.id)) : dispatch(followUser(user.id))
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
