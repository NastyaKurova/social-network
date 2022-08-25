import {authApi, securityApi} from "../../api/api";

const SET_CURRENT_USER = 'AUTH-SET-CURRENT-USER'
const SET_CAPTURE_URL = 'AUTH-SET-CAPTURE-URL'


let initialState = {
    isAuth: false,
    login: null,
    id: null,
    email: null,
    captureUrl: null
};

function authReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return ({...state, ...action.payload});
        case SET_CAPTURE_URL:
            return ({...state, captureUrl: action.payload.capture});
        default:
            return state;

    }
}

export function setCurrentUser({id, login, email, isAuth}) {
    return {type: SET_CURRENT_USER, payload: {id, login, email, isAuth}}
}

export function setCaptureUrl(capture) {
    return {type: SET_CAPTURE_URL, payload: {capture}}
}

export function getCurrentUser() {
    return async (dispatch) => {
        const res = await authApi.getAuthMe();

        if (res.data.resultCode === 0) {
            let {id, login, email} = res.data.data
            dispatch(setCurrentUser({id, login, email, isAuth: true}))
        } else {
            dispatch(setCurrentUser(initialState))
        }
    }
}

export function logoutUser() {
    return async (dispatch) => {
        const res = await authApi.logout();

        if (res.data.resultCode === 0) {
            dispatch(getCurrentUser())
        }
    }
}

export function loginUser(data) {
    data.rememberMe = true;

    return async (dispatch) => {
        const res = await authApi.login(data)

        if (res.data.resultCode === 0) {
            dispatch(getCurrentUser())
            dispatch(getCaptchaUrl())

        }
        if (res.data.resultCode === 10) {
            dispatch(getCaptchaUrl())
        }

    }
}

export function getCaptchaUrl() {
    return async (dispatch) => {
        const res = await securityApi.getCaptcha()
        const captureUrl = res.data.url
        dispatch(setCaptureUrl(captureUrl))
    }
}

export default authReducer;