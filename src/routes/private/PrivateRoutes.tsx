import { Route } from "react-router"
import UserContextProvider from "../../contexts/userContext"
import DashboardLayoutV2 from "../../layouts/dashboard/DashboardLayoutV2"


export const PrivateRoutes = () => {


    return (
        <>
            <Route path="/dashboard">
                <UserContextProvider>
                    <DashboardLayoutV2 />
                </UserContextProvider>
            </Route>
        </>
    )
}