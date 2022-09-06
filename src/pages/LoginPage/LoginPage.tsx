import React from 'react'
import { loginUser } from '../../State/reducers/authReducer'
import { LoginForm } from './LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { getAuth, getCaptureUrl } from '../../State/selectors/authSelectors'

const LoginPage = () => {
  const dispatch = useDispatch<any>()
  const isAuth: boolean = useSelector(getAuth)
  const captureUrl: string = useSelector(getCaptureUrl)
  const loginCurrentUser = (values: {
    email: string
    password: string
    capture: string
  }) => {
    dispatch(loginUser(values))
  }
  if (isAuth) return <Navigate to="/profile" />
  return <LoginForm loginUser={loginCurrentUser} captureUrl={captureUrl} />
}
export default LoginPage
