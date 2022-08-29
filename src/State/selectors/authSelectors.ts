import {AppStateType} from "../reduxStore";

export const getAuth = (state: AppStateType) => {
    return state.auth.isAuth
}
export const getLogin = (state: AppStateType) => {
    return state.auth.login
}
export const getCaptureUrl = (state: AppStateType) => {
    return state.auth.captureUrl
}
