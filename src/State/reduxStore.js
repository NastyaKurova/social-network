import {applyMiddleware, combineReducers, createStore} from "redux";
import dialogsReducer from "./reducers/dialogsReducer";
import profileReducer from "./reducers/profileReducer";
import usersReducer from "./reducers/usersReducer";
import authReducer from "./reducers/authReducer";
import thunkMiddleware from "redux-thunk";
import appReducer from "./reducers/appReducer";

let reducers = combineReducers({
    dialogPage: dialogsReducer,
    profilePage: profileReducer,
    usersPage: usersReducer,
    auth: authReducer,
    initApp: appReducer,
})
let store = createStore(reducers, applyMiddleware(thunkMiddleware))

export default store;