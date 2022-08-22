import {profileApi} from "../../api/api";

const ADD_POST = 'ADD-POST';
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
            return addPost(state, action.payload);
        case SET_USER_PROFILE:
            return ({...state, profile: action.profile});
        case SET_USER_PROFILE_STATUS:
            return ({...state, status: action.status})
        default:
            return state;

    }
}

function addPost(state, payload) {
    const post = {id: 5, text: payload.postText, likes: 0}
    return {...state, postData: [...state.postData, post]};
}

export function addPostAction(data) {
    return {type: ADD_POST, payload: data}
}

export function setUserProfileAction(profile) {
    return {type: SET_USER_PROFILE, profile}
}

export function setUserProfileStatusAction(status) {
    return {type: SET_USER_PROFILE_STATUS, status}
}

export function requestProfile(userId) {
    return (dispatch) => {
        return profileApi.getProfile(userId)
            .then(res => {
                dispatch(setUserProfileAction(res.data))
            })
    }
}

export function requestProfileStatus(userId) {
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