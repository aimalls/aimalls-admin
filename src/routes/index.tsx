import { FC } from "react";
import PublicRoutes from "./public/PublicRoutes";
import { Redirect, Route } from "react-router";
import { PrivateRoutes } from "./private/PrivateRoutes";

export interface iProps {}
export const index: FC<iProps> = (props): JSX.Element => {
    return (
        <>
            <PublicRoutes />
            <PrivateRoutes />
        </>
    )
};
export default index;