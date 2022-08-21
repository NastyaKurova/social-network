import {authApi} from "../../api/api";

const SET_CURRENT_USER = 'SET-CURRENT-USER'


let initialState = {
    isAuth: false,
    login: null,
    id: null,
    email: null
};

function authReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return ({...state, ...action.payload});
        default:
            return state;

    }
}

export function setCurrentUser({id, login, email, isAuth}) {
    return {type: SET_CURRENT_USER, payload: {id, login, email, isAuth}}
}

export function getCurrentUser() {
    return (dispatch) => {
        return authApi.getAuthMe()
            .then(res => {
                if (res.data.resultCode === 0) {
                    let {id, login, email} = res.data.data
                    dispatch(setCurrentUser({id, login, email, isAuth: true}))
                } else {

                    dispatch(setCurrentUser(initialState))

                }

            })
    }
}

export function logoutUser() {
    return (dispatch) => {
        return authApi.logout()
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(getCurrentUser())
                }
            })
    }
}

export function loginUser(data) {
    data.rememberMe = true;
    data.captcha = true;

    return (dispatch) => {
        return authApi.login(data)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(getCurrentUser())
                }
            })
    }
}

export default authReducer;