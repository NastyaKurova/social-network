import { getCurrentUser } from './authReducer'
import { InferActionsTypes } from '../reduxStore'

type InitialStateType = typeof initialState

const initialState = {
  isInitialized: false,
}

type ActionsTypes = InferActionsTypes<typeof actions>

function appReducer(
  state = initialState,
  action: ActionsTypes
): InitialStateType {
  switch (action.type) {
    case 'app/INITIALIZE-APP':
      return { ...state, isInitialized: true }
    default:
      return state
  }
}

const actions = {
  setInitialiseAppSuccess() {
    return { type: 'app/INITIALIZE-APP' }
  },
}

export function initApp() {
  return dispatch => {
    return Promise.all([dispatch(getCurrentUser())]).then(() =>
      dispatch(actions.setInitialiseAppSuccess())
    )
  }
}

export default appReducer
