const ADD_POST='ADD-POST';
const UPDATE_POST_TEXT='UPDATE-POST-TEXT'
const ADD_MESSAGE='ADD-MESSAGE'
const UPDATE_MESSAGE_TEXT='UPDATE-MESSAGE-TEXT'

const store={
    _state:{
        dialogPage:{
            dialogsData : [
                {id: 1, name: "Lena"},
                {id: 2, name: "Zhenya"},
                {id: 3, name: "Sasha"},
                {id: 4, name: "Genna"},
            ],
            messagesData : [
                {id: 1, text: "Hi, my friend"},
                {id: 2, text: "Have been to the cinema today"},
                {id: 3, text: "Watch new tv show!"},
                {id: 4, text: "Hi"},
            ],
            newMessageText:'',
        },

        profilePage:{
            postData : [
                {id: 2, text: "Hi, my friend",likes:5},
                {id: 2, text: "Have been to the cinema today",likes:2},
                {id: 3, text: "Watch new tv show!",likes:0},
                {id: 4, text: "Hi",likes:0},
            ],
            newPostText:''
        },

    },
    getState(){return this._state},
    _callSubscriber(){},
    dispatch(action){
        switch (action.type){
            case ADD_POST: return this._addPost(this._state.profilePage.newPostText);
            case UPDATE_POST_TEXT: return this._updatePostText(action.text);
            case ADD_MESSAGE: return this._addMessage(this._state.dialogPage.newMessageText);
            case UPDATE_MESSAGE_TEXT: return this._updateMessageText(action.text);
            default: return this._state;
        }
    },
    _addPost(text){
        const post = {id: 5, text: text,likes:0}
        this._state.profilePage.postData.push(post)
        this._callSubscriber(this._state)
    },
    _updatePostText(text){
        this._state.profilePage.newPostText = text
        this._callSubscriber(this._state)
    },
    _addMessage(text){
        const message =  {id: 1, text: text};
        this._state.dialogPage.messagesData.push(message)
        this._callSubscriber(this._state)
    },
    _updateMessageText(text){
        this._state.dialogPage.newMessageText = text
        this._callSubscriber(this._state)
    },
    subscribe(observer){
        this._callSubscriber=observer;
    }


}
export function addPostAction(){
return {type: ADD_POST}
}
export function updatePostTextAction(text){
    return {type: UPDATE_POST_TEXT, text: text}
}
export function addMessageAction(text){
    return {type: ADD_MESSAGE, text: text}
}
export function updateMessageTextAction(text){
    return {type: UPDATE_MESSAGE_TEXT, text: text}
}
window.state = store._state
export default store;
