const ADD_MESSAGE = 'ADD-MESSAGE'

let initialState = {
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

function dialogsReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_MESSAGE:
            return addMessage(state, action.payload);
        default:
            return state;

    }
}

function addMessage(state,payload) {
    return ({...state, messagesData: [...state.messagesData, {id: 10, text: payload.dialogsText}]})
}

export function addMessageAction(data) {
    return {type: ADD_MESSAGE, payload: data}
}

export default dialogsReducer;