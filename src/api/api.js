import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0",
    headers: {"API-KEY": "a18c39ba-a525-4dca-8e87-8ced8b6d6d78"}
})


export const usersApi = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
    },
    followUser(userId) {
        return instance.post(`follow/${userId}`)
    },

    unFollowUser(userId) {
        return instance.delete(`follow/${userId}`)
    }
}
export const profileApi = {
    getProfile(userId) {
        return instance.get(`profile/${userId}`)
    },
    getProfileStatus(userId) {
        return instance.get(`profile/status/${userId}`)
    },
    setProfileStatus(status) {
        return instance.put(`profile/status/`, {status})
    }
}

export const authApi = {
    getAuthMe() {
        return instance.get(`auth/me`)
    }
}
