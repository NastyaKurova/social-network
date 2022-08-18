import {authApi} from "../../api/api";

const SET_CURRENT_USER = 'SET-CURRENT-USER'


let initialState = {
    isAuth: false,
    login: null,
    userId: null,
    email: null
};

function authReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return ({...state, login: action.data.login, isAuth: true});
        default:
            return state;

    }
}

export function setCurrentUser(id, login, email) {
    return {type: SET_CURRENT_USER, data: {id, login, email}}
}

export function getCurrentUser() {
   return (dispatch)=>{
     return  authApi.getAuthMe()
           .then(res => {
               if (res.data.resultCode === 0) {
                   let {id, login, email} = res.data.data
                   dispatch(setCurrentUser(id, login, email))
               }
           })
   }
}

export default authReducer;