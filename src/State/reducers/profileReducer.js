import {profileApi} from "../../api/api";

const ADD_POST = 'PROFILE-ADD-POST';
const SET_USER_PROFILE = 'PROFILE-SET-USER-PROFILE';
const SET_USER_PROFILE_STATUS = 'PROFILE-SET-USER-PROFILE-STATUS';
const SET_USER_PROFILE_PHOTO = 'PROFILE-SET-USER-PROFILE-PHOTO';

const initialState = {
    profile: null,
    postData: [
        {id: 2, text: "Hi, my friend", likes: 5, time: "20 min ago"},
        {id: 2, text: "Have been to the cinema today", likes: 2, time: "11.01.2015"},
        {id: 3, text: "Watch new tv show!", likes: 0, time: "10.03.2012"},
        {id: 4, text: "Hi", likes: 0, time: "10.03.2010"},
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
            return ({...state, status: action.status});
        case SET_USER_PROFILE_PHOTO:
            return ({...state, profile: {...state.profile, photos: {...action.photos}}})
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

export function setUserProfilePhotoAction(photos) {
    return {type: SET_USER_PROFILE_PHOTO, photos}
}

export function requestProfile(userId) {
    return async (dispatch) => {
        const res = await profileApi.getProfile(userId)
        dispatch(setUserProfileAction(res.data))

    }
}

export function requestProfileStatus(userId) {
    return async (dispatch) => {
        const res = await profileApi.getProfileStatus(userId)
        dispatch(setUserProfileStatusAction(res.data))
    }
}

export function updateProfileStatus(status) {
    return async (dispatch) => {
        const res = await profileApi.setProfileStatus(status)
        if (res.data.resultCode === 0)
            dispatch(setUserProfileStatusAction(status))
    }
}

export function saveProfilePhoto(photo) {
    return async (dispatch) => {
        const res = await profileApi.setProfilePhoto(photo)
        if (res.data.resultCode === 0)
            dispatch(setUserProfilePhotoAction(res.data.data.photos))
    }
}

export default profileReducer;