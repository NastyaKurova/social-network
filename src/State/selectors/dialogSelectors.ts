import {AppStateType} from "../reduxStore";

export const getDialogsData = (state: AppStateType) => {
    return state.dialogPage.dialogsData
}
export const getMessagesData = (state: AppStateType) => {
    return state.dialogPage.messagesData
}
