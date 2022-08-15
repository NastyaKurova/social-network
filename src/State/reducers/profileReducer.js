const ADD_POST = 'ADD-POST';
const UPDATE_POST_TEXT = 'UPDATE-POST-TEXT';

const initialState = {
    postData: [
        {id: 2, text: "Hi, my friend", likes: 5},
        {id: 2, text: "Have been to the cinema today", likes: 2},
        {id: 3, text: "Watch new tv show!", likes: 0},
        {id: 4, text: "Hi", likes: 0},
    ],
    newPostText: ''
}

function profileReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_POST:
            return addPost(state);
        case UPDATE_POST_TEXT:
            return updatePostText(state, action.text);
        default:
            return state;

    }
}

function addPost(state) {
    const post = {id: 5, text: state.newPostText, likes: 0}
    return {...state, postData: [...state.postData, post]};
}

function updatePostText(state, text) {
    return {...state, newPostText: text};
}

export function addPostAction() {
    return {type: ADD_POST}
}

export function updatePostTextAction(text) {
    return {type: UPDATE_POST_TEXT, text: text}
}

export default profileReducer;