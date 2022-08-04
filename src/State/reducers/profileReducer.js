const ADD_POST = 'ADD-POST';
const UPDATE_POST_TEXT = 'UPDATE-POST-TEXT'

function profileReducer(state, action) {
    switch (action.type) {
        case ADD_POST:
            return addPost(state, state.newPostText);
        case UPDATE_POST_TEXT:
            return updatePostText(state, action.text);
        default:
            return state;

    }
}

function addPost(state, text) {
    const post = {id: 5, text: text, likes: 0}
    state.postData.push(post)
    return state;
}

function updatePostText(state, text) {
    state.newPostText = text
    return state;
}

export function addPostAction() {
    return {type: ADD_POST}
}

export function updatePostTextAction(text) {
    return {type: UPDATE_POST_TEXT, text: text}
}

export default profileReducer;