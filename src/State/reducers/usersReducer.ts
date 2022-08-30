import {usersApi} from "../../api/userApi";
import {updateObjectArray} from "../../Utils/object-helpers";
import {ResponseType, ResultCodesEnum, UsersType} from "../../types/types";
import {DispatchType, InferActionsTypes, ThunkType} from "../reduxStore";


export type InitialStateType = typeof initialState;

let initialState = {
    users: [] as Array<UsersType>,
    currentPage: 1,
    totalPages: 19,
    pageSize: 20,
    isLoaded: false,
    followedProgressArr: [] as Array<number>,  // arr of users id
};
type ActionsTypes = InferActionsTypes<typeof actions>

function usersReducer(state = initialState, action: ActionsTypes): InitialStateType {
    switch (action.type) {
        case 'users/FOLLOW_USER':
            return ({
                ...state, users: updateObjectArray(state.users, action.userId, 'id', {followed: true})
            });
        case 'users/UNFOLLOW_USER':
            return ({
                ...state, users: updateObjectArray(state.users, action.userId, 'id', {followed: false})
            });
        case 'users/SET_USER':
            return ({...state, users: [...action.users]});
        case 'users/SET_USER_PAGE':
            return ({...state, currentPage: action.page});
        case 'users/SET_USER_TOTAL_COUNT':
            return ({...state, totalPages: action.count});
        case 'users/SET_USER_IS_LOADED':
            return ({...state, isLoaded: action.isLoaded});
        case 'users/SET_USER_IS_FOLLOWED':
            if (action.payload.followingFinished) {
                return ({
                    ...state,
                    followedProgressArr: state.followedProgressArr.filter(id => id !== action.payload.userId)
                });
            } else {
                return ({...state, followedProgressArr: [...state.followedProgressArr, action.payload.userId]});
            }
        default:
            return state;
    }
}

export const actions = {
    follow(userId: number) {
        return {type: 'users/FOLLOW_USER', userId} as const
    },
    unFollow(userId: number) {
        return {type: 'users/UNFOLLOW_USER', userId} as const
    },
    setUsers(users: UsersType[]) {
        return {type: 'users/SET_USER', users} as const
    },
    setUserPage(page: number) {
        return {type: 'users/SET_USER_PAGE', page} as const
    },
    setUserTotalCount(count: number) {
        return {type: 'users/SET_USER_TOTAL_COUNT', count} as const
    },
    setUserIsLoaded(isLoaded: boolean) {
        return {type: 'users/SET_USER_IS_LOADED', isLoaded} as const

    },
    setUserIsFollowed(followingFinished: boolean, userId: number) {
        return {type: 'users/SET_USER_IS_FOLLOWED', payload: {followingFinished, userId}} as const
    },
}

type UsersThunkType = ThunkType<ActionsTypes>
type UsersDispatchType = DispatchType<ActionsTypes>

export function requestUsers(currentPage: number, pageSize: number): UsersThunkType {
    return (dispatch) => {
        dispatch(actions.setUserIsLoaded(false));
        return usersApi.getUsers(currentPage, pageSize)
            .then(res => {
                dispatch(actions.setUsers(res.items));
                dispatch(actions.setUserTotalCount(res.totalCount));
                dispatch(actions.setUserPage(currentPage));
                dispatch(actions.setUserIsLoaded(true));
            })
    }
}

export function followUser(userId: number): UsersThunkType {
    return async (dispatch) => {
       await followUnFollowFlow(dispatch, userId, usersApi.followUser.bind(usersApi), actions.follow)
    }
}

export function unFollowUser(userId: number): UsersThunkType {
    return async (dispatch) => {
       await followUnFollowFlow(dispatch, userId, usersApi.unFollowUser.bind(usersApi), actions.unFollow)
    }
}

async function followUnFollowFlow(dispatch: UsersDispatchType, userId: number, apiMethod: (userId: number) => Promise<ResponseType>,
                                  actionMethod: (userId: number) => ActionsTypes) {
    dispatch(actions.setUserIsFollowed(false, userId));

    const res = await apiMethod(userId)

    if (res.resultCode === ResultCodesEnum.Success) {
        dispatch(actionMethod(userId));
    }
    dispatch(actions.setUserIsFollowed(true, userId));

}


export default usersReducer;