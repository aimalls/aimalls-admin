import { HTTP_API } from "../helpers/http"
import { iRole } from "./role.request";



export interface iUser {
    _id?: string;
    email: string;
    isAdmin: boolean;
    isVerified: boolean;
    verificationLink: string;
    createdAt: string;
    updatedAt: string;
    referrer?: string;
    deactivated?: boolean,
    roles: iRole[] | iRole['_id'][],
}

export const getAllUsersFromAPI = () => {
    return HTTP_API().get("/user/get-all-users")
        .then(response => response.data)
        .catch(err => Promise.reject(err.response.data))
}

export const getUserByIDFromAPI = (id: iUser['_id']) => {
    return HTTP_API().get("/user/get-user-by-id", { params: { id } })
        .then(response => response.data)
        .catch(err => Promise.reject(err.response.data))
}

export const deactivateUserToAPI = (params: any) => {
    return HTTP_API().post("/user/deactivate-user", params)
        .then(response => response.data)
        .catch(err => Promise.reject(err.response.data))
}

export const saveResetPasswordToAPI = (params: {userId: iUser['_id'], newPassword: string}) => {
    return HTTP_API().post("/user/reset-password", params)
        .then(response => response.data)
        .catch(err => Promise.reject(err))
}

export const saveUpdatedUserRole = (params: { userId: iUser['_id'], roles: iUser['roles'] }) => {
    return HTTP_API().post("/user/save-updated-user-roles", params)
        .then(response => response.data)
        .catch(err => Promise.reject(err))
}