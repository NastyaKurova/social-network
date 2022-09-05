import {ChatMessageType, ChatStatusType, MessageSubscriberType, StatusSubscriberType} from "../types/types";

let subscribers = {
    'message-received': [] as MessageSubscriberType[],
    'status-changed': [] as StatusSubscriberType[]
}
let ws: WebSocket | null = null
type EventsNamesType = 'message-received' | 'status-changed'

const closeHandler = () => {
    console.log("CLOSE WS")
    notifySubscribersAboutStatus('pending')
    setTimeout(createChannel, 3000)
}
const messageHandler = (e: MessageEvent) => {
    let newMessages: ChatMessageType[] = JSON.parse(e.data)
    subscribers['message-received'].forEach(s => s(newMessages))
}
const openHandler = () => {
    notifySubscribersAboutStatus('ready')
}
const errorHandler = () => {
    notifySubscribersAboutStatus('error')
}

function notifySubscribersAboutStatus(status: ChatStatusType) {
    subscribers['status-changed'].forEach(s => s(status))

}

function createChannel() {
    cleanUp() // previous channel
    ws?.close()
    ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
    notifySubscribersAboutStatus('pending')
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
    ws.addEventListener('open', openHandler)
    ws.addEventListener('error', errorHandler)
}

function cleanUp() {
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message', messageHandler)
    ws?.removeEventListener('open', openHandler)
    ws?.removeEventListener('error', errorHandler)
}

export const ChatApi = {
    startListenWs() {
        createChannel()
    },
    stopListenWs() {
        subscribers['message-received'] = []
        subscribers['status-changed'] = []
        cleanUp()
        ws?.close()
    },
    subscribe(eventName: EventsNamesType, callback: MessageSubscriberType | StatusSubscriberType) {
        // @ts-ignore
        subscribers[eventName].push(callback)
        return () => {
            // @ts-ignore
            subscribers = subscribers[eventName].filter(s => s !== callback) //unsubscribe
        }
    },
    unsubscribe(eventName: EventsNamesType, callback: MessageSubscriberType | StatusSubscriberType) {
        // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
    },
    sendMessage(message) {
        ws?.send(message)
    }
}