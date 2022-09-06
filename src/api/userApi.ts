import { ResponseType, UsersType } from '../types/types'
import { instance } from './api'

type UserResponseType = {
  items: UsersType[]
  totalCount: number
  error: null | []
  term: string
  friend: boolean | null
}

export const usersApi = {
  getUsers(currentPage = 1, pageSize = 10, filter) {
    const { term, friend } = filter
    return instance
      .get<UserResponseType>(
        `users?page=${currentPage}&count=${pageSize}&term=${term}&friend=${friend}`
      )
      .then(res => res.data)
  },
  followUser(userId: number) {
    return instance.post<ResponseType>(`follow/${userId}`).then(res => res.data)
  },

  unFollowUser(userId: number) {
    return instance
      .delete<ResponseType>(`follow/${userId}`)
      .then(res => res.data)
  },
}
