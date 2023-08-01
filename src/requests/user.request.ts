import { HTTP_API } from "../helpers/http"



export interface iUser {
  _id?: string;
  email: string;
  isAdmin: boolean;
  isVerified: boolean;
  verificationLink: string;
  createdAt: string;
  updatedAt: string;
  referrer?: string;
}

export const getAllUsersFromAPI = () => {
    return HTTP_API().get("/user/get-all-users")
        .then(response => response.data)
        .catch(err => Promise.reject(err.response.data))
}

export const getUserByIDFromAPI = (id: iUser['_id']) => {
    return HTTP_API().get("/user/get-user-by-id", { params: {id} })
    .then(response => response.data)
    .catch(err => Promise.reject(err.response.data))
}