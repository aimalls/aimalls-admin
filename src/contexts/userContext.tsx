import React, { createContext, ReactNode } from "react"
import { useQuery } from "@tanstack/react-query"
import { getUserInfo } from "../requests/auth.request"

export type tUser = {
    email: string,
    isVerified: boolean,
    isAdmin: boolean,
}

export interface iUserContext {
    user: tUser
}

const defaultState = {
    user: {
        email: '',
        isVerified: false,
        isAdmin: false
    }
} as iUserContext

export const UserContext = createContext(defaultState)

type UserContextProviderProps = {
    children: ReactNode
}

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
    
    const userQuery = useQuery({
        queryKey: ["user"],
        enabled: !!localStorage.getItem("authToken"),
        queryFn: getUserInfo
    })

    return (
        <UserContext.Provider value={{user: userQuery.data?.data}}>
            { children }
        </UserContext.Provider>
    )
}

export default UserContextProvider;