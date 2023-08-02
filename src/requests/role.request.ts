import { HTTP_API } from "../helpers/http"
import { iRolePolicy } from "./role-policy.request"

export interface iRole {
    _id?: string,
    name: string,
    description: string,
    rolePolicies: iRolePolicy[] | iRolePolicy['_id'][],
    createdAt?: string,
    updatedAt?: string
}

export const saveNewRoleToAPI = (params: iRole) => {
    return HTTP_API().post("/role/save-new-role", params)
        .then(response => response.data)
        .catch(err => Promise.reject(err))
}

export const getAllRolesFromAPI = () => {
    return HTTP_API().get("/role/get-all-roles")
        .then(response => response.data)
        .catch(err => Promise.reject(err))
}