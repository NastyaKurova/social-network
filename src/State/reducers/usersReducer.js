const FOLLOW_USER = 'FOLLOW-USER'
const UNFOLLOW_USER = 'UNFOLLOW-USER'
const SET_USER = 'SET-USER'
const SET_USER_PAGE = 'SET-USER-PAGE'
const SET_USER_TOTAL_COUNT = 'SET-USER-TOTAL-COUNT'
const SET_USER_IS_LOADED = 'SET-USER-IS-LOADED'

let initialState = {
    users: [],
    currentPage: 1,
    totalPages: 19,
    pageSize: 20,
    isLoaded: false,
};

function usersReducer(state = initialState, action) {
    switch (action.type) {
        case FOLLOW_USER:
            return ({
                ...state, users: state.users.map(u => {
                    if (u.id === action.userId) return {...u, followed: true}
                    return u;
                })
            });
        case UNFOLLOW_USER:
            return ({
                ...state, users: state.users.map(u => {
                    if (u.id === action.userId) return {...u, followed: false}
                    return u;
                })
            });
        case SET_USER:
            return ({...state, users: [...action.users]});
        case SET_USER_PAGE:
            return ({...state, currentPage: action.page});
        case SET_USER_TOTAL_COUNT:
            return ({...state, totalPages: action.count});
        case SET_USER_IS_LOADED:
            return ({...state, isLoaded: action.isLoaded});
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

export default usersReducer;