import {getCurrentUser} from "./authReducer";

const INITIALIZE_APP = 'INITIALIZE-APP'


let initialState = {
    isInitialized: false
};

function appReducer(state = initialState, action) {
    switch (action.type) {
        case INITIALIZE_APP:
            return ({...state, isInitialized: true});
        default:
            return state;

    }
}

export function setInitialiseAppSuccess() {
    return {type: INITIALIZE_APP}
}

export function initApp() {
    return (dispatch) => {
        return Promise.all([
            dispatch(getCurrentUser())
        ]).then(() => dispatch(setInitialiseAppSuccess()))
    }
}

export default appReducer;