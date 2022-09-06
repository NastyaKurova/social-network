import {
  Action,
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Dispatch,
} from 'redux'
import dialogsReducer from './reducers/dialogsReducer'
import profileReducer from './reducers/profileReducer'
import usersReducer from './reducers/usersReducer'
import authReducer from './reducers/authReducer'
import thunkMiddleware, { ThunkAction } from 'redux-thunk'
import appReducer from './reducers/appReducer'
import chatReducer from './reducers/chatReducer'

const rootReducer = combineReducers({
  dialogPage: dialogsReducer,
  profilePage: profileReducer,
  usersPage: usersReducer,
  auth: authReducer,
  initApp: appReducer,
  chat: chatReducer,
})

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

export type InferActionsTypes<T> = T extends {
  [key: string]: (...args: any[]) => infer U
}
  ? U
  : never

export type DispatchType<A extends Action> = Dispatch<A>
export type ThunkType<A extends Action> = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  A
>

const composeEnhancers =
  (window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose) || compose

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
)

export default store
