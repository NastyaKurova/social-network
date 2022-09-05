import { AppStateType } from '../reduxStore'
import { DialogsDataType, MessagesDataType } from '../../types/types'

export const getDialogsData = (state: AppStateType): DialogsDataType[] => {
  return state.dialogPage.dialogsData
}
export const getMessagesData = (state: AppStateType): MessagesDataType[] => {
  return state.dialogPage.messagesData
}
