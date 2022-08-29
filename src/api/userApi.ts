import {ResponseType, UsersType} from "../types/types";
import {instance} from "./api";

type UserResponseType = {
    items: UsersType[],
    totalCount: number,
    error: null | []
}

export const usersApi = {
    getUsers(currentPage: number = 1, pageSize: number = 10) {
        return instance.get<UserResponseType>(`users?page=${currentPage}&count=${pageSize}`).then(res=> res.data)
    },
    followUser(userId: number) {
        return instance.post<ResponseType>(`follow/${userId}`).then(res=> res.data)
    },

    unFollowUser(userId: number) {
        return instance.delete<ResponseType>(`follow/${userId}`).then(res=> res.data)
    }
}