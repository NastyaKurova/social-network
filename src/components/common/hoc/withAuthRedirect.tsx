import React, { FC } from 'react'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { AppStateType } from '../../../State/reduxStore'

export function withAuthRedirect<WCP>(Component: React.ComponentType<WCP>) {
  type MapStateToPropsType = {
    isAuth: boolean
  }

  const RedirectComponent: FC<MapStateToPropsType> = props => {
    const { isAuth, ...restProps } = props
    if (!isAuth) return <Navigate to="/login" />
    return <Component {...(restProps as WCP)} />
  }

  const mapStateToPropsWithRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
  })
  return connect<MapStateToPropsType, {}, WCP, AppStateType>(
    mapStateToPropsWithRedirect
  )(RedirectComponent)
}
