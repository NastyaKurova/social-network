import {profileApi} from "../../api/api";

const ADD_POST = 'ADD-POST';
const UPDATE_POST_TEXT = 'UPDATE-POST-TEXT';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_USER_PROFILE_STATUS = 'SET-USER-PROFILE-STATUS';

const initialState = {
    profile: null,
    postData: [
        {id: 2, text: "Hi, my friend", likes: 5},
        {id: 2, text: "Have been to the cinema today", likes: 2},
        {id: 3, text: "Watch new tv show!", likes: 0},
        {id: 4, text: "Hi", likes: 0},
    ],
    status: null,
    newPostText: ''
}

function profileReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_POST:
            return addPost(state);
        case UPDATE_POST_TEXT:
            return updatePostText(state, action.text);
        case SET_USER_PROFILE:
            return ({...state, profile: action.profile});
        case SET_USER_PROFILE_STATUS:
            return ({...state, status: action.status})
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
    return {type: UPDATE_POST_TEXT, text}
}

export function setUserProfileAction(profile) {
    return {type: SET_USER_PROFILE, profile}
}

export function setUserProfileStatusAction(status, userId) {
    return {type: SET_USER_PROFILE_STATUS, status}
}

export function getProfile(userId) {
    return (dispatch) => {
        return profileApi.getProfile(userId)
            .then(res => {
                dispatch(setUserProfileAction(res.data))
            })
    }
}

export function getProfileStatus(userId) {
    return (dispatch) => {
        return profileApi.getProfileStatus(userId)
            .then(res => {
                dispatch(setUserProfileStatusAction(res.data))
            })
    }
}

export function updateProfileStatus(status) {
    return (dispatch) => {
        return profileApi.setProfileStatus(status)
            .then(res => {
                if (res.data.resultCode === 0)
                    dispatch(setUserProfileStatusAction(status))
            })
    }
}

export default profileReducer;