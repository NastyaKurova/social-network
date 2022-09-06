import { InferActionsTypes } from '../reduxStore'
import { DialogsDataType, MessagesDataType } from '../../types/types'

type InitialStateType = typeof initialState

const initialState = {
  dialogsData: [
    { id: 1, name: 'Lena' },
    { id: 2, name: 'Zhenya' },
    { id: 3, name: 'Sasha' },
    { id: 4, name: 'Genna' },
  ] as Array<DialogsDataType>,
  messagesData: [
    { id: 1, text: 'Hi, my friend' },
    { id: 2, text: 'Have been to the cinema today' },
    { id: 3, text: 'Watch new tv show!' },
    { id: 4, text: 'Hi' },
  ] as Array<MessagesDataType>,
}
type ActionsTypes = InferActionsTypes<typeof actions>

function dialogsReducer(
  state = initialState,
  action: ActionsTypes
): InitialStateType {
  switch (action.type) {
    case 'dialogs/ADD-MESSAGE':
      return {
        ...state,
        messagesData: [
          ...state.messagesData,
          { id: 10, text: action.payload.dialogsText },
        ],
      }
    default:
      return state
  }
}
export const actions = {
  addMessage({ dialogsText }: { dialogsText: string }) {
    return {
      type: 'dialogs/ADD-MESSAGE',
      payload: { dialogsText },
    } as const
  },
}

export default dialogsReducer
