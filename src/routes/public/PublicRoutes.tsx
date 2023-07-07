import { FC } from "react";
import { Redirect, Route } from "react-router";
import Login from "../../pages/public/auth/Login";

export interface iProps {}
export const PublicRoutes: FC<iProps> = (props): JSX.Element => {
    return (
        <>
            <Route exact path="/">
                <Redirect to="/login"></Redirect>
            </Route>
            <Route exact path="/login">
                <Login />
            </Route>
        </>
    )
};
export default PublicRoutes;