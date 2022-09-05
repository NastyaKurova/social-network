import { AppStateType } from '../reduxStore'

export const getChatMessages = (state: AppStateType) => {
  return state.chat.messages
}
export const getWsStatus = (state: AppStateType) => {
  return state.chat.status
}
