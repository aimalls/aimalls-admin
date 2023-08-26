import { useQuery } from "@tanstack/react-query";
import { getAllWhitelistApplicationsFromAPI } from "../requests/whitelist.request";



export const useWhitelist = () => {

    const whiteListsQuery = useQuery({
        queryKey: ["whitelists-query"],
        queryFn: getAllWhitelistApplicationsFromAPI
    })

    return {whitelists: whiteListsQuery.data, isWhitelistsLoading: whiteListsQuery.isLoading, refetch: whiteListsQuery.refetch}
}

export default useWhitelist;