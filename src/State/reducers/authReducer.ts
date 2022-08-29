import {authApi} from "../../api/authApi";
import {securityApi} from "../../api/securityApi";
import {InferActionsTypes, ThunkType} from "../reduxStore";
import {ResultCodesCaptureEnum, ResultCodesEnum} from "../../types/types";

type InitialStateType = typeof initialState
let initialState = {
    isAuth: false,
    login: null as string | null,
    id: null as number | null,
    email: null as string | null,
    captureUrl: null as string | null
};

type ActionsTypes = InferActionsTypes<typeof actions>

function authReducer(state = initialState, action: ActionsTypes): InitialStateType {
    switch (action.type) {
        case "auth/SET-CURRENT-USER":
            return ({...state, ...action.payload});
        case "auth/SET-CAPTURE-URL":
            return ({...state, captureUrl: action.payload.capture});
        default:
            return state;

    }
}

const actions = {
    setCurrentUser({id, login, email, isAuth}) {
        return {type: 'auth/SET-CURRENT-USER', payload: {id, login, email, isAuth}} as const
    },

    setCaptureUrl(capture) {
        return {type: 'auth/SET-CAPTURE-URL', payload: {capture}} as const
    },
}


type AuthThunkType = ThunkType<ActionsTypes>

export function getCurrentUser(): AuthThunkType {
    return async (dispatch) => {
        const res = await authApi.getAuthMe();

        if (res.resultCode === ResultCodesEnum.Success) {
            let {id, login, email} = res.data
            dispatch(actions.setCurrentUser({id, login, email, isAuth: true}))
        } else {
            dispatch(actions.setCurrentUser(initialState))
        }
    }
}

export function logoutUser(): AuthThunkType {
    return async (dispatch) => {
        const res = await authApi.logout();

        if (res.resultCode === ResultCodesEnum.Success) {
            dispatch(getCurrentUser())
        }
    }
}

export function loginUser(data): AuthThunkType {
    data.rememberMe = true;

    return async (dispatch) => {
        const res = await authApi.login(data)

        if (res.resultCode === ResultCodesEnum.Success) {
            dispatch(getCurrentUser())
            dispatch(getCaptchaUrl())

        }
        if (res.resultCode === ResultCodesCaptureEnum.CaptureIsRequired) {
            dispatch(getCaptchaUrl())
        }

    }
}

export function getCaptchaUrl(): AuthThunkType {
    return async (dispatch) => {
        const res = await securityApi.getCaptcha()
        const captureUrl = res.url
        dispatch(actions.setCaptureUrl(captureUrl))
    }
}

export default authReducer;