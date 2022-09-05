import { AppStateType } from '../reduxStore'

export const getUsers = (state: AppStateType) => {
  return state.usersPage.users
}
export const getCurrentPage = (state: AppStateType) => {
  return state.usersPage.currentPage
}
export const getTotalCount = (state: AppStateType) => {
  return state.usersPage.totalCount
}
export const getPageSize = (state: AppStateType) => {
  return state.usersPage.pageSize
}
export const getIsLoaded = (state: AppStateType) => {
  return state.usersPage.isLoaded
}
export const getFollowedProgressArr = (state: AppStateType) => {
  return state.usersPage.followedProgressArr
}
export const getUsersFilter = (state: AppStateType) => {
  return state.usersPage.filter
}
