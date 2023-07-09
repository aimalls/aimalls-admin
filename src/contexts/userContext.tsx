import React, { createContext, ReactNode } from "react"
import useUser from "../hooks/useUser"

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
    
    const { user } = useUser()

    return (
        <UserContext.Provider value={{user}}>
            { children }
        </UserContext.Provider>
    )
}

export default UserContextProvider;