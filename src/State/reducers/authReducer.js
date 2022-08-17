const SET_CURRENT_USER = 'SET-CURRENT-USER'


let initialState = {
    isAuth: false,
    login: null,
    userId: null,
    email:null
};

function authReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return ({...state, login:action.data.login, isAuth: true});
        default:
            return state;

    }
}

export function setCurrentUser(id, login, email) {
    console.log(id, login, email)
    return {type: SET_CURRENT_USER,data:{id, login, email}}
}

export default authReducer;