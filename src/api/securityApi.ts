import {instance} from "./api";

type GetCaptchaResponseType = {
    url: string
}
export const securityApi = {
    getCaptcha() {
        return instance.get<GetCaptchaResponseType>(`/security/get-captcha-url`).then(res=>res.data)
    }
}
