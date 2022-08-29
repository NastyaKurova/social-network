import {profileApi} from "../../api/profileApi";
import {FileType, PostDataType, PostPhotosType, ProfileDataType, ResultCodesEnum} from "../../types/types";
import {InferActionsTypes, ThunkType} from "../reduxStore";

type InitialStateType = typeof initialState;
const initialState = {
    profile: null as ProfileDataType | null,
    postData: [
        {id: 2, text: "Hi, my friend", likes: 5, time: "20 min ago"},
        {id: 2, text: "Have been to the cinema today", likes: 2, time: "11.01.2015"},
        {id: 3, text: "Watch new tv show!", likes: 0, time: "10.03.2012"},
        {id: 4, text: "Hi", likes: 0, time: "10.03.2010"},
    ] as Array<PostDataType>,
    status: null as string | null
}

type ActionsTypes = InferActionsTypes<typeof actions>

function profileReducer(state = initialState, action: ActionsTypes): InitialStateType {
    switch (action.type) {
        case "profile/ADD-POST":
            return addPost(state, action.payload);
        case "profile/SET-USER":
            return ({...state, profile: action.profile});
        case "profile/SET-USER-STATUS":
            return ({...state, status: action.status});
        case "profile/SET-USER-PHOTO":
            return ({...state, profile: {...state.profile, photos: {...action.photos}}})
        default:
            return state;
    }
}

function addPost(state, payload: { postText: string }) {
    const post: PostDataType = {id: 5, text: payload.postText, likes: 0, time: ""}
    return {...state, postData: [...state.postData, post]};
}

export const actions = {
    addPost({postText}: { postText: string }) {
        return {type: 'profile/ADD-POST', payload: {postText}} as const
    },
    setUserProfile(profile: ProfileDataType) {
        return {type: 'profile/SET-USER', profile} as const
    },
    setUserProfileStatus(status: string) {
        return {type: 'profile/SET-USER-STATUS', status} as const
    },
    setUserProfilePhoto(photos: PostPhotosType) {
        return {type: 'profile/SET-USER-PHOTO', photos} as const
    },
}


type ProfileThunkType = ThunkType<ActionsTypes>

export function requestProfile(userId: number): ProfileThunkType {
    return async (dispatch) => {
        const res = await profileApi.getProfile(userId)
        dispatch(actions.setUserProfile(res))

    }
}

export function requestProfileStatus(userId: number): ProfileThunkType {
    return async (dispatch) => {
        const status = await profileApi.getProfileStatus(userId)
        dispatch(actions.setUserProfileStatus(status))
    }
}

export function updateProfileStatus(status: string): ProfileThunkType {
    return async (dispatch) => {
        const res = await profileApi.setProfileStatus(status)
        if (res.resultCode === ResultCodesEnum.Success)
            dispatch(actions.setUserProfileStatus(status))
    }
}

export function saveProfilePhoto(photo: FileType): ProfileThunkType {
    return async (dispatch) => {
        const res = await profileApi.setProfilePhoto(photo)
        if (res.resultCode === ResultCodesEnum.Success)
            dispatch(actions.setUserProfilePhoto(res.data.photos))
    }
}

export function saveProfile(data: ProfileDataType): ProfileThunkType {
    return async (dispatch, getState) => {
        const userId = getState().auth.id;
        const res = await profileApi.setProfile(data)
        if (res.resultCode === ResultCodesEnum.Success)
            dispatch(requestProfile(userId))
    }
}

export default profileReducer;