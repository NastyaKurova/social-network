import {combineReducers, createStore} from "redux";
import dialogsReducer from "./reducers/dialogsReducer";
import profileReducer from "./reducers/profileReducer";

let reducers = combineReducers({
    dialogPage: dialogsReducer,
    profilePage: profileReducer
})
let store = createStore(reducers)

export default store;