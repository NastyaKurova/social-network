const ADD_MESSAGE = 'ADD-MESSAGE'
const UPDATE_MESSAGE_TEXT = 'UPDATE-MESSAGE-TEXT'

let initialState={
        dialogsData: [
            {id: 1, name: "Lena"},
            {id: 2, name: "Zhenya"},
            {id: 3, name: "Sasha"},
            {id: 4, name: "Genna"},
        ],
        messagesData: [
            {id: 1, text: "Hi, my friend"},
            {id: 2, text: "Have been to the cinema today"},
            {id: 3, text: "Watch new tv show!"},
            {id: 4, text: "Hi"},
        ],
        newMessageText: '',
    };

function dialogsReducer(state=initialState, action) {
    switch (action.type) {
        case ADD_MESSAGE:
            return addMessage(state, state.newMessageText);
        case UPDATE_MESSAGE_TEXT:
            return updateMessageText(state, action.text);
        default:
            return state;

    }
}

function addMessage(state, text) {
    const message = {id: 1, text: text};
    state.messagesData.push(message)
    return state;
}

function updateMessageText(state, text) {
    state.newMessageText = text
    return state;
}

export function addMessageAction(text) {
    return {type: ADD_MESSAGE, text: text}
}

export function updateMessageTextAction(text) {
    return {type: UPDATE_MESSAGE_TEXT, text: text}
}

export default dialogsReducer;