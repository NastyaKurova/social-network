import {usersApi} from "../../api/api";
import {updateObjectArray} from "../../Utils/object-helpers";

const FOLLOW_USER = 'FOLLOW-USER'
const UNFOLLOW_USER = 'UNFOLLOW-USER'
const SET_USER = 'SET-USER'
const SET_USER_PAGE = 'SET-USER-PAGE'
const SET_USER_TOTAL_COUNT = 'SET-USER-TOTAL-COUNT'
const SET_USER_IS_LOADED = 'SET-USER-IS-LOADED'
const SET_USER_IS_FOLLOWED = 'SET_USER_IS_FOLLOWED'


let initialState = {
    users: [],
    currentPage: 1,
    totalPages: 19,
    pageSize: 20,
    isLoaded: false,
    followedProgressArr: [],
};

function usersReducer(state = initialState, action) {
    switch (action.type) {
        case FOLLOW_USER:
            return ({
                ...state, users: updateObjectArray(state.users, action.userId, 'id', {followed: true})
            });
        case UNFOLLOW_USER:
            return ({
                ...state, users: updateObjectArray(state.users, action.userId, 'id', {followed: false})
            });
        case SET_USER:
            return ({...state, users: [...action.users]});
        case SET_USER_PAGE:
            return ({...state, currentPage: action.page});
        case SET_USER_TOTAL_COUNT:
            return ({...state, totalPages: action.count});
        case SET_USER_IS_LOADED:
            return ({...state, isLoaded: action.isLoaded});
        case SET_USER_IS_FOLLOWED:
            if (action.data.followedProgressArr) {
                return ({
                    ...state,
                    followedProgressArr: state.followedProgressArr.filter(id => id !== action.data.userId)
                });
            } else {
                return ({...state, followedProgressArr: [...state.followedProgressArr, action.data.userId]});
            }
        default:
            return state;

    }
}


export function followAction(userId) {
    return {type: FOLLOW_USER, userId}
}

export function unFollowAction(userId) {
    return {type: UNFOLLOW_USER, userId}
}

export function setUsersAction(users) {
    return {type: SET_USER, users}
}

export function setUserPageAction(page) {
    return {type: SET_USER_PAGE, page}
}

export function setUserTotalCountAction(count) {
    return {type: SET_USER_TOTAL_COUNT, count}
}

export function setUserIsLoadedAction(isLoaded) {
    return {type: SET_USER_IS_LOADED, isLoaded}

}

export function setUserIsFollowedAction(followedProgressArr, userId) {
    return {type: SET_USER_IS_FOLLOWED, data: {followedProgressArr, userId}}
}

export function requestUsers(currentPage, pageSize) {
    return (dispatch) => {
        dispatch(setUserIsLoadedAction(false));
        return usersApi.getUsers(currentPage, pageSize)
            .then(res => {
                dispatch(setUsersAction(res.data.items));
                dispatch(setUserTotalCountAction(res.data.totalCount));
                dispatch(setUserPageAction(currentPage));
                dispatch(setUserIsLoadedAction(true));
            })
    }
}

export function followUser(userId) {
    return (dispatch) => {
        followUnFollowFlow(dispatch, userId, usersApi.followUser.bind(usersApi), followAction)
    }
}

export function unFollowUser(userId) {
    return (dispatch) => {
        followUnFollowFlow(dispatch, userId, usersApi.unFollowUser.bind(usersApi), unFollowAction)
    }
}

function followUnFollowFlow(dispatch, userId, apiMethod, actionMethod) {
    dispatch(setUserIsFollowedAction(false, userId));

    return apiMethod(userId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(actionMethod(userId));
            }
            dispatch(setUserIsFollowedAction(true, userId));
        })
}


export default usersReducer;