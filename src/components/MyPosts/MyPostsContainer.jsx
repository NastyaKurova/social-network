import React from 'react';
import {addPostAction, updatePostTextAction} from "../../State/reducers/profileReducer";
import {MyPosts} from "./MyPosts";

export const MyPostsContainer = ({store}) => {
    const state = store.getState()
    const addPost = () => {
        return store.dispatch(addPostAction())
    }
    const onPostChange = (text) => {
        return store.dispatch(updatePostTextAction(text))
    }

    return (
        <MyPosts postData={state.profilePage.postData} newPostText={state.profilePage.newPostText} addPost={addPost}
                 onPostChange={onPostChange}/>
    );
};