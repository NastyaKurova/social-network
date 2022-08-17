import {combineReducers, createStore} from "redux";
import dialogsReducer from "./reducers/dialogsReducer";
import profileReducer from "./reducers/profileReducer";
import usersReducer from "./reducers/usersReducer";

let reducers = combineReducers({
    dialogPage: dialogsReducer,
    profilePage: profileReducer,
    usersPage: usersReducer
})
let store = createStore(reducers)

export default store;