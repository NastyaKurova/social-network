import {
    CurrentUserType,
    ResponseType,
    ResultCodesCaptureEnum, ResultCodesEnum
} from "../types/types";
import {instance} from "./api";


type GetAuthMeResponseType = ResponseType<CurrentUserType>
type LoginResponseType = ResponseType<{ userId: number }, ResultCodesEnum | ResultCodesCaptureEnum>

export const authApi = {
    getAuthMe() {
        return instance.get<GetAuthMeResponseType>(`auth/me`).then(res=>res.data)
    },
    logout() {
        return instance.delete<ResponseType>(`/auth/login`).then(res=>res.data)
    },
    login(data) {
        return instance.post<LoginResponseType>(`/auth/login`, data).then(res=>res.data)
    }
}

