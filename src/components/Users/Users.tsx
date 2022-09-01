import React, {FC, useEffect} from 'react';
import styles from './Users.module.scss';
import userDefault from "../../assets/userDefault.png";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Pagination} from "../Pagination/Pagination";
import {UsersFilterType} from "../../types/types";
import {UsersFormFilter} from "./UsersFormFilter";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getFollowedProgressArr,
    getPageSize, getTotalCount,
    getUsers, getUsersFilter
} from "../../State/selectors/userSelectors";
import {followUser, requestUsers, unFollowUser} from "../../State/reducers/usersReducer";
import {Dispatch} from "redux";

export const Users: FC = () => {
    const users = useSelector(getUsers)
    const currentPage = useSelector(getCurrentPage)
    const totalCount = useSelector(getTotalCount)
    const pageSize = useSelector(getPageSize)
    const followedProgressArr = useSelector(getFollowedProgressArr)
    const filter = useSelector(getUsersFilter)
    const dispatch: Dispatch<any> = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const query = new URLSearchParams(location.search)
        const filerFriend = query.get('friend')
        const filerTerm = query.get('term')
        const filerPage = query.get('page')
        let actualPage = currentPage
        let actualFilter = filter
        if (!!filerPage) actualPage = Number(filerPage)
        if (!!filerTerm) actualFilter = {...actualFilter, term: filerTerm}
        if (!!filerFriend) actualFilter = {...actualFilter, friend: filerFriend}
console.log(filerFriend,actualFilter)
        dispatch(requestUsers(actualPage, pageSize, actualFilter))
    }, [])

    useEffect(() => {
        navigate({
            pathname: '/users',
            search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`
        })
    }, [filter, currentPage, navigate])

    const selectPage = (page) => {
        dispatch(requestUsers(page, pageSize, filter))
    }

    const findUsers = (filter: UsersFilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }

    return (
        <div>
            <Pagination totalCount={totalCount} pageSize={pageSize} currentPage={currentPage} selectPage={selectPage}/>
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
