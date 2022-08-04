import profileReducer from "./reducers/profileReducer";
import dialogsReducer from "./reducers/dialogsReducer";

const store = {
    _state: {
        dialogPage: {
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
        },

        profilePage: {
            postData: [
                {id: 2, text: "Hi, my friend", likes: 5},
                {id: 2, text: "Have been to the cinema today", likes: 2},
                {id: 3, text: "Watch new tv show!", likes: 0},
                {id: 4, text: "Hi", likes: 0},
            ],
            newPostText: ''
        },

    },
    getState() {
        return this._state
    },
    _callSubscriber() {
    },
    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogPage = dialogsReducer(this._state.dialogPage, action)
        this._callSubscriber(this._state)
    },

    subscribe(observer) {
        this._callSubscriber = observer;
    }
}


window.state = store._state
export default store;
