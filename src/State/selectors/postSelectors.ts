import {AppStateType} from "../reduxStore";

export const getPostData = (state: AppStateType) => {
    return state.profilePage.postData
}
