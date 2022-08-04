const ADD_MESSAGE = 'ADD-MESSAGE'
const UPDATE_MESSAGE_TEXT = 'UPDATE-MESSAGE-TEXT'

function dialogsReducer(state, action) {
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