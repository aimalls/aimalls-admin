import { HTTP_API } from "../helpers/http"

export const Login = async (email: string, password: string) => {
    try {
        return await HTTP_API().post("/auth/login", { email, password })
    } catch (error) {
        return Promise.reject(error)
    }
}

export const Logout = async () => {
    try {
        return await HTTP_API().post("/auth/logout")
    } catch (error) {
        return Promise.reject(error)
    }
}

export const GoogleLogin = async (code: string) => {
    try {
        return await HTTP_API().post("/auth/google", { code })
    } catch (error) {
        return Promise.reject(error)
    }
}

export const getUserInfo = async () => {
    try {
        const response = await HTTP_API().get("/auth/me")
        return response.data
    } catch (error) {
        return Promise.reject(error)
    }
}