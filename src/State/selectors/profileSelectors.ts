import {AppStateType} from "../reduxStore";

export const getProfile = (state: AppStateType) => {
    return state.profilePage.profile
}
export const getProfileStatus = (state: AppStateType) => {
    return state.profilePage.status
}
export const getAuthUserId = (state: AppStateType) => {
    return state.auth.id
}