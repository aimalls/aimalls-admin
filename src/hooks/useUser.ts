import { useQuery } from "@tanstack/react-query";

import { getUserInfo } from "../requests/auth.request"

export const useUser = () => {
    const userQuery = useQuery({
        queryKey: ["user"],
        enabled: !!localStorage.getItem("authToken"),
        queryFn: getUserInfo
    })

    return { user: userQuery.data }
}

export default useUser;