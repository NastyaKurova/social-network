import {InferActionsTypes, ThunkType} from "../reduxStore";
import {ChatMessageType, ChatStatusType} from "../../types/types";
import {ChatApi} from "../../api/chatApi";
import {Dispatch} from "redux";
import {v1} from "uuid";


type InitialStateType = {
    messages: ChatMessageType[],
    status: ChatStatusType
};

let initialState: InitialStateType = {
    messages: [],
    status: 'ready'
};

type ActionsTypes = InferActionsTypes<typeof actions>

function chatReducer(state = initialState, action: ActionsTypes): InitialStateType {
    switch (action.type) {
        case 'chat/SET-MESSAGES':
            let messagesWithId = [...action.payload.messages.map(m => ({...m, id: v1()}))]
            return ({
                ...state,
                messages: [...state.messages, ...messagesWithId].filter((m, index, array) => index >= array.length - 100)
            })
        case 'chat/CLEAR-MESSAGES':
            return ({...state, messages: []})
        case 'chat/SET-STATUS':
            return ({...state, status: action.payload.status});
        default:
            return state;

    }
}

export const actions = {
    setMessages(messages: ChatMessageType[]) {
        return {type: 'chat/SET-MESSAGES', payload: {messages}} as const
    },
    clearMessages() {
        return {type: 'chat/CLEAR-MESSAGES'} as const
    },
    setStatus(status: ChatStatusType) {
        return {type: 'chat/SET-STATUS', payload: {status}} as const
    }
}

type ChatThunkType = ThunkType<ActionsTypes>

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null

function newMessageHandlerCreator(dispatch: Dispatch) {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.setMessages(messages))
        }
    }
    return _newMessageHandler
}

let _statusChangedHandler: ((status: ChatStatusType) => void) | null = null

function statusChangedHandlerCreator(dispatch: Dispatch) {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(actions.setStatus(status))
        }
    }
    return _statusChangedHandler
}

export function startMessageListening(): ChatThunkType {
    return async (dispatch) => {
        ChatApi.startListenWs()
        ChatApi.subscribe('message-received', newMessageHandlerCreator(dispatch))
        ChatApi.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
    }
}

export function stopMessageListening(): ChatThunkType {
    return async (dispatch) => {
        dispatch(actions.clearMessages())
        ChatApi.unsubscribe('message-received', newMessageHandlerCreator(dispatch))
        ChatApi.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
        ChatApi.stopListenWs()
    }
}

export function sendMessage({message}) {
    ChatApi.sendMessage(message)
}


export default chatReducer;