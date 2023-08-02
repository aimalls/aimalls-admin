import { HTTP_API } from "../helpers/http"

export interface iRolePolicy {
    _id?: string,
    name: string,
    method_name: string,
    description: string,
    createdAt?: string,
    updatedAt?: string
}

export const saveNewRolePolicyToAPI = (policy: iRolePolicy) => {
    return HTTP_API().post("/role-policy/save-new-role-policy", policy)
        .then(response => response.data)
        .catch(err => Promise.reject(err))
}

export const getAllRolePoliciesFromAPI = () => {
    return HTTP_API().get("/role-policy/get-all-role-policies")
        .then(response => response.data)
        .catch(err => Promise.reject(err))
}

export const processRolePolicyDeleteToAPI = (policy_id: iRolePolicy['_id']) => {
    return HTTP_API().post("/role-policy/delete-role-policy", {policy_id})
    .then(response => response.data)
    .catch(err => Promise.reject(err))
}